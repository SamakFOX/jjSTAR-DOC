import importlib.util
import json
from collections import Counter
from pathlib import Path
import tempfile
import threading
import unittest
from unittest import mock
from urllib.request import urlopen

spec = importlib.util.spec_from_file_location('local_editor', Path(__file__).with_name('server.py'))
editor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(editor)


class StructureTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.original_root = editor.ROOT
        editor.ROOT = Path(self.temp.name)
        (editor.ROOT / 'pages').mkdir()
        (editor.ROOT / 'data').mkdir()
        self.strings = 'window.JJSTAR_STRINGS = {\n"L04CHECK": {\n"desc": "별도 소개"\n}\n};\n'
        (editor.ROOT / 'data/strings.js').write_bytes(self.strings.encode())
        self.page = editor.ROOT / 'pages/L04CHECK.html'
        self.source = ('<article class="guide-detail">\r\n  <h1>제목</h1>\r\n  <p>소개</p>'
                       '\r\n  <!-- 본문 -->\r\n  <section><h2>첫 섹션</h2><p>첫 설명</p></section>'
                       '\r\n  <figure class="guide-image-slot"><img src="assets/images/old.webp">'
                       '<figcaption>기존 이미지</figcaption></figure>\r\n</article>\r\n')
        self.page.write_bytes(self.source.encode())

    def tearDown(self):
        editor.ROOT = self.original_root
        self.temp.cleanup()

    def state(self, source=None):
        if source is not None:
            self.page.write_bytes(source.encode())
        return editor.prepare('pages/L04CHECK.html')

    def save(self, state, layout, changes=None):
        return editor.save(dict(path=state['path'], versions=state['versions'], layout=layout, changes=changes or []))

    def layout(self, state):
        return [dict(id=r['id']) for r in state['regions']]

    def assert_reordered_save(self, state, result):
        saved = editor.read(self.page)
        original_nodes = editor.SourceParser(state['source']).nodes
        saved_nodes = editor.SourceParser(saved).nodes
        for attribute in ['id', 'src']:
            original = Counter(n['attrs'][attribute] for n in original_nodes if n['attrs'].get(attribute))
            current = Counter(n['attrs'][attribute] for n in saved_nodes if n['attrs'].get(attribute))
            self.assertEqual(current, original, f'{attribute} 누락 또는 중복')
        self.assertEqual(Counter(line.strip() for line in saved.splitlines() if line.strip()),
                         Counter(line.strip() for line in state['source'].splitlines() if line.strip()))
        self.assertNotIn('\n', saved.replace('\r\n', ''))
        for marker in ['local-region:', 'data-local-', 'contenteditable', 'local-structure-selected']:
            self.assertNotIn(marker, saved)
        self.assertEqual(result['saved'], 1)
        backup = editor.ROOT / result['backup'] / 'pages/L04CHECK.html'
        self.assertEqual(backup.read_bytes(), state['source'].encode())
        self.assertEqual(editor.read(editor.ROOT / 'data/strings.js'), self.strings)
        reopened = self.state()
        self.assertTrue(reopened['structure']['allowed'])
        self.assertEqual(reopened['source'], saved)
        self.assertEqual(reopened['versions'][state['path']], editor.digest(saved))
        return saved, reopened

    def assert_layout_rejected_without_writes(self, state, layout):
        page_before = self.page.read_bytes()
        strings_before = (editor.ROOT / 'data/strings.js').read_bytes()
        backup_root = editor.ROOT / 'outputs/local-editor-backups'
        backups_before = set(backup_root.rglob('*')) if backup_root.exists() else set()
        with mock.patch.object(editor, 'atomic_write', wraps=editor.atomic_write) as write:
            with self.assertRaises(ValueError):
                self.save(state, layout)
            write.assert_not_called()
        self.assertEqual(self.page.read_bytes(), page_before)
        self.assertEqual((editor.ROOT / 'data/strings.js').read_bytes(), strings_before)
        self.assertEqual(set(backup_root.rglob('*')) if backup_root.exists() else set(), backups_before)

    def test_image_caption_groups_move_and_reopen_without_loss(self):
        groups = [
            '<figure class="guide-image-slot"><img src="assets/images/sample.webp?v=example" '
            'width="800" height="400" loading="lazy"><figcaption>그림 설명</figcaption></figure>',
            '<div class="mb-3"><img src="assets/images/sample.webp?v=example" '
            'width="800" height="400" class="w-full h-auto"><p class="text-center">그림 설명</p></div>'
        ]
        for group in groups:
            with self.subTest(group=group.split('>')[0]):
                source = ('<article class="guide-detail">\r\n  <h1>제목</h1>\r\n  <p>소개</p>'
                          '\r\n  <!-- 본문 -->\r\n  <section id="T1"><h2>이용 안내</h2>'
                          '<p>기존 설명 &amp; 안내</p></section>\r\n  ' + group +
                          '\r\n  <p>마지막 설명</p>\r\n</article>\r\n')
                state = self.state(source)
                region = next(r for r in state['regions'] if 'sample.webp' in source[r['_start']:r['_end']])
                layout = self.layout(state)
                index = next(i for i, entry in enumerate(layout) if entry['id'] == region['id'])
                layout[index], layout[index + 1] = layout[index + 1], layout[index]
                saved, reopened = self.assert_reordered_save(state, self.save(state, layout))
                self.assertIn(group, saved)
                self.assertLess(saved.index('<p>마지막 설명</p>'), saved.index(group))
                self.assertEqual(len(reopened['regions']), len(state['regions']))

    def test_nested_sibling_reorder_keeps_anchors_and_untouched_source(self):
        first = ('<div id="step-one" class="guide-flow-card"><strong>첫 안내</strong>'
                 '<p>첫 설명 &amp; 안내</p><figure class="guide-image-slot">'
                 '<img src="assets/images/first.webp"><figcaption>첫 그림 설명</figcaption></figure></div>')
        second = ('<div id="step-two" class="guide-flow-card"><strong>다음 안내</strong>'
                  '<p>다음 설명</p><figure class="guide-image-slot">'
                  '<img src="assets/images/second.webp"><figcaption>다음 그림 설명</figcaption></figure></div>')
        section = ('<section id="T1"><h2>이용 순서</h2><div class="guide-flow-row">\r\n  ' +
                   first + '\r\n  ' + second + '\r\n</div></section>')
        source = ('<article>\r\n  <h1>제목</h1>\r\n  <p>소개</p>\r\n  ' + section +
                  '\r\n  <section id="T2"><h2>별도 안내</h2><p>변경하지 않는 문구</p></section>\r\n</article>\r\n')
        state = self.state(source)
        region = next(r for r in state['regions'] if 'T1' in r['anchorIds'])
        layout = self.layout(state)
        next(entry for entry in layout if entry['id'] == region['id'])['html'] = section.replace(
            first + '\r\n  ' + second, second + '\r\n  ' + first)
        saved, reopened = self.assert_reordered_save(state, self.save(state, layout))
        self.assertLess(saved.index(second), saved.index(first))
        moved = next(r for r in reopened['regions'] if 'T1' in r['anchorIds'])
        self.assertEqual(source[:region['_start']] + source[region['_end']:],
                         saved[:moved['_start']] + saved[moved['_end']:])

    def test_nested_figure_and_caption_move_before_description(self):
        description = '<p>그림과 함께 읽는 기존 설명</p>'
        figure = ('<figure class="guide-image-slot"><img src="assets/images/detail.webp">'
                  '<figcaption>변경하지 않는 그림 설명</figcaption></figure>')
        section = ('<section id="T1"><h2>사용 방법</h2><div class="guide-flow-card">\r\n  ' +
                   description + '\r\n  ' + figure + '\r\n</div></section>')
        source = ('<article>\r\n  <h1>제목</h1>\r\n  <p>소개</p>\r\n  ' + section + '\r\n</article>\r\n')
        state = self.state(source)
        region = next(r for r in state['regions'] if 'T1' in r['anchorIds'])
        layout = self.layout(state)
        next(entry for entry in layout if entry['id'] == region['id'])['html'] = section.replace(
            description + '\r\n  ' + figure, figure + '\r\n  ' + description)
        saved, _ = self.assert_reordered_save(state, self.save(state, layout))
        self.assertIn(figure, saved)
        self.assertLess(saved.index(figure), saved.index(description))

    def test_nested_anchor_loss_is_rejected_before_backup_or_write(self):
        section = ('<section id="T1"><div id="first"><p>첫 설명</p></div>\r\n  '
                   '<div id="second"><p>다음 설명</p></div></section>')
        state = self.state('<article>\r\n<h1>제목</h1>\r\n<p>소개</p>\r\n' + section + '\r\n</article>\r\n')
        region = next(r for r in state['regions'] if 'T1' in r['anchorIds'])
        for anchor in ['T1', 'first', 'second']:
            with self.subTest(anchor=anchor):
                layout = self.layout(state)
                next(entry for entry in layout if entry['id'] == region['id'])['html'] = section.replace(
                    f' id="{anchor}"', '', 1)
                self.assert_layout_rejected_without_writes(state, layout)

    def test_replaced_region_rejects_editor_attributes_and_markers(self):
        state = self.state()
        for content in ['<section data-local-block="1"><p>설명</p></section>',
                        '<section><p contenteditable="true">설명</p></section>',
                        '<section><!--local-region:r1:start--><p>설명</p></section>']:
            with self.subTest(content=content):
                layout = self.layout(state)
                layout[2]['html'] = content
                self.assert_layout_rejected_without_writes(state, layout)

    def test_add_section_image_reopen_and_backup(self):
        state = self.state()
        layout = self.layout(state) + [dict(id='new-example', html=(
            '<section><h2>이용 순서</h2><p>내용을 입력해요</p><figure class="guide-image-slot">'
            '<img src="assets/images/jjstar_d_check-ex-01.webp" alt="신청 화면" loading="lazy">'
            '<figcaption>신청 화면</figcaption></figure></section>'))]
        result = self.save(state, layout)
        saved = editor.read(self.page)
        self.assertEqual(result['saved'], 1)
        self.assertIn(self.source.split('</article>')[0], saved)
        self.assertNotIn('local-region:', saved)
        self.assertNotIn('data-local-', saved)
        self.assertEqual((editor.ROOT / result['backup'] / 'pages/L04CHECK.html').read_bytes(), self.source.encode())
        reopened = self.state()
        self.assertEqual(len(reopened['regions']), 5)
        self.assertEqual('이용 순서', reopened['regions'][-1]['label'])
        self.assertIn('내용을 입력해요', [b['html'] for b in reopened['blocks']])

    def test_unchanged_layout_has_no_write(self):
        state = self.state()
        result = self.save(state, self.layout(state))
        self.assertEqual(result, dict(saved=0, backup=None))
        self.assertEqual(self.page.read_bytes(), self.source.encode())

    def test_move_preserves_source_markup_and_comments(self):
        state = self.state()
        layout = self.layout(state)
        layout[2], layout[3] = layout[3], layout[2]
        self.save(state, layout)
        saved = editor.read(self.page)
        self.assertLess(saved.index('<figure'), saved.index('<!-- 본문 -->'))
        self.assertIn('<section><h2>첫 섹션</h2><p>첫 설명</p></section>', saved)
        self.assertEqual(saved.count('<!-- 본문 -->'), 1)
        self.assertTrue(saved.endswith('\r\n</article>\r\n'))

    def test_delete_plain_section_and_replace_image(self):
        state = self.state()
        layout = self.layout(state)
        del layout[2]
        layout[-1]['html'] = '<figure class="guide-image-slot"><img src="assets/images/new.webp" alt="새 이미지"><figcaption>새 설명</figcaption></figure>'
        self.save(state, layout)
        saved = editor.read(self.page)
        self.assertNotIn('첫 섹션', saved)
        self.assertIn('assets/images/new.webp', saved)
        self.assertNotIn('assets/images/old.webp', saved)

    def test_layout_combines_text_gaps_and_central_description(self):
        state = self.state()
        description = next(b for b in state['blocks'] if b['target'] == 'data/strings.js')
        body = next(b for b in state['blocks'] if b['html'] == '첫 설명')
        changes = [dict(id=description['id'], html='새 소개'), dict(id=body['id'], html='바꾼 설명', gapAfter=1)]
        layout = self.layout(state) + [dict(id='new-text', html='<p>추가 설명</p>')]
        self.save(state, layout, changes)
        self.assertIn('<p>바꾼 설명</p>\r\n<div class="guide-spacer-v"></div>', editor.read(self.page))
        self.assertIn('"desc": "새 소개"', editor.read(editor.ROOT / 'data/strings.js'))
        self.assertIn('<p>소개</p>', editor.read(self.page))

    def test_replaced_region_uses_current_html_once(self):
        state = self.state()
        body = next(b for b in state['blocks'] if b['html'] == '첫 설명')
        layout = self.layout(state)
        layout[2]['html'] = '<section><h2>현재 섹션</h2><p>최종 설명</p></section>'
        self.save(state, layout, [dict(id=body['id'], html='이전 문구 편집')])
        saved = editor.read(self.page)
        self.assertIn('최종 설명', saved)
        self.assertNotIn('이전 문구 편집', saved)
        self.assertNotIn('첫 설명', saved)

    def test_protected_regions_and_barriers(self):
        state = self.state()
        for layout in [self.layout(state)[1:], [self.layout(state)[2], *self.layout(state)[:2], self.layout(state)[3]]]:
            self.assert_layout_rejected_without_writes(state, layout)
        layout = self.layout(state)
        layout[0]['html'] = '<h2>새 상단</h2>'
        self.assert_layout_rejected_without_writes(state, layout)
        self.assertEqual(self.page.read_bytes(), self.source.encode())

    def test_anchor_preservation_and_duplicate_ids(self):
        state = self.state('<article><h1>제목</h1><section id="T1"><p>설명</p></section><p>다른 설명</p></article>')
        for replacement in [None, '<section><p>새 설명</p></section>']:
            layout = self.layout(state)
            if replacement is None:
                del layout[1]
            else:
                layout[1]['html'] = replacement
            with self.assertRaises(ValueError):
                self.save(state, layout)
        layout = self.layout(state) + [dict(id='new-image', html='<figure id="T1"><img src="assets/images/x.webp"></figure>')]
        with self.assertRaises(ValueError):
            self.save(state, layout)
        layout = self.layout(state)
        layout[1]['html'] = '<section id="T1"><h2>새 제목</h2><p>새 설명</p></section>'
        self.save(state, layout)
        self.assertIn('id="T1"', editor.read(self.page))

    def test_reject_executable_markup_and_editor_markers(self):
        state = self.state()
        bad = ['<script>alert(1)</script>', '<img src="x" onerror="x()">',
               '<a href="java&#10;script:x()">실행</a>', '<p style="background:url(x)">문구</p>',
               '<p data-local-block="1">문구</p>', '<!--local-region:r1:start--><p>문구</p>',
               '<section><p>닫히지 않음</section>', '<figure id="x"><img id="x"></figure>',
               '<iframe src="https://example.com"></iframe>', '<form><input></form>',
               '<img srcset="https://example.com/a.png 2x">']
        for markup in bad:
            with self.subTest(markup=markup), self.assertRaises(ValueError):
                self.save(state, self.layout(state) + [dict(id='new-bad', html=markup)])
        self.assertEqual(self.page.read_bytes(), self.source.encode())

    def test_existing_unsupported_region_is_preserved(self):
        source = '<article><h1>제목</h1><div><iframe src="https://example.com"></iframe></div><p>본문</p></article>'
        state = self.state(source)
        self.save(state, self.layout(state) + [dict(id='new-p', html='<p>추가</p>')])
        self.assertIn('<div><iframe src="https://example.com"></iframe></div>', editor.read(self.page))

    def test_marker_order_for_adjacent_regions_and_void_tags(self):
        source = '<article><h1>제목</h1>' + ''.join(f'<p>항목 {n}</p>' for n in range(15)) + '<hr/><img src="assets/images/x.webp"/></article>'
        state = self.state(source)
        self.assertEqual(len(state['regions']), 18)
        self.assertIn('<!--local-region:r9:end--><!--local-region:r10:start-->', state['html'])
        self.assertIn('<!--local-region:r16:start--><hr/><!--local-region:r16:end-->', state['html'])
        self.save(state, self.layout(state))
        self.assertEqual(editor.read(self.page), source)

    def test_empty_text_blocks_stay_editable_after_reopening(self):
        state = self.state()
        self.save(state, self.layout(state) + [dict(id='new-empty', html='<section><h2></h2><p></p><figure><img src="assets/images/x.webp"><figcaption></figcaption></figure></section>')])
        reopened = self.state()
        self.assertEqual({b['tag'] for b in reopened['blocks'] if not b['html']}, {'h2', 'p', 'figcaption'})

    def test_unchanged_duplicate_anchors_are_preserved_but_new_duplicate_is_rejected(self):
        source = '<article><h1>제목</h1><section id="old"><p>설명</p></section><section id="old"><p>다른 설명</p></section></article>'
        state = self.state(source)
        self.save(state, self.layout(state) + [dict(id='new-p', html='<p>추가</p>')])
        self.assertEqual(editor.read(self.page).count('id="old"'), 2)
        reopened = self.state()
        with self.assertRaises(ValueError):
            self.save(reopened, self.layout(reopened) + [dict(id='new-bad', html='<p id="old">중복</p>')])

    def test_div_fallback_and_unsupported_multiple_roots(self):
        state = self.state('<div class="guide-l3-content"><div class="max-w-1200"><h1>제목</h1><p>소개</p><p>본문</p></div></div>')
        self.assertTrue(state['structure']['allowed'])
        self.assertEqual(len(state['regions']), 3)
        self.save(state, self.layout(state) + [dict(id='new-p', html='<p>추가</p>')])
        self.assertIn('<p>추가</p>', editor.read(self.page))
        state = self.state('<article><p>하나</p></article><article><p>둘</p></article>')
        self.assertFalse(state['structure']['allowed'])
        self.assertTrue(state['blocks'])
        with self.assertRaises(ValueError):
            self.save(state, [])

    def test_conflict_does_not_apply_layout(self):
        state = self.state()
        self.page.write_bytes((self.source + '<!-- 다른 편집 -->').encode())
        with self.assertRaises(FileExistsError):
            self.save(state, self.layout(state) + [dict(id='new-p', html='<p>추가</p>')])
        self.assertNotIn('<p>추가</p>', editor.read(self.page))

    def test_layout_and_description_write_failure_rolls_back_both_files(self):
        state = self.state()
        description = next(b for b in state['blocks'] if b['target'] == 'data/strings.js')
        layout = self.layout(state) + [dict(id='new-p', html='<p>추가</p>')]
        write = editor.atomic_write
        calls = []
        def fail_second(path, content):
            calls.append(path)
            if len(calls) == 2:
                raise PermissionError('locked page')
            return write(path, content)
        with mock.patch.object(editor, 'atomic_write', side_effect=fail_second):
            with self.assertRaises(PermissionError):
                self.save(state, layout, [dict(id=description['id'], html='새 소개')])
        self.assertEqual(editor.read(self.page), self.source)
        self.assertEqual(editor.read(editor.ROOT / 'data/strings.js'), self.strings)
        self.assertEqual(len(calls), 3)

    def test_http_metadata_and_image_registry(self):
        folder = editor.ROOT / 'assets/images'
        folder.mkdir(parents=True)
        (folder / 'sample.webp').write_bytes(b'test')
        (folder / 'ignored.txt').write_text('not an image')
        server = editor.PreviewServer(('127.0.0.1', 0), editor.Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        base = f'http://127.0.0.1:{server.server_port}'
        try:
            with urlopen(base + '/__editor/page?path=pages/L04CHECK.html') as response:
                state = json.load(response)
            self.assertTrue(state['structure']['allowed'])
            self.assertEqual(set(state['regions'][0]), {'id', 'tag', 'label', 'protected', 'anchorIds'})
            self.assertFalse(any(key.startswith('_') for key in state['structure']))
            self.assertNotIn('source', state)
            with urlopen(base + '/__editor/images') as response:
                self.assertEqual(json.load(response), dict(images=[dict(name='sample.webp', path='assets/images/sample.webp')]))
        finally:
            server.shutdown()
            thread.join()
            server.server_close()


if __name__ == '__main__':
    unittest.main()
