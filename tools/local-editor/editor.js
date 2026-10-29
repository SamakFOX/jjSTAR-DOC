(() => {
  const $ = id => document.getElementById(id);
  const frame = $('preview');
  let config, state, doc, selectionRange, activeBlock;
  let originals = new Map(), past = [], future = [], busy = false;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function status(message, error = false) {
    $('status').textContent = message;
    $('status').classList.toggle('error', error);
  }
  async function request(url, options) {
    const response = await fetch(url, {cache: 'no-store', ...options});
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || '요청을 처리하지 못했어요');
    return result;
  }
  function blocks() { return [...(doc?.querySelectorAll('[data-local-block]') || [])]; }
  function snapshot() {
    return blocks().map(e => [e.dataset.localBlock, e.innerHTML, Number(e.dataset.localGapBefore || 0), Number(e.dataset.localGapAfter || 0)]);
  }
  function changes() {
    return snapshot().filter(([id, html, before, after]) => originals.get(id) !== html || before || after)
      .map(([id, html, gapBefore, gapAfter]) => ({id, html, gapBefore, gapAfter}));
  }
  function update() {
    const edits = changes();
    $('review').disabled = busy || !edits.length;
    $('undo').disabled = !past.length;
    $('redo').disabled = !future.length;
    blocks().forEach(e => e.classList.toggle('local-changed', e.innerHTML !== originals.get(e.dataset.localBlock)
      || Number(e.dataset.localGapBefore || 0) > 0 || Number(e.dataset.localGapAfter || 0) > 0));
    if (!busy) status(edits.length ? `${edits.length}개 항목 변경 · 아직 저장하지 않았어요` : `${state?.path || ''} · 저장된 상태`);
  }
  function record() {
    const current = snapshot();
    if (JSON.stringify(past.at(-1)) !== JSON.stringify(current)) past.push(current);
    if (past.length > 100) past.shift();
    future = [];
  }
  function restore(values) {
    const map = new Map(values.map(([id, html, before, after]) => [id, {html, before, after}]));
    blocks().forEach(e => {
      const saved = map.get(e.dataset.localBlock);
      if (!saved) return;
      e.innerHTML = saved.html;
      e.dataset.localGapBefore = saved.before || 0;
      e.dataset.localGapAfter = saved.after || 0;
      renderGaps(e);
    });
    selectionRange = null;
    update();
  }
  function undo() {
    if (!past.length) return;
    future.push(snapshot()); restore(past.pop());
  }
  function redo() {
    if (!future.length) return;
    past.push(snapshot()); restore(future.pop());
  }
  function renderGaps(block) {
    const id = block.dataset.localBlock;
    doc.querySelectorAll(`[data-local-gap-owner="${id}"]`).forEach(e => e.remove());
    const anchor = doc.querySelector(`[data-local-gap-anchor="${id}"]`) || block;
    for (const side of ['Before', 'After']) {
      const fragment = doc.createDocumentFragment();
      for (let i = 0; i < Number(block.dataset['localGap' + side] || 0); i++) {
        const gap = doc.createElement('div');
        gap.className = 'guide-spacer-v';
        gap.dataset.localGapOwner = id;
        gap.textContent = 'GAP';
        fragment.append(gap);
      }
      if (side === 'Before') anchor.before(fragment);
      else anchor.after(fragment);
    }
  }
  function addGap(side) {
    const block = activeBlock;
    const spec = state?.blocks.find(b => b.id === block?.dataset.localBlock);
    if (spec && !spec.gap) {
      status('GAP 기능을 사용하려면 최신 편집 서버에 접속해 주세요', true); return;
    }
    if (!block?.isConnected || !spec?.gap?.allowed) {
      status('GAP을 넣을 문단이나 제목을 먼저 클릭해 주세요', true); return;
    }
    const key = side === 'before' ? 'localGapBefore' : 'localGapAfter';
    if (side !== 'clear' && Number(block.dataset[key] || 0) >= 3) {
      status('앞뒤 각각 GAP을 3개까지 추가할 수 있어요', true); return;
    }
    record();
    if (side === 'clear') {
      block.dataset.localGapBefore = 0;
      block.dataset.localGapAfter = 0;
    } else block.dataset[key] = Number(block.dataset[key] || 0) + 1;
    renderGaps(block); update();
  }
  function rememberSelection() {
    const selection = doc.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const element = node => node.nodeType === 1 ? node : node.parentElement;
    const first = element(range.startContainer)?.closest('[data-local-block]');
    const last = element(range.endContainer)?.closest('[data-local-block]');
    if (first && first === last) {
      selectionRange = range.cloneRange(); activeBlock = first;
    } else {
      selectionRange = null;
    }
  }
  function plainFragment(fragment) {
    const result = doc.createDocumentFragment();
    function add(node) {
      if (node.nodeType === 3) result.append(doc.createTextNode(node.textContent));
      else if (node.nodeName === 'BR') result.append(doc.createElement('br'));
      else if (!['IMG', 'SVG'].includes(node.nodeName)) [...node.childNodes].forEach(add);
    }
    [...fragment.childNodes].forEach(add);
    return result;
  }
  // Split inline ancestors so removing a style also works inside an existing badge.
  function lift(marker, block) {
    while (marker.parentNode !== block) {
      const parent = marker.parentElement;
      const tail = parent.cloneNode(false);
      tail.removeAttribute('id');
      while (marker.nextSibling) tail.append(marker.nextSibling);
      parent.after(marker);
      if (tail.childNodes.length) marker.after(tail);
      if (!parent.childNodes.length) parent.remove();
    }
  }
  function formattingRoot(range, block) {
    const element = node => node.nodeType === 1 ? node : node.parentElement;
    const start = element(range.startContainer), end = element(range.endContainer);
    let root = block;
    for (let parent = start; parent; parent = parent.parentElement) {
      const display = doc.defaultView.getComputedStyle(parent).display;
      if (display === 'flex' || display === 'grid') {
        let child = start;
        while (child && child.parentElement !== parent) child = child.parentElement;
        if (!child || !child.contains(end)) return null;
        if (root === block) root = child;
      }
      if (parent === block) break;
    }
    return root;
  }
  function apply(format) {
    if (!selectionRange || selectionRange.collapsed || !activeBlock?.isConnected || !selectionRange.toString().trim()) {
      status('서식을 적용할 문구를 한 문단 안에서 드래그해 주세요', true); return;
    }
    const root = formattingRoot(selectionRange, activeBlock);
    if (!root) {
      status('번호나 다른 칸을 제외하고 본문 문구만 선택해 주세요', true); return;
    }
    record();
    const start = doc.createElement('span'), end = doc.createElement('span');
    const range = selectionRange.cloneRange();
    const endRange = range.cloneRange(); endRange.collapse(false); endRange.insertNode(end);
    const startRange = range.cloneRange(); startRange.collapse(true); startRange.insertNode(start);
    lift(end, root); lift(start, root);
    const selected = doc.createRange(); selected.setStartAfter(start); selected.setEndBefore(end);
    const content = plainFragment(selected.extractContents());
    let output = content;
    if (format !== 'plain') {
      const wrapper = doc.createElement(['title', 'section', 'bold'].includes(format) ? 'strong' : 'span');
      if (format === 'button') wrapper.className = 'guide-button-label';
      if (format === 'jjstar') wrapper.className = 'guide-button-label guide-button-label--jjstar';
      if (format === 'title') {
        wrapper.style.cssText = 'display: inline-flex; align-items: center; gap: 0.2em; white-space: nowrap;';
        const icon = doc.createElement('img');
        icon.setAttribute('src', 'assets/icons/icon-star-01.webp');
        icon.alt = ''; icon.width = 20; icon.height = 20;
        icon.style.cssText = 'width: 1em; height: 1em; object-fit: contain; flex-shrink: 0;';
        wrapper.append(icon);
      }
      if (format === 'section') {
        wrapper.className = 'guide-inline-section-title';
        const icon = doc.createElement('img');
        icon.setAttribute('src', 'assets/images/jjstar-head-title.svg');
        icon.alt = ''; icon.width = 24; icon.height = 24;
        const text = doc.createElement('span'); text.append(content);
        if (!activeBlock.closest('.guide-section-heading')) wrapper.append(icon);
        wrapper.append(text);
      } else wrapper.append(content);
      const colors = {blue: '#0083c3', red: '#dc2626', yellow: '#f3d02a'};
      if (colors[format]) {
        wrapper.className = 'font-bold';
        wrapper.style.setProperty('color', colors[format], 'important');
      }
      output = wrapper;
    }
    end.before(output); start.remove(); end.remove();
    [...activeBlock.querySelectorAll('span,strong,b,em,i,u,s,a')].reverse().forEach(element => {
      const starOnly = (element.querySelector('img[src="assets/icons/icon-star-01.webp"]')
        || element.matches('.guide-inline-section-title')) && !element.textContent.trim();
      if (starOnly || (!element.textContent && !element.querySelector('img,svg,br'))) element.remove();
    });
    selectionRange = null;
    update();
  }
  function insertText(text) {
    const selection = doc.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const element = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
    if (!element.closest('[data-local-block]')) return;
    record();
    range.deleteContents();
    const fragment = doc.createDocumentFragment();
    text.replace(/\r\n?/g, '\n').split('\n').forEach((line, i) => {
      if (i) fragment.append(doc.createElement('br'));
      fragment.append(doc.createTextNode(line));
    });
    const last = fragment.lastChild;
    range.insertNode(fragment);
    if (last) { range.setStartAfter(last); range.collapse(true); selection.removeAllRanges(); selection.addRange(range); }
    update();
  }
  async function load(path, force = false) {
    if (!force && changes().length && !confirm('저장하지 않은 변경 내용을 버리고 다른 문서를 열까요?')) {
      $('pages').value = state.path; return;
    }
    busy = true; $('review').disabled = true; status('문서를 불러오고 있어요');
    try {
      const next = await request('/__editor/page?path=' + encodeURIComponent(path));
      await new Promise(resolve => {
        frame.onload = resolve;
        frame.srcdoc = `<!doctype html><html lang="ko" translate="no" class="notranslate" data-theme="${$('dark').checked ? 'dark' : 'light'}"><head><meta charset="utf-8"><meta name="google" content="notranslate"><base href="${escape(location.origin)}/"><link rel="stylesheet" href="assets/css/style.css?v=editor"><link rel="stylesheet" href="assets/css/style_l3.css?v=${Date.now()}"><style>${config.styles}\nhtml{height:100%;overflow-x:hidden;overflow-y:auto;scrollbar-gutter:stable;background:var(--sidebar-bg);color-scheme:light}html[data-theme=dark]{background:#111827;color-scheme:dark}body{margin:0;min-width:0;min-height:100%;height:auto;overflow:visible;background:var(--sidebar-bg)}.viewer{margin:0 auto!important;padding:20px!important;max-width:850px;width:100%;overflow:visible;height:auto} [data-local-block]{outline:1px dashed transparent;outline-offset:4px;cursor:text} [data-local-block]:hover{outline-color:#b3cbe3} [data-local-block]:focus{outline:2px solid #0083c3} .local-changed{outline-color:#e2b900} [data-local-block] img{pointer-events:none} [data-local-block] span.guide-button-label{cursor:text} [data-local-gap-owner]{display:flex;align-items:center;justify-content:center;outline:1px dashed #d5ad28;background:rgba(243,208,42,.08);color:#9a7600;font:600 12px Pretendard,sans-serif;user-select:none}</style></head><body data-theme="${$('dark').checked ? 'dark' : 'light'}"><main id="viewer" class="viewer">${next.html}</main></body></html>`;
      });
      state = next; doc = frame.contentDocument;
      originals = new Map(); past = []; future = []; selectionRange = null; activeBlock = null;
      blocks().forEach(e => {
        e.contentEditable = 'true'; e.spellcheck = false;
        originals.set(e.dataset.localBlock, e.innerHTML);
        e.addEventListener('beforeinput', event => {
          if (['insertParagraph', 'insertLineBreak'].includes(event.inputType)) {
            event.preventDefault(); insertText('\n');
          } else record();
        });
        e.addEventListener('input', update);
        e.addEventListener('paste', event => { event.preventDefault(); insertText(event.clipboardData.getData('text/plain')); });
        e.addEventListener('drop', event => event.preventDefault());
      });
      doc.addEventListener('selectionchange', rememberSelection);
      doc.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (link) {
          event.preventDefault();
          if (!link.closest('[data-local-block]') && link.getAttribute('href')?.startsWith('#')) {
            doc.getElementById(link.getAttribute('href').slice(1))?.scrollIntoView({block:'start'});
          }
        }
      });
      doc.addEventListener('keydown', shortcut);
      const query = new URL(location.href); query.searchParams.set('path', path); history.replaceState(null, '', query);
      $('pages').value = path;
    } catch (error) { status(error.message, true); busy = false; return; }
    busy = false; update();
  }
  function readable(markup) {
    const t = document.createElement('template');
    t.innerHTML = markup.replace(/<br\s*\/?\s*>/gi, '\n');
    return t.content.textContent;
  }
  function review() {
    const edits = changes();
    if (!edits.length || busy) return;
    $('changes').replaceChildren();
    for (const edit of edits) {
      const block = state.blocks.find(b => b.id === edit.id);
      const row = document.createElement('section'); row.className = 'change';
      const label = document.createElement('small'); label.textContent = `${block.target} · ${block.tag}`;
      const comparison = document.createElement('div'); comparison.className = 'comparison';
      for (const [title, markup] of [['변경 전', originals.get(edit.id)], ['변경 후', edit.html]]) {
        const column = document.createElement('div'), strong = document.createElement('strong'), pre = document.createElement('pre');
        strong.textContent = title; pre.textContent = readable(markup); column.append(strong, pre); comparison.append(column);
      }
      if (edit.gapBefore || edit.gapAfter) {
        const note = document.createElement('p');
        note.textContent = `GAP 추가: 앞 ${edit.gapBefore}개 · 뒤 ${edit.gapAfter}개 (${state.path})`;
        row.append(note);
      }
      if (originals.get(edit.id) !== edit.html && readable(originals.get(edit.id)) === readable(edit.html)) {
        const note = document.createElement('p'); note.textContent = '문구는 같고 서식이 변경됐어요. 프리뷰에서 적용 모양을 확인해 주세요'; row.append(note);
      }
      row.prepend(label, comparison); $('changes').append(row);
    }
    $('reviewDialog').showModal();
  }
  function shortcut(event) {
    if (!(event.ctrlKey || event.metaKey)) return;
    if (event.key.toLowerCase() === 's') { event.preventDefault(); review(); }
    if (event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); }
    if (event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); }
    if (event.key.toLowerCase() === 'b' && event.target.ownerDocument === doc) { event.preventDefault(); rememberSelection(); apply('bold'); }
  }
  document.querySelectorAll('[data-format]').forEach(button => {
    button.addEventListener('mousedown', event => event.preventDefault());
    button.addEventListener('click', () => apply(button.dataset.format));
  });
  document.querySelectorAll('[data-gap]').forEach(button => {
    button.addEventListener('mousedown', event => event.preventDefault());
    button.addEventListener('click', () => addGap(button.dataset.gap));
  });
  $('undo').onclick = undo; $('redo').onclick = redo;
  $('review').onclick = review; $('cancelSave').onclick = () => $('reviewDialog').close();
  $('reload').onclick = () => load($('pages').value);
  $('pages').onchange = () => load($('pages').value);
  $('dark').onchange = () => {
    if (!doc) return;
    const theme = $('dark').checked ? 'dark' : 'light';
    doc.documentElement.dataset.theme = theme;
    doc.body.dataset.theme = theme;
  };
  $('save').onclick = async () => {
    busy = true; $('save').disabled = true;
    try {
      const y = frame.contentWindow.scrollY;
      const result = await request('/__editor/save', {method:'POST', headers:{'Content-Type':'application/json','X-Editor-Token':config.token},
        body:JSON.stringify({path:state.path, versions:state.versions, changes:changes()})});
      $('reviewDialog').close();
      await load(state.path, true);
      frame.contentWindow.scrollTo(0, y);
      status(`저장 완료 · 백업: ${result.backup || '변경 없음'} · 일반 프리뷰는 새로고침해 주세요`);
    } catch (error) { status(error.message, true); $('reviewDialog').close(); }
    finally { busy = false; $('save').disabled = false; $('review').disabled = !changes().length; }
  };
  document.addEventListener('keydown', shortcut);
  window.addEventListener('beforeunload', event => { if (changes().length) { event.preventDefault(); event.returnValue = ''; } });
  function pageOptions() {
    const keyword = $('search').value.trim().toLowerCase();
    const pages = config.pages.filter(p => `${p.title} ${p.path}`.toLowerCase().includes(keyword) || p.path === state?.path);
    $('pages').replaceChildren(...pages.map(p => {
      const option = document.createElement('option'); option.value = p.path; option.textContent = `${p.title} · ${p.path}`; return option;
    }));
    if (state) $('pages').value = state.path;
  }
  $('search').oninput = pageOptions;
  (async () => {
    try {
      config = await request('/__editor/config'); pageOptions();
      const path = new URLSearchParams(location.search).get('path') || 'pages/L04TGJB.html';
      await load(config.pages.some(p => p.path === path) ? path : config.pages[0].path, true);
    } catch (error) { status('편집 서버 연결을 확인해 주세요: ' + error.message, true); }
  })();
})();
