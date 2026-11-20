(() => {
  const TYPES = {section:'섹션', heading:'소제목', paragraph:'문단', tip:'팁박스', step:'STEP', divider:'구분선', image:'이미지'};
  const BLOCK_SELECTOR = 'section,figure,.tip-box,.guide-image-row,.guide-section-heading,p,h2,h3,h4,h5,h6,hr,.guide-steps .flex.gap-4';
  const TEXT_SELECTOR = 'p,h2,h3,h4,h5,h6,figcaption,strong,span[class]';
  const NAME = /^[^<>:"/\\|?*\u0000-\u001f]+\.(?:webp|png|jpe?g|gif|svg|avif)$/i;
  const safeName = value => {
    const name = String(value || '').trim().replace(/^\/?assets\/images\//, '');
    if (!NAME.test(name) || name === '.' || name === '..') throw new Error('이미지 파일명과 확장자를 입력해 주세요 예: jjstar_d_menu-ex-01.webp');
    return name;
  };
  const cleanTree = root => {
    for (const node of root.querySelectorAll('*')) {
      if (node.hasAttribute('data-local-gap-owner')) node.textContent = '';
      for (const attr of [...node.attributes]) {
        if (attr.name.startsWith('data-local-') || ['contenteditable','spellcheck'].includes(attr.name)) node.removeAttribute(attr.name);
      }
      node.classList.remove('local-changed', 'local-structure-selected', 'local-image-missing');
      if (!node.getAttribute('class')) node.removeAttribute('class');
    }
    const comments = [];
    const walk = node => { for (const child of node.childNodes) { if (child.nodeType === 8 && /^local-region:/.test(child.data)) comments.push(child); else walk(child); } };
    walk(root); comments.forEach(node => node.remove());
    return root;
  };
  function create(options) {
    const {doc, state, ui, beforeChange, onChange, bindText, isBusy, message, request} = options;
    const markerParent = node => {
      for (const child of node.childNodes) {
        if (child.nodeType === 8 && /^local-region:[^:]+:start$/.test(child.data)) return child.parentNode;
        const found = markerParent(child); if (found) return found;
      }
      return null;
    };
    const article = markerParent(doc) || doc.querySelector('article');
    let entries = (state.regions || []).map(region => ({...region, dirty:false}));
    let selected = null, selectedId = null, serial = 0, textSerial = 0, imageTarget = null, imageCount = 1;
    let imageNames = [], imagesLoaded = false;
    const watchedImages = new WeakSet();
    const enabled = !!(state.structure?.allowed && article);
    const comment = (id, side) => `local-region:${id}:${side}`;
    const boundaries = id => {
      let start, end;
      if (!article) return {};
      for (const node of article.childNodes) {
        if (node.nodeType !== 8) continue;
        if (node.data === comment(id,'start')) start = node;
        if (node.data === comment(id,'end')) end = node;
      }
      return {start,end};
    };
    const nodes = id => {
      const {start,end} = boundaries(id), result = [];
      if (!start || !end) return result;
      for (let node = start.nextSibling; node && node !== end; node = node.nextSibling) result.push(node);
      return result;
    };
    const rootElement = id => nodes(id).find(node => node.nodeType === 1 && !node.hasAttribute('data-local-gap-owner'));
    const entryFor = element => entries.find(entry => nodes(entry.id).some(node => node === element || (node.nodeType === 1 && node.contains(element))));
    const byId = id => entries.find(entry => entry.id === id);
    const label = element => {
      if (!element) return '';
      if (element.matches('figure')) return '이미지 · ' + (element.querySelector('figcaption')?.textContent || element.querySelector('img')?.getAttribute('src')?.split('/').pop() || '이미지');
      if (element.matches('.guide-image-row')) return `가로 이미지 ${element.querySelectorAll('img').length}장`;
      if (element.matches('hr')) return '구분선';
      if (element.matches('.guide-spacer-v')) return '여백';
      const title = element.matches('.guide-section-heading,section,.tip-box') ? element.querySelector('h2,h3,h4,p') : element;
      return (element.matches('section') ? '섹션 · ' : element.matches('.tip-box') ? '팁 · ' : '') + (title?.textContent || element.textContent || element.tagName).trim().replace(/\s+/g,' ').slice(0,48);
    };
    const mark = entry => { if (entry && !entry.protected) entry.dirty = true; };
    const ensureEditable = element => {
      if (!enabled) throw new Error(state.structure?.reason || '이 문서는 문구만 편집할 수 있어요');
      const entry = entryFor(element);
      if (!entry || entry.protected) throw new Error('상단 제목·소개·자동 메뉴 영역은 문구 또는 원래 설정에서 관리해요');
      return entry;
    };
    const hasAnchors = element => element.hasAttribute('id') || !!element.querySelector('[id]');
    function select(element, scroll = false) {
      if (selected) selected.classList.remove('local-structure-selected');
      selected = element?.isConnected ? element : null;
      selectedId = selected ? entryFor(selected)?.id : null;
      if (selected) {
        selected.classList.add('local-structure-selected');
        if (scroll) selected.scrollIntoView({block:'center',behavior:'smooth'});
      }
      refresh();
    }
    function snapshot() {
      return enabled ? {html:article.innerHTML, entries:entries.map(e => ({...e})), selectedId,
        selectedIndex:selected && selectedId ? [rootElement(selectedId), ...rootElement(selectedId).querySelectorAll('*')].indexOf(selected) : -1,
        serial,textSerial} : null;
    }
    function restore(saved) {
      if (!enabled || !saved) return;
      article.innerHTML = saved.html;
      entries = saved.entries.map(e => ({...e})); serial = saved.serial; textSerial = saved.textSerial;
      selectedId = saved.selectedId;
      const root = rootElement(selectedId);
      selected = root ? [root,...root.querySelectorAll('*')][saved.selectedIndex] || root : null;
      bindText(); watchImages(); refresh();
    }
    function serialize(id) {
      const shell = doc.createElement('div');
      nodes(id).forEach(node => shell.append(node.cloneNode(true)));
      cleanTree(shell);
      return shell.innerHTML;
    }
    function layout() {
      if (!enabled || !changed()) return undefined;
      return entries.map(entry => entry.dirty || entry.id.startsWith('new-') ? {id:entry.id,html:serialize(entry.id)} : {id:entry.id});
    }
    function changed() {
      return enabled && (entries.some(entry => entry.dirty) || entries.map(entry => entry.id).join('|') !== (state.regions || []).map(entry => entry.id).join('|'));
    }
    function summary() {
      if (!changed()) return [];
      const original = new Map((state.regions || []).map(entry => [entry.id,entry]));
      const rows = [];
      entries.forEach((entry,index) => {
        if (!original.has(entry.id)) rows.push('추가 · ' + label(rootElement(entry.id)));
        else if (entry.dirty) rows.push('구성 변경 · ' + label(rootElement(entry.id)));
        else if ((state.regions || []).findIndex(item => item.id === entry.id) !== index) rows.push('순서 변경 · ' + label(rootElement(entry.id)));
      });
      for (const entry of state.regions || []) if (!byId(entry.id)) rows.push('삭제 · ' + entry.label);
      return rows;
    }
    function refresh() {
      if (!ui.outline) return;
      ui.outline.replaceChildren();
      if (ui.structureStatus) ui.structureStatus.textContent = enabled ? '영역을 선택한 뒤 추가·이동·삭제할 수 있어요' : state.structure?.reason || '이 문서는 문구 편집만 지원해요';
      if (ui.selectedBlock) ui.selectedBlock.textContent = selected ? label(selected) : '선택한 영역 없음 · 맨 아래에 추가해요';
      for (const entry of entries) {
        const root = rootElement(entry.id);
        if (!root) continue;
        const candidates = [root];
        if (!entry.protected) root.querySelectorAll(BLOCK_SELECTOR).forEach(element => {
          if (element.closest('nav,.guide-tab-map') || element.closest('[data-local-block]') !== element && element.closest('[data-local-block]')) return;
          if (element.matches('p,h2,h3,h4,h5,h6') && element.parentElement.matches('.guide-section-heading')) return;
          candidates.push(element);
        });
        candidates.forEach((element,index) => {
          const button = ui.outline.ownerDocument.createElement('button');
          button.type = 'button'; button.className = 'outline-item';
          button.classList.toggle('selected', element === selected);
          button.classList.toggle('protected', !!entry.protected);
          let depth = 0;
          for (let p = element.parentElement; p && p !== root && p !== article; p = p.parentElement) if (p.matches('section,.tip-box,.guide-image-row')) depth++;
          button.style.setProperty('--outline-depth', String(index ? Math.min(3,depth+1) : 0));
          button.textContent = (entry.protected ? '고정 · ' : '') + label(element);
          button.title = button.textContent;
          button.onclick = () => select(element,true);
          ui.outline.append(button);
        });
      }
      const entry = selected && entryFor(selected), locked = !enabled || isBusy() || !!entry?.protected;
      for (const name of ['insertBlock','moveUp','moveDown','duplicateBlock','deleteBlock','editImage']) if (ui[name]) ui[name].disabled = !enabled || isBusy() || (name !== 'insertBlock' && (!selected || locked));
      if (ui.deleteBlock && selected && hasAnchors(selected)) ui.deleteBlock.disabled = true;
      if (ui.duplicateBlock && selected && hasAnchors(selected)) ui.duplicateBlock.disabled = true;
      if (ui.editImage) ui.editImage.disabled = locked || !selected?.querySelector('img') && !selected?.matches('img');
    }
    function addText(element) {
      const texts = element.matches(TEXT_SELECTOR) ? [element] : [...element.querySelectorAll(TEXT_SELECTOR)];
      for (const node of texts) {
        if (node.closest('[data-local-block]') && !node.hasAttribute('data-local-block')) continue;
        if (/^(?:STEP\s*\d+|\d+)$/.test(node.textContent.trim())) continue;
        if (!node.hasAttribute('data-local-block')) node.dataset.localBlock = 'newtext-' + (++textSerial);
      }
      bindText();
    }
    function template(type) {
      const holder = doc.createElement('div');
      const heading = '<div class="flex items-center gap-2 mb-4 mt-5 guide-section-heading"><img src="assets/images/jjstar-head-title.svg" alt="" width="24" height="24"><h2 style="margin:0">새 섹션 제목</h2></div>';
      const templates = {
        section:`<section>${heading}<p class="text-gray-700 leading-relaxed">여기에 설명을 입력하세요</p></section>`,
        heading:heading.replace('새 섹션 제목','소제목'),
        paragraph:'<p class="text-gray-700 leading-relaxed">여기에 설명을 입력하세요</p>',
        tip:'<div class="tip-box tip-box--with-character guide-extra-tip"><div class="flex items-start gap-3"><div class="tip-box-content"><p>알아두면 좋은 내용을 입력하세요</p></div></div></div>',
        step:'<section class="guide-steps bg-gray-50 p-8 rounded-lg"><h3 class="text-xl mb-6 font-bold">사용 방법</h3><div class="space-y-4 mb-8"><div class="flex gap-4 items-start"><div class="step-badge">STEP 1</div><div class="text-gray-700 pt-1 flex-1 min-w-0"><strong>단계 제목</strong><p>순서에 맞게 사용 방법을 입력하세요</p></div></div></div></section>',
        divider:'<hr style="border:0;border-top:1px solid #e5e7eb;margin:2rem 0">'
      };
      holder.innerHTML = templates[type] || templates.paragraph;
      const element = holder.firstElementChild;
      if (type === 'step') element.querySelector('strong').dataset.localBlock = 'newtext-' + (++textSerial);
      return element;
    }
    function insert(element, type) {
      const position = ui.insertPosition?.value || 'after';
      const entry = selected && entryFor(selected);
      if (selected && entry && !entry.protected) {
        if (position === 'inside') {
          if (!selected.matches('section,div') || selected.matches('.guide-section-heading,.guide-image-row') || selected.closest('[data-local-block]')) throw new Error('안쪽에 추가하려면 목록에서 섹션 또는 팁박스 영역을 선택해 주세요');
          beforeChange();
          const container = selected.matches('.tip-box') ? selected.querySelector('.tip-box-content') || selected : selected;
          container.append(element); mark(entry);
        } else {
          beforeChange();
          if (selected === rootElement(entry.id)) insertRegion(element, position === 'before' ? entry.id : null, position === 'after' ? entry.id : null);
          else { position === 'before' ? selected.before(element) : selected.after(element); mark(entry); }
        }
      } else {
        beforeChange();
        const last = entries.at(-1);
        if (last?.protected && entry) throw new Error('고정 영역 안에는 추가할 수 없어요 본문 섹션을 선택해 주세요');
        insertRegion(element,null,last?.id);
      }
      addText(element); watchImages(); select(element); onChange();
    }
    function insertRegion(element, beforeId, afterId) {
      const id = 'new-' + (++serial);
      const start = doc.createComment(comment(id,'start')), end = doc.createComment(comment(id,'end'));
      const anchor = beforeId ? boundaries(beforeId).start : afterId ? boundaries(afterId).end.nextSibling : null;
      const fragment = doc.createDocumentFragment(); fragment.append(start,element,end);
      article.insertBefore(fragment,anchor);
      const index = beforeId ? entries.findIndex(e => e.id === beforeId) : afterId ? entries.findIndex(e => e.id === afterId)+1 : entries.length;
      entries.splice(index,0,{id,tag:element.tagName.toLowerCase(),label:TYPES[ui.insertType?.value] || '새 영역',protected:false,anchorIds:[],dirty:true});
    }
    function action(run) {
      if (isBusy()) return;
      try { run(); } catch (error) { message(error.message,true); }
    }
    function move(direction) {
      const entry = ensureEditable(selected);
      if (selected === rootElement(entry.id)) {
        const index = entries.indexOf(entry), other = entries[index + direction];
        if (!other || other.protected) throw new Error('이 방향으로는 이동할 수 없어요 고정된 상단 영역은 그대로 유지해요');
        beforeChange();
        const {start,end} = boundaries(entry.id), fragment = doc.createDocumentFragment();
        for (let node = start; node;) { const next = node.nextSibling; fragment.append(node); if (node === end) break; node = next; }
        const anchor = direction < 0 ? boundaries(other.id).start : boundaries(other.id).end.nextSibling;
        article.insertBefore(fragment,anchor);
        entries.splice(index,1); entries.splice(index+direction,0,entry);
      } else {
        const other = direction < 0 ? selected.previousElementSibling : selected.nextElementSibling;
        if (!other || other.hasAttribute('data-local-gap-owner')) throw new Error('같은 영역 안에서 이동할 수 있는 항목이 없어요');
        beforeChange(); direction < 0 ? other.before(selected) : other.after(selected); mark(entry);
      }
      refresh(); onChange();
    }
    function remove() {
      const entry = ensureEditable(selected);
      if (hasAnchors(selected)) throw new Error('다른 위치에서 연결하는 주소가 있는 영역은 삭제할 수 없어요');
      if (!ui.outline.ownerDocument.defaultView.confirm('선택한 영역을 삭제할까요? 저장 전에는 되돌릴 수 있어요')) return;
      beforeChange();
      if (selected === rootElement(entry.id)) {
        const {start,end} = boundaries(entry.id); nodes(entry.id).forEach(node => node.remove()); start.remove(); end.remove(); entries = entries.filter(e => e !== entry);
      } else { selected.remove(); mark(entry); }
      select(null); onChange();
    }
    function duplicate() {
      const entry = ensureEditable(selected);
      if (hasAnchors(selected)) throw new Error('연결 주소가 있는 영역은 중복할 수 없어요');
      const shell = doc.createElement('div'); shell.append(selected.cloneNode(true)); cleanTree(shell);
      const element = shell.firstElementChild;
      beforeChange();
      if (selected === rootElement(entry.id)) insertRegion(element,null,entry.id);
      else { selected.after(element); mark(entry); }
      addText(element); watchImages(); select(element); onChange();
    }
    function imageFields(values) {
      ui.imageFields.replaceChildren();
      values.forEach((value,index) => {
        const field = ui.imageFields.ownerDocument.createElement('fieldset');
        const legend = ui.imageFields.ownerDocument.createElement('legend'); legend.textContent = `이미지 ${index+1}`; field.append(legend);
        for (const [key,title] of [['name','이미지 파일명'],['alt','이미지 설명'],['caption','하단 설명']]) {
          const labelNode = ui.imageFields.ownerDocument.createElement('label'); labelNode.textContent = title;
          const input = ui.imageFields.ownerDocument.createElement('input'); input.type = 'text'; input.dataset.imageField = key; input.value = value[key] || '';
          if (key === 'name') { input.setAttribute('list','imageSuggestions'); input.placeholder = 'jjstar_d_menu-ex-01.webp'; input.required = true; }
          labelNode.append(input); field.append(labelNode);
        }
        ui.imageFields.append(field);
      });
    }
    const imageElements = target => (target?.matches('img') ? [target] : [...(target?.querySelectorAll('img') || [])])
      .filter(img => !img.closest('.guide-section-heading') && !img.getAttribute('src')?.includes('icon-'));
    async function openImages(target = null) {
      if (isBusy()) return;
      if (!enabled) { message('이 문서에서는 이미지 배치를 편집할 수 없어요',true); return; }
      if (target) ensureEditable(target);
      imageTarget = target;
      const images = imageElements(target);
      if (target && !images.length) throw new Error('변경할 이미지를 목록 또는 화면에서 선택해 주세요');
      imageCount = target ? images.length : Number(ui.imageColumns?.value || 1);
      const code = state.path.split('/').pop().replace(/^L\d+/,'').replace(/\.html$/,'').toLowerCase();
      imageFields(Array.from({length:imageCount},(_,index) => {
        const img = images[index], src = img?.getAttribute('src') || '';
        return {name:src.split('/').pop()?.split('?')[0] || `jjstar_d_${code}-ex-${String(index+1).padStart(2,'0')}.webp`,alt:img?.alt || '',caption:img?.closest('figure')?.querySelector('figcaption')?.textContent || ''};
      }));
      if (ui.imageSummary) ui.imageSummary.textContent = target ? '파일명과 설명을 바꾸면 선택한 이미지에 반영돼요' : `${imageCount}장 배치 · 파일을 assets/images 폴더에 넣으면 같은 이름으로 표시돼요`;
      ui.imageDialog.showModal();
      if (!imagesLoaded) {
        try {
          const result = await request('/__editor/images');
          imageNames = (result.images || []).map(item => typeof item === 'string' ? item : item.name);
          imagesLoaded = true;
          if (ui.imageSuggestions) ui.imageSuggestions.replaceChildren(...imageNames.map(name => {
            const option = ui.imageSuggestions.ownerDocument.createElement('option'); option.value = name; return option;
          }));
        } catch (_) { if (ui.imageSummary) ui.imageSummary.textContent += ' · 파일 목록을 불러오지 못했지만 직접 입력할 수 있어요'; }
      }
    }
    function applyImages() {
      const values = [...ui.imageFields.querySelectorAll('fieldset')].map(field => Object.fromEntries([...field.querySelectorAll('[data-image-field]')].map(input => [input.dataset.imageField,input.value.trim()])));
      values.forEach(value => value.name = safeName(value.name));
      if (imageTarget) {
        const entry = ensureEditable(imageTarget);
        const images = imageElements(imageTarget);
        beforeChange();
        images.forEach((img,index) => {
          const value = values[index];
          const currentName = img.getAttribute('src')?.split('/').pop()?.split('?')[0];
          if (value.name !== currentName) { img.src = 'assets/images/' + value.name; img.removeAttribute('width'); img.removeAttribute('height'); img.removeAttribute('srcset'); }
          img.alt = value.alt;
          const figure = img.closest('figure');
          if (figure) {
            let caption = figure.querySelector('figcaption');
            if (value.caption && !caption) { caption = doc.createElement('figcaption'); figure.append(caption); }
            if (caption) caption.textContent = value.caption;
          }
        });
        mark(entry); addText(imageTarget); watchImages(); onChange();
      } else {
        const figures = values.map(value => {
          const figure = doc.createElement('figure'); figure.className = 'guide-image-slot';
          const img = doc.createElement('img'); img.src = 'assets/images/' + value.name; img.alt = value.alt; img.loading = 'lazy'; figure.append(img);
          if (value.caption) { const caption = doc.createElement('figcaption'); caption.textContent = value.caption; figure.append(caption); }
          return figure;
        });
        let element = figures[0];
        if (figures.length > 1) { element = doc.createElement('div'); element.className = 'guide-image-row'; element.style.gridTemplateColumns = `repeat(auto-fit,minmax(min(100%,${figures.length === 3 ? 180 : 250}px),1fr))`; element.append(...figures); }
        insert(element,'image');
      }
      ui.imageDialog.close();
    }
    function watchImages() {
      if (!article) return;
      article.querySelectorAll('figure img').forEach(img => {
        if (watchedImages.has(img)) return;
        watchedImages.add(img);
        const failed = () => { img.classList.add('local-image-missing'); };
        img.addEventListener('error',failed); img.addEventListener('load',() => img.classList.remove('local-image-missing'));
        if (img.complete && !img.naturalWidth) failed();
      });
    }
    const style = doc.createElement('style'); style.dataset.localStructureStyle = 'true';
    style.textContent = '.local-structure-selected{outline:2px solid #0083c3!important;outline-offset:7px}.local-image-missing{display:block;min-height:120px;background:#f1f5f9;border:2px dashed #94a3b8!important;object-fit:contain}.guide-image-row .local-image-missing{min-height:160px}[data-local-block]:is(p,h2,h3,h4,h5,h6,figcaption){min-height:1em}[data-local-block]:empty::before{content:"내용을 입력하세요";color:#94a3b8;pointer-events:none}';
    doc.head.append(style);
    article?.addEventListener('click', event => {
      const target = event.target.closest(BLOCK_SELECTOR);
      if (!target || !article.contains(target)) return;
      const entry = entryFor(target);
      if (entry) select(target);
    });
    article?.addEventListener('dblclick', event => {
      const image = event.target.closest('img');
      if (!image || !article.contains(image) || image.closest('.guide-section-heading')) return;
      event.preventDefault();
      action(() => openImages(image.closest('figure') || image).catch(error => message(error.message,true)));
    });
    if (ui.insertBlock) ui.insertBlock.onclick = () => action(() => ui.insertType.value === 'image' ? openImages().catch(error => message(error.message,true)) : insert(template(ui.insertType.value),ui.insertType.value));
    if (ui.moveUp) ui.moveUp.onclick = () => action(() => move(-1));
    if (ui.moveDown) ui.moveDown.onclick = () => action(() => move(1));
    if (ui.deleteBlock) ui.deleteBlock.onclick = () => action(remove);
    if (ui.duplicateBlock) ui.duplicateBlock.onclick = () => action(duplicate);
    if (ui.editImage) ui.editImage.onclick = () => action(() => {
      let target = selected;
      if (target?.matches('p,h2,h3,h4')) target = target.closest('figure') || target;
      openImages(target).catch(error => message(error.message,true));
    });
    if (ui.imageApply) ui.imageApply.onclick = event => { event.preventDefault(); action(applyImages); };
    if (ui.imageCancel) ui.imageCancel.onclick = () => ui.imageDialog.close();
    watchImages(); refresh();
    return {snapshot,restore,layout,changed,summary,refresh,
      ownsText:id => id.startsWith('newtext-'),
      markText(element) { const entry = entryFor(element); if (entry?.dirty || entry?.id.startsWith('new-')) mark(entry); },
      textAllowed(element) { return !entryFor(element)?.protected; }};
  }
  window.JJSTAR_EDITOR_BLOCKS = {create, safeName, cleanTree};
})();
