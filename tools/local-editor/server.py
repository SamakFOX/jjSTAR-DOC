"""Local preview and source-preserving text editor."""
import argparse
import hashlib
import html
import json
import os
from pathlib import Path
import re
import secrets
import socket
import tempfile
import threading
from collections import Counter
from datetime import datetime
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
TOKEN = secrets.token_urlsafe(32)
LOCK = threading.Lock()
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
BLOCKS = {'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'li', 'dt', 'dd', 'strong', 'span'}


def digest(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def read(path):
    return path.read_bytes().decode('utf-8')


class SourceParser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.stack, self.nodes = [], []
        self.feed(source)

    def position(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        start = self.position()
        node = dict(tag=tag, attrs=dict(attrs), start=start,
                    inner=start + len(self.get_starttag_text()), parent=self.stack[-1] if self.stack else None)
        self.nodes.append(node)
        if tag in VOID:
            node['end'] = node['outerEnd'] = node['inner']
        else:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            node = self.stack.pop()
            node['end'] = node['outerEnd'] = node['inner']

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]['tag'] == tag:
                self.stack[i]['end'] = self.position()
                self.stack[i]['outerEnd'] = self.source.index('>', self.position()) + 1
                del self.stack[i:]
                break

    def editable(self):
        candidates = []
        for node in self.nodes:
            is_description = bool(set(node['attrs'].get('class', '').split()) & {'page-description', 'guide-lead'})
            if (node['tag'] not in BLOCKS and node['tag'] != 'div') or 'end' not in node:
                continue
            if node['tag'] == 'span' and not node['attrs'].get('class'):
                continue
            inner = self.source[node['inner']:node['end']]
            if node['tag'] in {'li', 'div'} and re.search(r'<(?:div|p|section|h[1-6]|figure|ul|ol|nav|table)\b', inner, re.I):
                continue
            text = html.unescape(re.sub('<[^>]+>', '', inner)).strip()
            allow_empty = node['tag'] in {'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption'}
            if (not text and not is_description and not allow_empty) or text.isdigit() or re.fullmatch(r'STEP\s*\d+|예시', text):
                continue
            parent, excluded = node, False
            while parent:
                attrs = parent['attrs']
                if parent['tag'] in {'nav', 'script', 'style', 'button'} or attrs.get('id') == 'direct-link' or 'guide-tab-map' in attrs.get('class', ''):
                    excluded = True
                    break
                parent = parent['parent']
            if not excluded:
                candidates.append(node)
        ids = {id(n) for n in candidates}
        result = []
        for node in candidates:
            parent = node['parent']
            while parent and id(parent) not in ids:
                parent = parent['parent']
            if not parent:
                result.append(node)
        return result


def page_path(value):
    if not re.fullmatch(r'pages/[A-Za-z0-9_-]+\.html', value or ''):
        raise ValueError('pages 폴더의 HTML 문서만 편집할 수 있어요')
    path = (ROOT / value).resolve()
    if path.parent != (ROOT / 'pages').resolve() or not path.is_file():
        raise ValueError('편집할 문서를 찾을 수 없어요')
    return path


def string_description(code, source):
    entry = re.search(r'"' + re.escape(code) + r'"\s*:\s*\{(?P<body>.*?)\n\s*\}', source, re.S)
    if not entry:
        return None
    match = re.search(r'"desc"\s*:\s*("(?:[^"\\]|\\.)*")', entry['body'])
    if not match:
        return None
    start = entry.start('body') + match.start(1)
    return start, start + len(match[1]), json.loads(match[1])


def menu_entries():
    path = ROOT / 'data/menu.js'
    if not path.is_file():
        return {}
    source = read(path).split('=', 1)[1].strip().removesuffix(';')
    result = {}
    def walk(nodes):
        for node in nodes:
            result.setdefault(node.get('path'), node)
            walk(node.get('children', []))
    walk(json.loads(source))
    return result


def document_regions(parsed, description):
    articles = [n for n in parsed.nodes if n['tag'] == 'article']
    root = articles[0] if len(articles) == 1 else None
    if not articles:
        candidates = []
        for node in parsed.nodes:
            if node['tag'] not in {'div', 'section', 'main'} or 'end' not in node:
                continue
            classes = set(node['attrs'].get('class', '').split())
            if not classes & {'guide-article', 'guide-detail', 'guide-l3-content', 'max-w-1200'}:
                continue
            if any(n['parent'] is node and n['tag'] == 'h1' for n in parsed.nodes):
                candidates.append(node)
        if len(candidates) == 1:
            root = candidates[0]
    if root is None or 'end' not in root:
        return [], dict(allowed=False, reason='하나의 가이드 본문으로 구성된 문서에서 섹션을 편집할 수 있어요')
    article = root
    children = [n for n in parsed.nodes if n['parent'] is article]
    regions, previous = [], article['inner']
    for index, node in enumerate(children):
        if 'outerEnd' not in node:
            return [], dict(allowed=False, reason='닫히지 않은 태그를 먼저 확인해 주세요')
        prefix = parsed.source[previous:node['start']]
        if re.sub(r'<!--.*?-->', '', prefix, flags=re.S).strip():
            return [], dict(allowed=False, reason='태그 밖의 본문을 문단으로 묶은 뒤 섹션을 편집해 주세요')
        descendants = [n for n in parsed.nodes if node['start'] <= n['start'] < node['outerEnd']]
        classes = set(node['attrs'].get('class', '').split())
        protected = (node['tag'] in {'h1', 'nav', 'script', 'style'} or node is description
                     or node['attrs'].get('id') == 'direct-link' or any(n is description for n in descendants)
                     or bool(classes & {'rst-content', 'toctree-wrapper'})
                     or any('auto-' in n['attrs'].get('id', '') for n in descendants))
        heading = next((n for n in descendants if n['tag'] in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}), node)
        label = html.unescape(re.sub('<[^>]+>', '', parsed.source[heading['inner']:heading['end']])).strip()
        label = re.sub(r'\s+', ' ', label)[:65]
        if not label:
            label = {'img': '이미지', 'hr': '구분선', 'nav': '메뉴 경로'}.get(node['tag'], node['tag'])
        regions.append(dict(id=f'r{index}', tag=node['tag'], label=label, protected=protected,
                            anchorIds=[n['attrs']['id'] for n in descendants if n['attrs'].get('id')],
                            _start=node['start'], _end=node['outerEnd'], _prefix=prefix))
        previous = node['outerEnd']
    if re.sub(r'<!--.*?-->', '', parsed.source[previous:article['end']], flags=re.S).strip():
        return [], dict(allowed=False, reason='태그 밖의 본문을 문단으로 묶은 뒤 섹션을 편집해 주세요')
    return regions, dict(allowed=True, _start=article['inner'], _end=article['end'],
                         _tail=parsed.source[previous:article['end']])


def prepare(value):
    path = page_path(value)
    source = read(path)
    strings = read(ROOT / 'data/strings.js')
    parsed = SourceParser(source)
    nodes = parsed.editable()
    menu = menu_entries().get(value, {})
    if menu:
        nodes = [n for n in nodes if n['tag'] != 'h1']
    blocks = []
    desc = string_description(path.stem, strings)
    # The main viewer replaces the direct article description from strings.js.
    desc_node = next((n for n in nodes if set(n['attrs'].get('class', '').split()) & {'page-description', 'guide-lead'}), None)
    if not desc_node:
        desc_node = next((n for n in nodes if n['tag'] == 'p' and n['parent'] and
                          n['parent']['tag'] == 'article'), None)
    regions, structure = document_regions(parsed, desc_node)
    for i, n in enumerate(nodes):
        target = 'data/strings.js' if desc and n is desc_node else value
        start, end = (desc[0], desc[1]) if target == 'data/strings.js' else (n['inner'], n['end'])
        content = desc[2] if target == 'data/strings.js' else source[start:end]
        try:
            SafeMarkup().feed(content)
        except ValueError:
            continue
        gap_node = n
        if n['parent'] and 'guide-section-heading' in n['parent']['attrs'].get('class', '').split():
            gap_node = n['parent']
        gap_allowed = n['tag'] in {'p', 'h2', 'h3', 'h4', 'h5', 'h6'} and 'outerEnd' in gap_node
        parent = gap_node['parent']
        if parent and (parent['tag'] in {'li', 'ul', 'ol', 'dl', 'table', 'tr', 'thead', 'tbody'}
                       or set(parent['attrs'].get('class', '').split()) & {'flex', 'grid'}
                       or re.search(r'display\s*:\s*(?:inline-)?(?:flex|grid)', parent['attrs'].get('style', ''), re.I)):
            gap_allowed = False
        tip_allowed = target == value and n['tag'] == 'p' and gap_allowed
        ancestor = n['parent']
        while ancestor:
            if 'tip-box' in ancestor['attrs'].get('class', '').split() or ancestor['tag'] in {'figure', 'a'}:
                tip_allowed = False
            ancestor = ancestor['parent']
        blocks.append(dict(id=str(i), start=start, end=end, html=content, target=target,
                           tip=dict(allowed=tip_allowed),
                           tag=n['tag'], node=n, gap=dict(allowed=gap_allowed,
                           start=gap_node['start'], end=gap_node.get('outerEnd', 0)), gap_node=gap_node))
    rendered = source
    edits = []
    markers = {}
    for region in regions:
        markers.setdefault(region['_start'], []).append((1, f'<!--local-region:{region["id"]}:start-->'))
        markers.setdefault(region['_end'], []).append((0, f'<!--local-region:{region["id"]}:end-->'))
    for position, items in markers.items():
        edits.append((position, position, ''.join(markup for _, markup in sorted(items))))
    if menu:
        heading = next((n for n in parsed.nodes if n['tag'] == 'h1' and 'end' in n), None)
        if heading:
            edits.append((heading['inner'], heading['end'], html.escape(menu['title'])))
    for b in blocks:
        n = b['node']
        edits.append((n['inner'] - 1, n['inner'] - 1, f' data-local-block="{b["id"]}"'))
        if b['gap']['allowed'] and b['gap_node'] is not n:
            anchor = b['gap_node']['inner'] - 1
            edits.append((anchor, anchor, f' data-local-gap-anchor="{b["id"]}"'))
        if b['target'] == 'data/strings.js':
            edits.append((n['inner'], n['end'], b['html']))
    for a, z, replacement in sorted(edits, reverse=True):
        rendered = rendered[:a] + replacement + rendered[z:]
    return dict(path=value, source=source, strings=strings, html=rendered, blocks=blocks,
                regions=regions, structure=structure,
                versions={value: digest(source), 'data/strings.js': digest(strings)})


class SafeMarkup(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag not in {'span', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'br', 'img', 'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'sup', 'sub', 'small', 'code'}:
            raise ValueError(f'문구 안에 {tag} 태그를 저장할 수 없어요')
        for key, value in attrs:
            value = value or ''
            if key.startswith('on') or key in {'contenteditable', 'srcdoc'} or key.startswith('data-local-'):
                raise ValueError('편집용 속성 또는 실행 코드는 저장할 수 없어요')
            if key in {'href', 'src', 'xlink:href'} and re.match(r'(javascript|data|vbscript|file):', re.sub(r'[\x00-\x20\x7f]', '', value), re.I):
                raise ValueError('사용할 수 없는 링크예요')
            if key == 'style' and re.search(r'url\s*\(|expression|@import', value, re.I):
                raise ValueError('사용할 수 없는 스타일이에요')

    handle_startendtag = handle_starttag

    def handle_comment(self, data):
        if re.search(r'local-region:|data-local-', data, re.I):
            raise ValueError('편집용 표시를 원본에 저장할 수 없어요')


class SafeStructure(HTMLParser):
    tags = {'section', 'div', 'p', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav',
            'figure', 'figcaption', 'img', 'hr', 'ul', 'ol', 'li', 'dl', 'dt', 'dd',
            'blockquote', 'pre', 'code', 'table', 'caption', 'colgroup', 'col', 'thead',
            'tbody', 'tfoot', 'tr', 'td', 'th', 'details', 'summary', 'span', 'strong',
            'b', 'em', 'i', 'u', 's', 'a', 'br', 'svg', 'path', 'circle', 'rect', 'line',
            'polyline', 'polygon', 'sup', 'sub', 'small'}

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack, self.ids, self.elements = [], [], 0

    def handle_starttag(self, tag, attrs):
        if tag not in self.tags:
            raise ValueError(f'섹션 안에 {tag} 태그를 저장할 수 없어요')
        self.elements += 1
        keys = [key for key, _ in attrs]
        if len(set(keys)) != len(keys):
            raise ValueError('중복된 HTML 속성이 있어요')
        for key, value in attrs:
            value = value or ''
            if (key.startswith('on') or key.startswith('data-local-')
                    or key in {'contenteditable', 'srcdoc', 'formaction', 'action', 'srcset', 'ping'}):
                raise ValueError('편집용 속성 또는 실행 코드는 저장할 수 없어요')
            if key in {'href', 'src', 'xlink:href'}:
                clean = re.sub(r'[\x00-\x20\x7f]', '', value)
                if re.match(r'(?:javascript|data|vbscript|file):', clean, re.I):
                    raise ValueError('사용할 수 없는 링크예요')
                scheme = urlsplit(clean).scheme
                if scheme and scheme.lower() not in {'https', 'http', 'mailto', 'tel'}:
                    raise ValueError('사용할 수 없는 링크예요')
            if key == 'style' and re.search(r'url\s*\(|expression|@import|\\', value, re.I):
                raise ValueError('사용할 수 없는 스타일이에요')
            if key == 'id' and value:
                self.ids.append(value)
        if tag not in VOID:
            self.stack.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.stack.pop()

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1] != tag:
            raise ValueError('섹션의 HTML 태그 짝이 맞지 않아요')
        self.stack.pop()

    def handle_comment(self, data):
        if re.search(r'local-region:|data-local-', data, re.I):
            raise ValueError('편집용 표시를 원본에 저장할 수 없어요')

    def handle_data(self, data):
        if data.strip() and not self.stack:
            raise ValueError('섹션의 문구를 문단이나 제목 안에 넣어 주세요')

    def handle_entityref(self, name):
        if not self.stack:
            raise ValueError('섹션의 문구를 문단이나 제목 안에 넣어 주세요')

    def handle_charref(self, name):
        self.handle_entityref(name)

    def handle_decl(self, decl):
        raise ValueError('섹션 안에 문서 선언을 저장할 수 없어요')

    def close(self):
        super().close()
        if self.stack:
            raise ValueError('닫히지 않은 HTML 태그가 있어요')
        if not self.elements:
            raise ValueError('섹션에 문단이나 이미지가 필요해요')
        if len(set(self.ids)) != len(self.ids):
            raise ValueError('같은 ID를 두 번 사용할 수 없어요')


def structural_layout(state, layout, patches):
    if not state['structure']['allowed']:
        raise ValueError(state['structure']['reason'])
    if not isinstance(layout, list) or len(layout) > 600:
        raise ValueError('섹션 목록이 올바르지 않아요')
    regions = {r['id']: r for r in state['regions']}
    seen, rendered, ids = set(), [], []
    barriers = [r['id'] for r in state['regions'] if r['protected']]
    original_segment, segment = {}, 0
    for region in state['regions']:
        original_segment[region['id']] = segment
        if region['protected']:
            segment += 1
    final_barriers, segment = [], 0
    newline = '\r\n' if '\r\n' in state['source'] else '\n'
    for item in layout:
        if not isinstance(item, dict) or set(item) - {'id', 'html'}:
            raise ValueError('섹션 정보가 올바르지 않아요')
        key = item.get('id')
        if not isinstance(key, str) or key in seen:
            raise ValueError('중복되거나 잘못된 섹션 ID가 있어요')
        seen.add(key)
        region = regions.get(key)
        if region:
            if region['protected']:
                final_barriers.append(key)
                if 'html' in item:
                    raise ValueError('상단 정보와 자동 메뉴 목록은 섹션으로 교체할 수 없어요')
                segment += 1
            elif original_segment[key] != segment:
                raise ValueError('상단 정보와 자동 메뉴 목록을 넘어 섹션을 이동할 수 없어요')
            content = state['source'][region['_start']:region['_end']]
            if 'html' not in item:
                for start, end, value in sorted(patches.get(key, []), reverse=True):
                    start -= region['_start']
                    end -= region['_start']
                    content = content[:start] + value + content[end:]
        elif not re.fullmatch(r'new-[A-Za-z0-9_-]+', key):
            raise ValueError('알 수 없는 섹션 ID예요')
        if not region and 'html' not in item:
            raise ValueError('추가할 섹션의 내용이 없어요')
        if 'html' in item:
            content = item['html']
            if not isinstance(content, str) or not content.strip() or len(content) > 500000:
                raise ValueError('섹션 내용이 비어 있거나 너무 커요')
            validator = SafeStructure()
            validator.feed(content)
            validator.close()
            new_ids = validator.ids
            if region and not set(region['anchorIds']).issubset(new_ids):
                raise ValueError('연결된 기존 ID를 유지해 주세요')
            ids.extend(new_ids)
        elif region:
            ids.extend(region['anchorIds'])
        prefix = region['_prefix'] if region else newline + '  '
        rendered.append(prefix + content)
    if final_barriers != barriers:
        raise ValueError('상단 정보와 자동 메뉴 목록은 삭제하거나 순서를 바꿀 수 없어요')
    for region in state['regions']:
        if region['id'] not in seen and region['anchorIds']:
            raise ValueError('다른 곳에서 연결하는 ID가 있는 섹션은 삭제할 수 없어요')
    baseline_ids = [value for region in state['regions'] for value in region['anchorIds']]
    baseline_counts = Counter(baseline_ids)
    if any(count > max(1, baseline_counts[key]) for key, count in Counter(ids).items()):
        raise ValueError('같은 ID를 두 번 사용할 수 없어요')
    container = state['structure']
    outside = state['source'][:container['_start']] + state['source'][container['_end']:]
    outside_ids = {n['attrs']['id'] for n in SourceParser(outside).nodes if n['attrs'].get('id')}
    if outside_ids.intersection(ids):
        raise ValueError('문서의 다른 영역과 ID가 중복돼요')
    return ''.join(rendered) + container['_tail']


def atomic_write(path, content):
    fd, temporary = tempfile.mkstemp(prefix='.local-edit-', dir=path.parent)
    try:
        with os.fdopen(fd, 'wb') as stream:
            stream.write(content.encode('utf-8'))
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def save(payload):
    with LOCK:
        if not isinstance(payload, dict):
            raise ValueError('저장 요청이 올바르지 않아요')
        state = prepare(payload.get('path'))
        if payload.get('versions') != state['versions']:
            raise FileExistsError('VS Code 또는 다른 창에서 파일이 변경됐어요. 편집 내용을 복사해 보관한 뒤 새로 불러와 주세요')
        blocks = {b['id']: b for b in state['blocks']}
        changes = payload.get('changes', [])
        if not isinstance(changes, list) or len(changes) > len(blocks):
            raise ValueError('저장할 문구 목록이 올바르지 않아요')
        replacements, seen, region_patches = {}, set(), {}
        def replace(target, start, end, content, block):
            replacements.setdefault(target, []).append((start, end, content))
            if target == state['path']:
                region = next((r for r in state['regions'] if r['_start'] <= block['node']['start'] < r['_end']), None)
                if region:
                    region_patches.setdefault(region['id'], []).append((start, end, content))
        for edit in changes:
            if not isinstance(edit, dict):
                raise ValueError('저장할 문구가 올바르지 않아요')
            key, markup = edit.get('id'), edit.get('html')
            if key not in blocks or key in seen or not isinstance(markup, str) or len(markup) > 100000:
                raise ValueError('저장할 문구가 올바르지 않아요')
            seen.add(key)
            SafeMarkup().feed(markup)
            b = blocks[key]
            existing_ids = Counter(n['attrs']['id'] for n in SourceParser(b['html']).nodes if n['attrs'].get('id'))
            edited_ids = Counter(n['attrs']['id'] for n in SourceParser(markup).nodes if n['attrs'].get('id'))
            if existing_ids - edited_ids:
                raise ValueError('문구 안에 연결된 기존 ID를 유지해 주세요')
            if any(count > max(1, existing_ids[value]) for value, count in edited_ids.items()):
                raise ValueError('같은 ID를 두 번 사용할 수 없어요')
            tip = edit.get('tipBox', False)
            if type(tip) is not bool or (tip and not b['tip']['allowed']):
                raise ValueError('팁박스로 전환할 본문 문단을 선택해 주세요')
            before, after = edit.get('gapBefore', 0), edit.get('gapAfter', 0)
            if any(type(v) is not int or not 0 <= v <= 3 for v in (before, after)):
                raise ValueError('추가 GAP은 앞뒤 각각 3개까지 넣을 수 있어요')
            if before or after or tip:
                if not b['gap']['allowed']:
                    raise ValueError('GAP을 넣을 문단이나 제목을 선택해 주세요')
                newline = '\r\n' if '\r\n' in state['source'] else '\n'
                gap = '<div class="guide-spacer-v"></div>'
                prefix = (gap + newline) * before
                suffix = (newline + gap) * after
                if tip:
                    prefix += '<div class="tip-box tip-box--with-character guide-extra-tip"><div class="flex items-start gap-3"><div class="tip-box-content">'
                    suffix = '</div></div></div>' + suffix
                if prefix:
                    pos = b['gap']['start']
                    replace(state['path'], pos, pos, prefix, b)
                if suffix:
                    pos = b['gap']['end']
                    replace(state['path'], pos, pos, suffix, b)
            if markup != b['html']:
                content = json.dumps(markup, ensure_ascii=False) if b['target'] == 'data/strings.js' else markup
                replace(b['target'], b['start'], b['end'], content, b)
        layout_changed = False
        if 'layout' in payload:
            content = structural_layout(state, payload['layout'], region_patches)
            container = state['structure']
            original = state['source'][container['_start']:container['_end']]
            page_edits = replacements.get(state['path'], [])
            outside = [(a, z, value) for a, z, value in page_edits
                       if z < container['_start'] or a > container['_end']]
            if content != original:
                outside.append((container['_start'], container['_end'], content))
                layout_changed = True
            if outside:
                replacements[state['path']] = outside
            else:
                replacements.pop(state['path'], None)
        if not replacements:
            return dict(saved=0, backup=None)
        originals = {state['path']: state['source'], 'data/strings.js': state['strings']}
        results = {}
        for target, edits in replacements.items():
            text = originals[target]
            for a, z, content in sorted(edits, reverse=True):
                text = text[:a] + content + text[z:]
            results[target] = text
        backup = ROOT / 'outputs/local-editor-backups' / (datetime.now().strftime('%Y%m%d-%H%M%S-') + secrets.token_hex(3))
        for target in results:
            dest = backup / target
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(originals[target].encode('utf-8'))
        written = []
        try:
            for target, content in results.items():
                atomic_write(ROOT / target, content)
                written.append(target)
        except Exception:
            for target in written:
                atomic_write(ROOT / target, originals[target])
            raise
        return dict(saved=max(len(changes), int(layout_changed)), backup=backup.relative_to(ROOT).as_posix())


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send(self, content, kind='application/json; charset=utf-8', status=200):
        data = json.dumps(content, ensure_ascii=False).encode() if isinstance(content, (dict, list)) else content.encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', kind)
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.end_headers()
        self.wfile.write(data)

    def local_request(self):
        return self.headers.get('Host') in {f'127.0.0.1:{self.server.server_port}', f'localhost:{self.server.server_port}'}

    def do_GET(self):
        if not self.local_request():
            self.send_error(403)
            return
        url = urlsplit(self.path)
        route = url.path
        if route in {'/', '/index.html'}:
            source = read(ROOT / 'index.html')
            self.send(source.replace('</body>', '<script src="/__editor/bootstrap.js"></script></body>'), 'text/html; charset=utf-8')
        elif route in {'/__editor/', '/__editor/editor.js', '/__editor/structure.js', '/__editor/editor.css', '/__editor/bootstrap.js'}:
            file = 'editor.html' if route.endswith('/') else route.rsplit('/', 1)[-1]
            kind = 'text/html' if file.endswith('.html') else 'text/css' if file.endswith('.css') else 'text/javascript'
            self.send(read(HERE / file), kind + '; charset=utf-8')
        elif route == '/__editor/config':
            index = read(ROOT / 'index.html')
            styles = re.search(r'<style>(.*?)</style>', index, re.S)[1]
            pages = []
            menu = menu_entries()
            for path in sorted((ROOT / 'pages').glob('*.html')):
                title = re.search(r'<h[13]\b[^>]*>(.*?)</h[13]>', read(path), re.S | re.I)
                label = menu.get(path.relative_to(ROOT).as_posix(), {}).get('title')
                if not label:
                    label = (html.unescape(re.sub('<[^>]*>', '', title[1])).strip() if title else '') or path.stem
                pages.append(dict(path=path.relative_to(ROOT).as_posix(), title=label))
            self.send(dict(token=TOKEN, pages=pages, styles=styles))
        elif route == '/__editor/images':
            folder = (ROOT / 'assets/images').resolve()
            images = []
            for path in sorted(folder.glob('*')):
                if (path.is_file() and path.suffix.lower() in {'.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif'}
                        and path.resolve().parent == folder):
                    images.append(dict(name=path.name, path='assets/images/' + path.name))
            self.send(dict(images=images))
        elif route == '/__editor/page':
            try:
                state = prepare(parse_qs(url.query).get('path', [''])[0])
                self.send({k: v for k, v in state.items() if k not in {'source', 'strings', 'blocks', 'regions', 'structure'}} |
                          {'blocks': [{k: v for k, v in b.items() if k not in {'node', 'gap_node'}} for b in state['blocks']],
                           'regions': [{k: v for k, v in r.items() if not k.startswith('_')} for r in state['regions']],
                           'structure': {k: v for k, v in state['structure'].items() if not k.startswith('_')}})
            except (ValueError, OSError) as error:
                self.send(dict(error=str(error)), status=400)
        else:
            super().do_GET()

    def do_POST(self):
        origin = self.headers.get('Origin')
        if not self.local_request() or origin != 'http://' + self.headers.get('Host', '') or self.headers.get('X-Editor-Token') != TOKEN:
            self.send(dict(error='로컬 편집기에서만 저장할 수 있어요'), status=403)
            return
        if self.path != '/__editor/save':
            self.send_error(404)
            return
        try:
            length = int(self.headers.get('Content-Length', 0))
            if not 0 < length <= 2000000:
                raise ValueError('저장 요청 크기가 올바르지 않아요')
            self.send(save(json.loads(self.rfile.read(length))))
        except FileExistsError as error:
            self.send(dict(error=str(error)), status=409)
        except PermissionError as error:
            self.log_error('Save permission error: %r', error)
            self.send(dict(code='FILE_ACCESS_DENIED', error=(
                '파일 쓰기 권한이 거부됐어요. 원본 파일과 백업 폴더의 읽기 전용 설정, '
                '다른 프로그램의 파일 잠금을 확인해 주세요. 편집 내용은 화면에 남아 있어요'
            )), status=400)
        except (ValueError, OSError, KeyError, TypeError) as error:
            self.send(dict(error=str(error)), status=400)


class PreviewServer(ThreadingHTTPServer):
    allow_reuse_address = False

    def server_bind(self):
        if hasattr(socket, 'SO_EXCLUSIVEADDRUSE'):
            self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        super().server_bind()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    server = PreviewServer(('127.0.0.1', args.port), Handler)
    print(f'Preview: http://127.0.0.1:{args.port}/index.html', flush=True)
    print(f'Editor:  http://127.0.0.1:{args.port}/__editor/', flush=True)
    server.serve_forever()
