(() => {
  const $ = id => document.getElementById(id);
  const frame = $('preview');
  let config, state, doc, selectionRange, activeBlock, structure;
  let boundText = new WeakSet();
  let originals = new Map(), past = [], future = [], busy = false;
  let codeView = false, previewScrollY = 0;
  let selectionPathElements = [], selectionPathCount = 0;
  let lastMovedElements = [], autoSpacingTimer = null;
  let autoSpacingFrame = 0, autoSpacingListeners = [];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function status(message, error = false) {
    $('status').textContent = message;
    $('status').classList.toggle('error', error);
  }
  async function request(url, options) {
    const response = await fetch(url, {cache: 'no-store', ...options});
    const text = await response.text();
    let result;
    try {
      if (!text.trim()) throw new Error('empty');
      result = JSON.parse(text);
      if (!result || typeof result !== 'object') throw new Error('invalid');
    } catch (_) {
      const message = text.trim() ? '서버가 올바른 편집 응답을 보내지 않았어요' : '서버 응답이 비어 있어요';
      const error = new Error(`${message} (HTTP ${response.status})`);
      error.status = response.status;
      throw error;
    }
    if (!response.ok) {
      const error = new Error(result.error || `요청을 처리하지 못했어요 (HTTP ${response.status})`);
      error.status = response.status;
      error.responseFormat = 'json';
      error.code = result.code;
      throw error;
    }
    return result;
  }
  async function saveChanges(payload) {
    const body = JSON.stringify(payload);
    const send = () => request('/__editor/save', {method:'POST',
      headers:{'Content-Type':'application/json','X-Editor-Token':config.token}, body});
    try { return await send(); }
    catch (error) {
      if (error.status !== 403 || error.responseFormat !== 'json') throw error;
      const current = await request('/__editor/config');
      if (typeof current.token !== 'string' || !current.token) throw new Error('편집 연결을 갱신하지 못했어요. 문구를 보관한 뒤 편집기를 다시 열어 주세요');
      config.token = current.token;
      return send();
    }
  }
  function blocks() { return [...(doc?.querySelectorAll('[data-local-block]') || [])]; }
  function textSnapshot() {
    return blocks().map(e => [e.dataset.localBlock, e.innerHTML, Number(e.dataset.localGapBefore || 0), Number(e.dataset.localGapAfter || 0), e.dataset.localTipBox === 'true']);
  }
  function snapshot() { return {text:textSnapshot(), structure:structure?.snapshot()}; }
  function changes() {
    return textSnapshot().filter(([id, html, before, after, tipBox]) => originals.has(id) && (originals.get(id) !== html || before || after || tipBox))
      .map(([id, html, gapBefore, gapAfter, tipBox]) => ({id, html, gapBefore, gapAfter, tipBox}));
  }
  function pendingCount() { return changes().length + (structure?.summary().length || 0); }
  function hideAutoSpacing() {
    if (autoSpacingTimer) clearTimeout(autoSpacingTimer);
    if (autoSpacingFrame) cancelAnimationFrame(autoSpacingFrame);
    autoSpacingFrame = 0;
    autoSpacingListeners.forEach(remove => remove()); autoSpacingListeners = [];
    autoSpacingTimer = null; lastMovedElements = []; $('autoSpacing').hidden = true;
  }
  function positionAutoSpacing() {
    autoSpacingFrame = 0;
    const button = $('autoSpacing');
    if (button.hidden) return;
    if (lastMovedElements.some(element => !element.isConnected)) { hideAutoSpacing(); return; }
    const frameRect = frame.getBoundingClientRect();
    if (busy || codeView || frame.hidden || !frameRect.width || !frameRect.height) { button.style.visibility = 'hidden'; return; }
    const rectangles = lastMovedElements.map(element => element.getBoundingClientRect()).filter(rect => rect.width && rect.height);
    const top = Math.min(...rectangles.map(rect => rect.top)), bottom = Math.max(...rectangles.map(rect => rect.bottom));
    const leftEdge = Math.min(...rectangles.map(rect => rect.left)), rightEdge = Math.max(...rectangles.map(rect => rect.right));
    if (!rectangles.length || bottom <= 0 || top >= frame.clientHeight || rightEdge <= 0 || leftEdge >= frame.clientWidth
      || frameRect.bottom <= 0 || frameRect.top >= innerHeight) { button.style.visibility = 'hidden'; return; }
    const frameLeft = frameRect.left + frame.clientLeft, frameTop = frameRect.top + frame.clientTop;
    const right = frameLeft + rightEdge;
    const maxRight = Math.min(innerWidth,frameRect.right) - 8, minLeft = Math.max(8,frameRect.left + 8);
    const width = button.offsetWidth, height = button.offsetHeight;
    const left = right + width + 12 <= maxRight ? right + 8 : right - width - 8;
    const minTop = Math.max(8,frameRect.top + 8), maxTop = Math.min(innerHeight,frameRect.bottom) - height - 8;
    button.style.left = Math.max(minLeft,Math.min(left,maxRight-width)) + 'px';
    button.style.top = Math.max(minTop,Math.min(frameTop+top+4,maxTop)) + 'px';
    button.style.visibility = 'visible';
  }
  function queueAutoSpacing() {
    if (!autoSpacingFrame && !$('autoSpacing').hidden) autoSpacingFrame = requestAnimationFrame(positionAutoSpacing);
  }
  function showAutoSpacing(elements) {
    hideAutoSpacing();
    lastMovedElements = elements.filter(element => element.isConnected);
    if (!lastMovedElements.length) return;
    $('autoSpacing').hidden = false; $('autoSpacing').disabled = busy || codeView;
    $('autoSpacing').style.visibility = 'hidden';
    for (const [target,type,capture] of [[window,'resize',false],[frame.contentWindow,'scroll',true],[frame.contentWindow,'resize',false],[doc,'load',true]]) {
      const options = {capture,passive:true};
      target.addEventListener(type,queueAutoSpacing,options);
      autoSpacingListeners.push(() => target.removeEventListener(type,queueAutoSpacing,options));
    }
    queueAutoSpacing();
    autoSpacingTimer = setTimeout(hideAutoSpacing,10000);
  }
  function selectedElements() { return structure?.getSelectedElements?.() || []; }
  function singleTextAction() {
    if (selectedElements().length < 2) return true;
    status('문구를 편집하려면 한 항목만 선택해 주세요 여러 항목은 함께 이동할 수 있어요', true);
    return false;
  }
  function renderSelectionPath() {
    const bar = $('selectionPath'), path = structure?.getSelectionPath() || [];
    const count = selectedElements().length;
    bar.hidden = codeView || !path.length;
    const same = count === selectionPathCount && path.length === selectionPathElements.length && path.every((part,index) => part.element === selectionPathElements[index]);
    if (!same) {
      selectionPathCount = count;
      selectionPathElements = path.map(part => part.element);
      bar.replaceChildren();
      const parent = document.createElement('button'); parent.type = 'button'; parent.textContent = '↑ 상위 묶음';
      parent.dataset.parentSelection = 'true'; parent.onclick = () => structure?.selectParent(); bar.append(parent);
      const label = document.createElement('span'); label.textContent = count > 1 ? `${count}개 선택 · 함께 이동` : '선택 경로'; bar.append(label);
      path.forEach((part,index) => {
        if (index) { const separator = document.createElement('span'); separator.textContent = '›'; separator.setAttribute('aria-hidden','true'); bar.append(separator); }
        const button = document.createElement('button'); button.type = 'button'; button.textContent = part.label;
        button.title = part.element.textContent.trim().replace(/\s+/g,' ').slice(0,90) || part.label;
        button.dataset.selectionIndex = String(index); button.onclick = () => structure?.select(part.element,false);
        button.setAttribute('aria-current',String(index === path.length-1)); bar.append(button);
      });
      if (count > 1) {
        const clear = document.createElement('button'); clear.type = 'button'; clear.textContent = '선택 해제';
        clear.dataset.clearSelection = 'true'; clear.onclick = () => structure?.select(null); bar.append(clear);
      }
    }
    bar.querySelectorAll('button').forEach(button => {
      const unavailable = button.dataset.clearSelection ? false : button.dataset.parentSelection ? path.length < 2 : Number(button.dataset.selectionIndex) === path.length-1;
      button.disabled = busy || codeView || unavailable;
    });
  }
  function refreshCodeView() {
    if (!codeView || !doc) return;
    const viewer = doc.getElementById('viewer');
    if (!viewer) return;
    const copy = viewer.cloneNode(true);
    window.JJSTAR_EDITOR_BLOCKS.cleanTree(copy);
    $('sourceCode').value = copy.innerHTML;
  }
  function updateViewControls() {
    $('codeToggle').disabled = busy || !doc;
    $('codeToggle').textContent = codeView ? '화면으로 보기' : '코드로 보기';
    $('codeToggle').setAttribute('aria-pressed', String(codeView));
    frame.hidden = codeView;
    $('sourceView').hidden = !codeView;
    document.querySelectorAll('[data-format],[data-gap],#tipBox').forEach(button => button.disabled = busy || codeView || selectedElements().length > 1);
    const spacingLocked = busy || codeView || !selectedElements().length || typeof structure?.setSpacing !== 'function';
    for (const id of ['spacingSize','spacingBefore','spacingAfter','spacingClear']) $(id).disabled = spacingLocked;
    if (lastMovedElements.some(element => !element.isConnected)) hideAutoSpacing();
    $('autoSpacing').disabled = busy || codeView;
    queueAutoSpacing();
    renderSelectionPath();
  }
  function toggleCodeView() {
    if (busy || !doc) return;
    if (!codeView) {
      try { previewScrollY = frame.contentWindow.scrollY; } catch (_) {}
    }
    codeView = !codeView;
    refreshCodeView(); update();
    if (codeView) $('sourceCode').focus({preventScroll:true});
    else {
      try { frame.contentWindow.scrollTo(0, previewScrollY); } catch (_) {}
    }
  }
  function update() {
    const count = pendingCount();
    $('review').disabled = busy || !count;
    $('undo').disabled = busy || codeView || !past.length;
    $('redo').disabled = busy || codeView || !future.length;
    blocks().forEach(e => e.classList.toggle('local-changed', e.innerHTML !== originals.get(e.dataset.localBlock)
      || Number(e.dataset.localGapBefore || 0) > 0 || Number(e.dataset.localGapAfter || 0) > 0 || e.dataset.localTipBox === 'true'));
    structure?.refresh();
    refreshCodeView(); updateViewControls();
    if (!busy) status(count ? `${count}개 항목 변경 · 아직 저장하지 않았어요` : `${state?.path || ''} · 저장된 상태`);
  }
  function record() {
    const current = snapshot();
    if (JSON.stringify(past.at(-1)) !== JSON.stringify(current)) past.push(current);
    if (past.length > 100) past.shift();
    future = [];
  }
  function restore(values) {
    structure?.restore(values.structure);
    const map = new Map(values.text.map(([id, html, before, after, tipBox]) => [id, {html, before, after, tipBox}]));
    blocks().forEach(e => {
      const saved = map.get(e.dataset.localBlock);
      if (!saved) return;
      e.innerHTML = saved.html;
      e.dataset.localGapBefore = saved.before || 0;
      e.dataset.localGapAfter = saved.after || 0;
      e.dataset.localTipBox = String(!!saved.tipBox);
      renderTipBox(e);
      renderGaps(e);
    });
    selectionRange = null; activeBlock = null;
    update();
  }
  function undo() {
    if (busy) return;
    if (!past.length) return;
    future.push(snapshot()); restore(past.pop());
  }
  function redo() {
    if (busy) return;
    if (!future.length) return;
    past.push(snapshot()); restore(future.pop());
  }
  function renderGaps(block) {
    const id = block.dataset.localBlock;
    doc.querySelectorAll(`[data-local-gap-owner="${id}"]`).forEach(e => e.remove());
    const anchor = doc.querySelector(`[data-local-tip-owner="${id}"]`) || doc.querySelector(`[data-local-gap-anchor="${id}"]`) || block;
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
  function renderTipBox(block) {
    const existing = block.closest('[data-local-tip-owner]');
    if (block.dataset.localTipBox !== 'true') {
      if (existing) existing.replaceWith(block);
      return;
    }
    if (existing) return;
    const wrapper = doc.createElement('div');
    wrapper.className = 'tip-box tip-box--with-character guide-extra-tip';
    wrapper.dataset.localTipOwner = block.dataset.localBlock;
    const row = doc.createElement('div'); row.className = 'flex items-start gap-3';
    const content = doc.createElement('div'); content.className = 'tip-box-content';
    block.before(wrapper); wrapper.append(row); row.append(content); content.append(block);
  }
  function toggleTipBox() {
    if (busy || !singleTextAction()) return;
    const block = activeBlock;
    const spec = blockSpec(block);
    if (!block?.isConnected || !spec?.tip?.allowed) {
      status('팁박스로 바꿀 본문 문단을 클릭해 주세요. 기존 팁박스·제목·상단 소개는 전환하지 않아요', true); return;
    }
    record();
    block.dataset.localTipBox = String(block.dataset.localTipBox !== 'true');
    renderTipBox(block); renderGaps(block); structure?.markText(block); update();
  }
  function addGap(side) {
    if (busy || !singleTextAction()) return;
    const block = activeBlock;
    const spec = blockSpec(block);
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
    renderGaps(block); structure?.markText(block); update();
  }
  function blockSpec(block) {
    const id = block?.dataset.localBlock;
    return state?.blocks.find(b => b.id === id) || (id && structure?.ownsText(id) ? {
      gap:{allowed:block.matches('p,h2,h3,h4,h5,h6')}, tip:{allowed:block.matches('p') && !block.closest('.tip-box,figure')}
    } : null);
  }
  function bindEditable() {
    blocks().forEach(e => {
      e.contentEditable = 'true'; e.spellcheck = false;
      if (boundText.has(e)) return;
      boundText.add(e);
      e.addEventListener('focus', () => { activeBlock = e; });
      e.addEventListener('beforeinput', event => {
        if (busy || !singleTextAction()) { event.preventDefault(); return; }
        if (['insertParagraph','insertLineBreak'].includes(event.inputType)) {
          event.preventDefault(); insertText('\n');
        } else record();
      });
      e.addEventListener('input', () => { structure?.markText(e); update(); });
      e.addEventListener('paste', event => { event.preventDefault(); insertText(event.clipboardData.getData('text/plain')); });
      e.addEventListener('drop', event => event.preventDefault());
    });
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
    if (busy || !singleTextAction()) return;
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
    if (busy || !singleTextAction()) return;
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
    if (busy && !force) { $('pages').value = state?.path || path; return false; }
    if (!force && (typeof structure !== 'undefined' && structure?.changed() || changes().length) && !confirm('저장하지 않은 변경 내용을 버리고 다른 문서를 열까요?')) {
      $('pages').value = state.path; return false;
    }
    busy = true; $('review').disabled = true; updateViewControls(); status('문서를 불러오고 있어요');
    try {
      const next = await request('/__editor/page?path=' + encodeURIComponent(path));
      structure?.destroy();
      await new Promise(resolve => {
        frame.onload = resolve;
        frame.srcdoc = `<!doctype html><html lang="ko" translate="no" class="notranslate" data-theme="${$('dark').checked ? 'dark' : 'light'}"><head><meta charset="utf-8"><meta name="google" content="notranslate"><base href="${escape(location.origin)}/"><link rel="stylesheet" href="assets/css/style.css?v=editor"><link rel="stylesheet" href="assets/css/style_l3.css?v=${Date.now()}"><style>${config.styles}\nhtml{height:100%;overflow-x:hidden;overflow-y:auto;scrollbar-gutter:stable;background:var(--sidebar-bg);color-scheme:light}html[data-theme=dark]{background:#111827;color-scheme:dark}body{margin:0;min-width:0;min-height:100%;height:auto;overflow:visible;background:var(--sidebar-bg)}.viewer{margin:0 auto!important;padding:20px!important;max-width:850px;width:100%;overflow:visible;height:auto} [data-local-block]{outline:1px dashed transparent;outline-offset:4px;cursor:text} [data-local-block]:hover{outline-color:#b3cbe3} [data-local-block]:focus{outline:2px solid #0083c3} .local-changed{outline-color:#e2b900} [data-local-block] img{pointer-events:none} [data-local-block] span.guide-button-label{cursor:text} [data-local-gap-owner]{display:flex;align-items:center;justify-content:center;outline:1px dashed #d5ad28;background:rgba(243,208,42,.08);color:#9a7600;font:600 12px Pretendard,sans-serif;user-select:none}</style></head><body data-theme="${$('dark').checked ? 'dark' : 'light'}"><main id="viewer" class="viewer">${next.html}</main></body></html>`;
      });
      state = next; doc = frame.contentDocument; previewScrollY = 0;
      originals = new Map(); past = []; future = []; selectionRange = null; activeBlock = null;
      boundText = new WeakSet();
      blocks().forEach(e => originals.set(e.dataset.localBlock, e.innerHTML));
      structure = null;
      bindEditable();
      if (window.JJSTAR_EDITOR_BLOCKS) structure = window.JJSTAR_EDITOR_BLOCKS.create({doc,state,
        ui:Object.fromEntries(['outline','structureStatus','selectedBlock','insertType','insertPosition','imageColumns','insertBlock','moveUp','moveDown','duplicateBlock','deleteBlock','editImage','imageDialog','imageFields','imageSuggestions','imageApply','imageCancel','imageSummary'].map(id => [id,$(id)])),
        beforeChange:record,onChange:update,onMove:showAutoSpacing,onSelectionChange:updateViewControls,bindText:bindEditable,isBusy:() => busy || codeView,message:status,request});
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
    } catch (error) { status(error.message, true); busy = false; updateViewControls(); return false; }
    busy = false; update(); return true;
  }
  function readable(markup) {
    const t = document.createElement('template');
    t.innerHTML = markup.replace(/<br\s*\/?\s*>/gi, '\n');
    return t.content.textContent;
  }
  function review() {
    const edits = changes();
    if ((!edits.length && !structure?.changed()) || busy) return;
    $('changes').replaceChildren();
    for (const note of structure?.summary() || []) {
      const row = document.createElement('section'); row.className = 'change structure-change';
      const label = document.createElement('small'); label.textContent = state.path;
      const text = document.createElement('p'); text.textContent = note;
      row.append(label,text); $('changes').append(row);
    }
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
      if (edit.tipBox) {
        const note = document.createElement('p'); note.textContent = '이 문단을 팁박스로 전환해요'; row.append(note);
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
    if (busy) {
      if (['s', 'z', 'y', 'b'].includes(event.key.toLowerCase())) event.preventDefault();
      return;
    }
    if (codeView && ['z', 'y', 'b'].includes(event.key.toLowerCase())) { event.preventDefault(); return; }
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
  $('codeToggle').onclick = toggleCodeView;
  function runSpacing(action) {
    if (busy || codeView) return;
    try { return action(); }
    catch (error) { status(error.message, true); }
  }
  $('spacingBefore').onclick = () => runSpacing(() => structure?.setSpacing?.('before',Number($('spacingSize').value)));
  $('spacingAfter').onclick = () => runSpacing(() => structure?.setSpacing?.('after',Number($('spacingSize').value)));
  $('spacingClear').onclick = () => runSpacing(() => structure?.clearSpacing?.());
  $('autoSpacing').onclick = () => {
    if (busy || codeView) return;
    const elements = lastMovedElements.filter(element => element.isConnected);
    try {
      if (elements.length === lastMovedElements.length && elements.length) runSpacing(() => {
        const changed = structure?.correctSpacing?.(elements);
        if (changed === false) status('보정할 좁은 이미지·텍스트 간격이 없어요');
        return changed;
      });
    } finally { hideAutoSpacing(); }
  };
  $('tipBox').addEventListener('mousedown', event => event.preventDefault());
  $('tipBox').onclick = toggleTipBox;
  $('review').onclick = review; $('cancelSave').onclick = () => $('reviewDialog').close();
  $('reload').onclick = () => load($('pages').value);
  $('pages').onchange = () => load($('pages').value);
  $('dark').onchange = () => {
    if (!doc) return;
    const theme = $('dark').checked ? 'dark' : 'light';
    document.body.dataset.editorTheme = theme;
    doc.documentElement.dataset.theme = theme;
    doc.body.dataset.theme = theme;
  };
  async function saveDocument() {
    if (busy) return;
    busy = true; $('save').disabled = true;
    updateViewControls();
    let saved = false;
    try {
      let y = codeView ? previewScrollY : 0;
      try { if (!codeView) y = frame.contentWindow.scrollY; } catch (_) {}
      const layout = typeof structure !== 'undefined' ? structure?.layout() : undefined;
      const result = await saveChanges({path:state.path, versions:state.versions, changes:changes(), ...(layout ? {layout} : {})});
      saved = true;
      $('reviewDialog').close();
      if (!await load(state.path, true)) {
        status(`원본 파일 저장 완료 · 미리보기를 다시 불러오지 못했어요. 편집 중인 문구는 그대로 두었어요. [다시 불러오기]로 확인해 주세요 · 백업: ${result.backup || '변경 없음'}`, true);
        return;
      }
      previewScrollY = y;
      try { frame.contentWindow.scrollTo(0, y); }
      catch (_) {
        status(`원본 파일 저장 완료 · 이전 스크롤 위치를 복원하지 못했어요. 저장된 내용은 미리보기에서 확인할 수 있어요 · 백업: ${result.backup || '변경 없음'}`, true);
        return;
      }
      status(`저장 완료 · 백업: ${result.backup || '변경 없음'} · 일반 프리뷰는 새로고침해 주세요`);
    } catch (error) {
      status(saved ? `원본 파일 저장 완료 · 미리보기 갱신 중 오류가 났어요: ${error.message}` : error.message, true);
      $('reviewDialog').close();
    }
    finally { busy = false; $('save').disabled = false; $('review').disabled = !(changes().length || typeof structure !== 'undefined' && structure?.changed()); if (typeof structure !== 'undefined') structure?.refresh(); updateViewControls(); }
  }
  $('save').onclick = saveDocument;
  document.addEventListener('keydown', shortcut);
  window.addEventListener('beforeunload', event => { if (pendingCount()) { event.preventDefault(); event.returnValue = ''; } });
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
