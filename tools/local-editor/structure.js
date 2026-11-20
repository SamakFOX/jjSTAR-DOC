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
    const {doc, state, ui, beforeChange, onChange, bindText, isBusy, message, request, onSelectionChange, onMove} = options;
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
    let selection = [], selectionAnchor = null, pointerGesture = null;
    let imageNames = [], imagesLoaded = false;
    const watchedImages = new WeakSet();
    let folded = new WeakMap(), elementKeys = new WeakMap(), keySerial = 0, drag = null, bodyDrag = null;
    const rowCache = new Map();
    const enabled = !!(state.structure?.allowed && article);
    const comment = (id, side) => `local-region:${id}:${side}`;
    let regionIndex = null;
    const invalidateIndex = () => { regionIndex = null; };
    function indexRegions() {
      if (regionIndex) return regionIndex;
      const byId = new Map(), owners = new WeakMap();
      let segment = 0;
      entries.forEach((entry,index) => {
        byId.set(entry.id,{entry,index,segment,start:null,end:null,nodes:[],root:null,transient:undefined});
        if (entry.protected) segment++;
      });
      let current = null;
      for (const node of article?.childNodes || []) {
        const marker = node.nodeType === 8 && /^local-region:([^:]+):(start|end)$/.exec(node.data);
        if (marker && byId.has(marker[1])) {
          const record = byId.get(marker[1]);
          if (marker[2] === 'start') { record.start = node; current = record; }
          else { record.end = node; if (current === record) current = null; }
        } else if (current) {
          current.nodes.push(node);
          if (node.nodeType === 1) {
            owners.set(node,current.entry);
            if (!current.root && !node.hasAttribute('data-local-gap-owner')) current.root = node;
          }
        }
      }
      return regionIndex = {byId,owners};
    }
    const regionFor = id => indexRegions().byId.get(id);
    const boundaries = id => regionFor(id) || {};
    const nodes = id => { const record = regionFor(id); return record?.start && record.end ? record.nodes : []; };
    const rootElement = id => { const record = regionFor(id); return record?.start && record.end ? record.root : null; };
    const entryFor = element => {
      const index = indexRegions();
      for (let node = element; node && node !== article; node = node.parentElement) {
        const entry = index.owners.get(node);
        if (entry) return entry;
      }
      return undefined;
    };
    const byId = id => regionFor(id)?.entry;
    const legacyImage = element => element?.matches('div') && element.children.length === 2
      && element.children[0].matches('img') && element.children[1].matches('p');
    const imageGroup = element => !!element && (element.matches('figure') || legacyImage(element));
    const captionFor = image => {
      const group = image?.closest('figure') || (legacyImage(image?.parentElement) ? image.parentElement : null);
      return group?.querySelector('figcaption,p') || null;
    };
    const imagePart = element => imageGroup(element?.parentElement);
    const keyFor = element => {
      if (!elementKeys.has(element)) elementKeys.set(element,'node-' + (++keySerial));
      return elementKeys.get(element);
    };
    const label = element => {
      if (!element) return '';
      if (imageGroup(element)) return '이미지 묶음 · ' + (element.querySelector('figcaption,p')?.textContent || element.querySelector('img')?.getAttribute('src')?.split('/').pop() || '이미지').trim().replace(/\s+/g,' ').slice(0,48);
      if (element.matches('img')) return '이미지 · ' + (element.getAttribute('src')?.split('/').pop() || element.alt || '이미지');
      if (element.matches('figcaption') || imagePart(element)) return '캡션 · ' + element.textContent.trim().replace(/\s+/g,' ').slice(0,48);
      if (element.matches('.guide-image-row')) return `가로 이미지 ${element.querySelectorAll('img').length}장`;
      if (element.matches('hr')) return '구분선';
      if (element.matches('.guide-spacer-v')) return '여백';
      const title = element.matches('.guide-section-heading,section,.tip-box') ? element.querySelector('h2,h3,h4,p') : element;
      return (element.matches('section') ? '섹션 · ' : element.matches('.tip-box') ? '팁 · ' : element.matches('div') ? '묶음 · ' : '') + (title?.textContent || element.textContent || element.tagName).trim().replace(/\s+/g,' ').slice(0,48);
    };
    const mark = entry => { if (entry && !entry.protected) entry.dirty = true; invalidateIndex(); };
    const ensureEditable = element => {
      if (!enabled) throw new Error(state.structure?.reason || '이 문서는 문구만 편집할 수 있어요');
      const entry = entryFor(element);
      if (!entry || entry.protected) throw new Error('상단 제목·소개·자동 메뉴 영역은 문구 또는 원래 설정에서 관리해요');
      return entry;
    };
    const hasAnchors = element => element.hasAttribute('id') || !!element.querySelector('[id]');
    function pathLabel(element, regionRoot) {
      if (imageGroup(element) || element.matches('.guide-image-row')) return '이미지 묶음';
      if (element.matches('img')) return '이미지';
      if (element.matches('figcaption') || imagePart(element)) return '캡션';
      if (element.matches('.tip-box')) return '팁박스';
      if (element.matches('.guide-steps .flex.gap-4') || [...element.children].some(child => child.matches('.step-badge'))) return 'STEP';
      if (element.matches('section')) return '섹션';
      if (element.matches('.guide-section-heading,h1,h2,h3,h4,h5,h6')) return '제목';
      if (element.matches('p')) return '문단';
      if (element.matches('hr')) return '구분선';
      if (element === regionRoot && element.matches('div')) return '전체 묶음';
      if (element.matches('.guide-flow-row,.space-y-4,.space-y-6') || element.matches('div.flex') && element.children.length > 1) return '행 묶음';
      return element === regionRoot ? '전체 묶음' : '내용';
    }
    function getSelectionPath() {
      if (!selected?.isConnected) return [];
      const entry = entryFor(selected), regionRoot = entry && rootElement(entry.id);
      if (!regionRoot) return [];
      const path = [];
      for (let element = selected; element && element !== article; element = element.parentElement) {
        const group = element.matches('section,figure,.guide-section-heading,.tip-box,.guide-image-row')
          || element.matches('div:not([data-local-block])') && outlineChildren(element).length > 0;
        if (element === selected || element === regionRoot || group) path.unshift({element,label:pathLabel(element,regionRoot)});
        if (element === regionRoot) break;
      }
      return path;
    }
    function selectionChanged() { onSelectionChange?.(selected,getSelectionPath()); }
    const ordered = elements => [...new Set(elements)].filter(element => element?.isConnected && article?.contains(element))
      .sort((a,b) => a === b ? 0 : a.compareDocumentPosition(b) & 4 ? -1 : 1);
    const getSelectedElements = () => ordered(selection);
    const atomic = element => baseMoveElement(element);
    function selectionError(elements) {
      if (!elements.length) return '';
      const first = elements[0], entry = entryFor(first), top = entry && first === rootElement(entry.id);
      for (const element of elements) {
        const other = entryFor(element);
        if (!other || other.protected) return '고정 영역은 여러 항목과 함께 선택할 수 없어요';
        if (element !== first && (first.contains(element) || element.contains(first))) return '상위 묶음과 그 안의 항목을 함께 선택할 수 없어요';
        if (element.parentElement !== first.parentElement) return '같은 부모 안의 항목끼리 선택해 주세요';
        if (top) {
          if (element !== rootElement(other.id) || regionFor(entry.id).segment !== regionFor(other.id).segment) return '고정 영역을 넘어 여러 항목을 선택할 수 없어요';
        } else if (entry !== other || element === rootElement(other.id)) return '같은 영역 안의 형제 항목끼리 선택해 주세요';
      }
      return '';
    }
    function selectParent() {
      const path = getSelectionPath();
      if (path.length < 2) return false;
      select(path[path.length-2].element);
      return true;
    }
    function select(element, scroll = false, deferRefresh = false) {
      selectionAnchor = element?.isConnected ? element : null;
      setSelection(element ? [element] : [],element,scroll,deferRefresh);
    }
    function setSelection(elements, primary, scroll = false, deferRefresh = false) {
      selection.forEach(element => element.classList.remove('local-structure-selected'));
      if (selected) selected.classList.remove('local-structure-selected');
      selection = ordered(elements);
      selected = selection.includes(primary) ? primary : selection.at(-1) || null;
      selectedId = selected ? entryFor(selected)?.id : null;
      selection.forEach(element => {
        element.classList.add('local-structure-selected');
        for (let parent = element.parentElement; parent && parent !== article; parent = parent.parentElement) folded.set(parent,false);
      });
      if (selected) {
        if (scroll) selected.scrollIntoView({block:'center',behavior:'smooth'});
      }
      if (!deferRefresh) refresh();
      selectionChanged();
    }
    function choose(element,event = {},toggle = false,scroll = false) {
      if (!event.shiftKey && !event.ctrlKey && !event.metaKey && !toggle) { select(element,scroll); return true; }
      if (!enabled || isBusy()) return false;
      const unit = atomic(element), existing = ordered(selection.map(atomic));
      if (!unit) { message('고정 영역은 여러 항목과 함께 선택할 수 없어요',true); refresh(); return false; }
      let next;
      if (event.shiftKey && (selectionAnchor || selected)) {
        const anchor = atomic(selectionAnchor || selected);
        const error = selectionError([anchor,unit].filter(Boolean));
        if (!anchor || error) { message(error || '같은 부모 안의 항목끼리 범위를 선택해 주세요',true); refresh(); return false; }
        const entry = entryFor(anchor), siblings = anchor === rootElement(entry.id) ? entries.map(item => rootElement(item.id)) : [...anchor.parentElement.children].filter(item => !item.matches('[data-local-gap-owner]'));
        const from = siblings.indexOf(anchor), to = siblings.indexOf(unit);
        next = siblings.slice(Math.min(from,to),Math.max(from,to)+1);
      } else next = existing.includes(unit) ? existing.filter(item => item !== unit) : [...existing,unit];
      const error = selectionError(next);
      if (error) { message(error,true); refresh(); return false; }
      if (!event.shiftKey) selectionAnchor = unit;
      setSelection(next,unit,scroll);
      return true;
    }
    function snapshot() {
      const descendants = new Map();
      function descendantsFor(id) {
        if (!descendants.has(id)) { const root = rootElement(id); descendants.set(id,root ? [root,...root.querySelectorAll('*')] : []); }
        return descendants.get(id);
      }
      function location(element) {
        const entry = element && entryFor(element);
        return entry ? {id:entry.id,index:descendantsFor(entry.id).indexOf(element)} : null;
      }
      return enabled ? {html:article.innerHTML, entries:entries.map(e => ({...e})), selectedId,
        selectedIndex:selected && selectedId ? descendantsFor(selectedId).indexOf(selected) : -1,
        selectedElements:getSelectedElements().map(location),selectionAnchor:location(selectionAnchor),
        outlineState:entries.flatMap(entry => {
          return descendantsFor(entry.id).flatMap((element,index) => folded.has(element) ? [{id:entry.id,index,folded:folded.get(element)}] : []);
        }),serial,textSerial} : null;
    }
    function restore(saved) {
      if (!enabled || !saved) return;
      article.innerHTML = saved.html;
      entries = saved.entries.map(e => ({...e})); serial = saved.serial; textSerial = saved.textSerial;
      invalidateIndex();
      selectedId = saved.selectedId;
      const root = rootElement(selectedId);
      selected = root ? [root,...root.querySelectorAll('*')][saved.selectedIndex] || root : null;
      folded = new WeakMap(); elementKeys = new WeakMap(); rowCache.clear(); drag = null;
      const descendants = new Map();
      const resolve = location => {
        if (!location) return null;
        if (!descendants.has(location.id)) { const entryRoot = rootElement(location.id); descendants.set(location.id,entryRoot ? [entryRoot,...entryRoot.querySelectorAll('*')] : []); }
        return descendants.get(location.id)[location.index] || null;
      };
      selection = saved.selectedElements ? ordered(saved.selectedElements.map(resolve)) : selected ? [selected] : [];
      if (!selection.includes(selected)) selected = selection.at(-1) || null;
      selectedId = selected ? entryFor(selected)?.id : null;
      selectionAnchor = resolve(saved.selectionAnchor) || selected;
      article.querySelectorAll('.local-structure-selected').forEach(element => element.classList.remove('local-structure-selected'));
      selection.forEach(element => element.classList.add('local-structure-selected'));
      for (const item of saved.outlineState || []) {
        if (!descendants.has(item.id)) {
          const entryRoot = rootElement(item.id);
          descendants.set(item.id,entryRoot ? [entryRoot,...entryRoot.querySelectorAll('*')] : []);
        }
        const element = descendants.get(item.id)[item.index];
        if (element) folded.set(element,item.folded);
      }
      bindText(); watchImages(); refresh();
      selectionChanged();
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
    function outlineChildren(element) {
      if (element.matches('[data-local-block],.guide-section-heading,table,ul,ol') || !element.children.length) return [];
      if (imageGroup(element)) return [...element.children].filter(child => child.matches('img,figcaption,p'));
      return [...element.children].filter(child => {
        if (child.matches('nav,script,style,.guide-tab-map,[data-local-gap-owner]')) return false;
        if (child.matches(BLOCK_SELECTOR) || child.matches('[data-local-block]')) return true;
        return child.matches('div') && !!child.querySelector(BLOCK_SELECTOR + ',[data-local-block]');
      });
    }
    function transientLayout(entry) {
      const record = regionFor(entry.id);
      if (record.transient === undefined) record.transient = record.nodes.some(node => node.nodeType === 1 && (node.matches('[data-local-gap-owner],[data-local-tip-owner]') || node.querySelector('[data-local-gap-owner],[data-local-tip-owner]')));
      return record.transient;
    }
    function movementError(source, target) {
      const moving = movingElements(source);
      if (moving.length < 2) return singleMovementError(moving[0],target);
      const error = selectionError(moving);
      if (error) return error;
      if (moving.includes(target)) return '';
      for (const element of moving) {
        const reason = singleMovementError(element,target);
        if (reason) return reason;
      }
      return '';
    }
    function movingElements(source) {
      const elements = getSelectedElements();
      if (elements.length < 2 || !elements.includes(source) && source !== elements[0].parentElement) return [source];
      const parent = promotedParent(elements);
      if (parent && (source === parent || elements.includes(source))) return [parent];
      return elements.length > 1 && elements.includes(source) ? elements : [source];
    }
    function promotedParent(elements) {
      if (elements.length < 2) return null;
      const parent = elements[0].parentElement, entry = parent && entryFor(parent);
      if (!parent || parent === article || !parent.matches('div,section') || parent.matches('[data-local-block],.guide-section-heading,.guide-tab-map')
          || !entry || entry.protected || transientLayout(entry) || !outlineChildren(parent).length) return null;
      const children = [...parent.children];
      if (children.length !== elements.length || children.some(child => !elements.includes(child))
          || [...parent.childNodes].some(node => node.nodeType === 3 && node.textContent.trim())) return null;
      if (selectionError(elements)) return null;
      const candidates = parent === rootElement(entry.id) ? entries.map(item => rootElement(item.id)) : [...parent.parentElement.children];
      return candidates.some(target => target && target !== parent && !singleMovementError(parent,target)) ? parent : null;
    }
    function getMoveElements() {
      const source = bodyMoveElement(selected);
      return source ? movingElements(source) : [];
    }
    function singleMovementError(source, target) {
      if (!enabled || isBusy()) return '편집을 마친 뒤 이동해 주세요';
      if (!source?.isConnected || !target?.isConnected || source === target) return '이동할 다른 항목을 선택해 주세요';
      if (source.contains(target) || target.contains(source)) return '자신의 상위·하위 영역으로는 이동할 수 없어요';
      const entry = entryFor(source), other = entryFor(target);
      if (!entry || !other || entry.protected || other.protected) return '고정된 상단 영역은 이동할 수 없어요';
      if (imagePart(source) || imagePart(target)) return '이미지와 캡션은 이미지 묶음을 선택해 함께 이동해 주세요';
      const top = source === rootElement(entry.id), targetTop = target === rootElement(other.id);
      if (top || targetTop) {
        if (!top || !targetTop || source.parentElement !== target.parentElement) return '같은 부모 안의 형제 항목끼리 이동할 수 있어요';
        if (regionFor(entry.id).segment !== regionFor(other.id).segment) return '고정 영역을 넘어 이동할 수 없어요';
      } else {
        if (source.parentElement !== target.parentElement || entry !== other) return '같은 부모 안의 형제 항목끼리 이동할 수 있어요';
        if (transientLayout(entry)) return '추가한 GAP·팁박스를 먼저 저장한 뒤 안쪽 항목을 이동해 주세요';
      }
      return '';
    }
    function adjacent(element, direction) {
      const moving = movingElements(element), edge = direction < 0 ? moving[0] : moving.at(-1);
      const entry = edge && entryFor(edge);
      if (!entry) return null;
      if (edge === rootElement(entry.id)) return rootElement(entries[regionFor(entry.id).index + direction]?.id);
      return direction < 0 ? edge.previousElementSibling : edge.nextElementSibling;
    }
    function canMove(element, direction) {
      const other = adjacent(element,direction);
      return !!other && !movementError(element,other);
    }
    function baseMoveElement(element) {
      if (!element?.isConnected || !article?.contains(element)) return null;
      const image = element.closest('figure') || (legacyImage(element.parentElement) ? element.parentElement : null);
      const target = image || element.closest('.guide-section-heading') || element;
      const entry = entryFor(target);
      return entry && !entry.protected ? target : null;
    }
    function bodyMoveElement(element) {
      const target = baseMoveElement(element), elements = getSelectedElements();
      if (elements.length < 2 || !elements.includes(target) && target !== elements[0].parentElement) return target;
      const parent = promotedParent(elements);
      return parent && (target === parent || elements.includes(target)) ? parent : target;
    }
    function bodyMoveTargets(element) {
      const source = bodyMoveElement(element), entry = source && entryFor(source);
      if (!entry) return [];
      const candidates = source === rootElement(entry.id) ? entries.map(item => rootElement(item.id)) : [...source.parentElement.children];
      const moving = movingElements(source);
      return candidates.filter(target => target && !moving.includes(target) && !target.matches('[data-local-gap-owner]') && !movementError(source,target));
    }
    function clearDrop() {
      ui.outline?.querySelectorAll('.drop-before,.drop-after').forEach(row => row.classList.remove('drop-before','drop-after'));
    }
    function endDrag() {
      clearDrop();
      if (drag) drag.row.classList.remove('dragging');
      drag = null;
      refresh();
    }
    function makeRow(element) {
      const owner = ui.outline.ownerDocument, row = owner.createElement('div');
      row.className = 'outline-row'; row.dataset.outlineKey = keyFor(element);
      const button = (className,title) => {
        const result = owner.createElement('button'); result.type = 'button'; result.className = className;
        result.title = title; result.setAttribute('aria-label',title); row.append(result); return result;
      };
      const toggle = button('outline-toggle','하위 항목 펼치기');
      const check = owner.createElement('input'); check.type = 'checkbox'; check.className = 'outline-select';
      check.setAttribute('aria-label','이 항목을 이동할 항목에 추가 또는 제외'); row.append(check);
      const item = button('outline-item','');
      const up = button('outline-move up','같은 부모 안에서 위로 이동'); up.textContent = '↑';
      const down = button('outline-move down','같은 부모 안에서 아래로 이동'); down.textContent = '↓';
      item.onclick = event => choose(element,event || {},false,true);
      check.onclick = event => { event.stopPropagation(); choose(element,event,true); };
      toggle.onclick = () => {
        folded.set(element,!folded.get(element));
        if (folded.get(element) && selected !== element && element.contains(selected)) select(element);
        else refresh();
      };
      up.onclick = () => action(() => { if (!selection.includes(element)) select(element); else setSelection(selection,element); move(-1); });
      down.onclick = () => action(() => { if (!selection.includes(element)) select(element); else setSelection(selection,element); move(1); });
      row.ondragstart = event => {
        const entry = entryFor(element);
        if (isBusy() || !enabled || !entry || entry.protected || imagePart(element) || !event.dataTransfer) { event.preventDefault(); return; }
        drag = {element,row};
        if (selection.includes(element)) setSelection(selection,element,false,true); else select(element,false,true);
        event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('application/x-jjstar-block',keyFor(element));
        row.classList.add('dragging');
        for (const [candidate,cached] of rowCache) {
          cached.classList.toggle('selected',selection.includes(candidate));
          cached.querySelector('.outline-select').checked = selection.includes(candidate);
        }
        if (ui.selectedBlock) ui.selectedBlock.textContent = label(element);
        event.stopPropagation();
      };
      row.ondragover = event => {
        clearDrop();
        if (!drag || movementError(drag.element,element)) return;
        event.preventDefault(); event.stopPropagation(); event.dataTransfer.dropEffect = 'move';
        const bounds = row.getBoundingClientRect();
        row.classList.add(event.clientY < bounds.top + bounds.height / 2 ? 'drop-before' : 'drop-after');
      };
      row.ondragleave = event => { if (!row.contains(event.relatedTarget)) row.classList.remove('drop-before','drop-after'); };
      row.ondrop = event => {
        if (!drag) return;
        event.preventDefault(); event.stopPropagation();
        const source = drag.element, bounds = row.getBoundingClientRect(), side = event.clientY < bounds.top + bounds.height / 2 ? 'before' : 'after';
        const error = movementError(source,element);
        drag.row.classList.remove('dragging'); drag = null; clearDrop();
        if (error) { message(error,true); refresh(); return; }
        action(() => moveBeside(source,element,side));
      };
      row.ondragend = endDrag;
      rowCache.set(element,row);
      return row;
    }
    function refresh() {
      if (!ui.outline || drag) return;
      invalidateIndex(); indexRegions();
      const scrollTop = ui.outline.scrollTop, focus = ui.outline.ownerDocument.activeElement;
      const focusRow = focus?.closest('.outline-row'), focusKey = focusRow?.dataset.outlineKey;
      const focusClass = focus?.classList.contains('outline-toggle') ? 'outline-toggle' : focus?.classList.contains('outline-select') ? 'outline-select' : focus?.classList.contains('up') ? 'up' : focus?.classList.contains('down') ? 'down' : 'outline-item';
      if (ui.structureStatus) ui.structureStatus.textContent = enabled ? '그룹을 펼쳐 항목을 선택하고 같은 부모 안에서 끌어 이동해요' : state.structure?.reason || '이 문서는 문구 편집만 지원해요';
      if (ui.selectedBlock) ui.selectedBlock.textContent = selected ? (selection.length > 1 ? `${selection.length}개 선택 · ` : '') + label(selected) : '선택한 영역 없음 · 맨 아래에 추가해요';
      const rows = [], movement = new WeakMap();
      function movementFor(element) {
        if (!movement.has(element)) {
          const before = adjacent(element,-1), after = adjacent(element,1);
          movement.set(element,{up:before ? movementError(element,before) : '같은 부모 안에서 이동할 수 있는 항목이 없어요',
            down:after ? movementError(element,after) : '같은 부모 안에서 이동할 수 있는 항목이 없어요'});
        }
        return movement.get(element);
      }
      function append(element,entry,depth) {
        const children = entry.protected ? [] : outlineChildren(element);
        if (!folded.has(element)) folded.set(element,imageGroup(element));
        const collapsed = children.length > 0 && folded.get(element), row = rowCache.get(element) || makeRow(element);
        row.style.setProperty('--outline-depth',String(depth)); row.classList.toggle('selected',selection.includes(element));
        row.classList.toggle('protected',!!entry.protected); row.classList.toggle('collapsed',collapsed);
        row.setAttribute('aria-level',String(depth+1));
        const toggle = row.querySelector('.outline-toggle'), check = row.querySelector('.outline-select'), item = row.querySelector('.outline-item'), up = row.querySelector('.up'), down = row.querySelector('.down');
        toggle.textContent = collapsed ? '▸' : '▾'; toggle.disabled = !children.length;
        toggle.style.visibility = children.length ? '' : 'hidden'; toggle.setAttribute('aria-expanded',String(!collapsed));
        toggle.title = collapsed ? '하위 항목 펼치기' : '하위 항목 접기';
        toggle.setAttribute('aria-label',toggle.title);
        item.textContent = (entry.protected ? '고정 · ' : '') + label(element); item.title = item.textContent;
        item.setAttribute('aria-label',item.textContent); item.setAttribute('aria-selected',String(selection.includes(element)));
        item.classList.toggle('selected',selection.includes(element)); item.classList.toggle('protected',!!entry.protected);
        check.checked = selection.includes(element); check.disabled = !enabled || isBusy() || entry.protected || imagePart(element);
        const errors = movementFor(element);
        up.disabled = !!errors.up; down.disabled = !!errors.down;
        up.title = imagePart(element) ? '이미지 묶음을 선택해 함께 이동해 주세요' : errors.up || '같은 부모 안에서 위로 이동';
        down.title = imagePart(element) ? '이미지 묶음을 선택해 함께 이동해 주세요' : errors.down || '같은 부모 안에서 아래로 이동';
        row.draggable = enabled && !isBusy() && !entry.protected && !imagePart(element);
        rows.push(row);
        if (!collapsed) children.forEach(child => append(child,entry,depth+1));
      }
      entries.forEach(entry => { const root = rootElement(entry.id); if (root) append(root,entry,0); });
      if (rows.length !== ui.outline.children.length || rows.some((row,index) => ui.outline.children[index] !== row)) ui.outline.replaceChildren(...rows);
      for (const [element] of rowCache) if (!element.isConnected) rowCache.delete(element);
      if (focusKey) [...ui.outline.children].find(row => row.dataset.outlineKey === focusKey)?.querySelector('.' + focusClass)?.focus({preventScroll:true});
      ui.outline.scrollTop = scrollTop;
      const entry = selected && entryFor(selected), locked = !enabled || isBusy() || !!entry?.protected;
      const part = selected && imagePart(selected), multiple = selection.length > 1;
      const errors = selected && movementFor(selected);
      for (const name of ['insertBlock','moveUp','moveDown','duplicateBlock','deleteBlock','editImage']) if (ui[name]) ui[name].disabled = !enabled || isBusy() || (name !== 'insertBlock' && (!selected || locked));
      if (ui.insertBlock && (part || multiple)) ui.insertBlock.disabled = true;
      if (ui.moveUp) ui.moveUp.disabled = locked || !errors || !!errors.up;
      if (ui.moveDown) ui.moveDown.disabled = locked || !errors || !!errors.down;
      if (ui.deleteBlock && selected && (hasAnchors(selected) || part || multiple)) ui.deleteBlock.disabled = true;
      if (ui.duplicateBlock && selected && (hasAnchors(selected) || part || multiple)) ui.duplicateBlock.disabled = true;
      if (ui.editImage) ui.editImage.disabled = locked || multiple || !selected?.querySelector('img') && !selected?.matches('img') && !part;
      bodyDrag?.refresh();
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
      requireSingle();
      const position = ui.insertPosition?.value || 'after';
      const entry = selected && entryFor(selected);
      if (selected && imagePart(selected)) throw new Error('이미지 묶음을 선택한 뒤 앞이나 뒤에 추가해 주세요');
      if (selected && entry && !entry.protected) {
        if (position === 'inside') {
          if (!selected.matches('section,div') || imageGroup(selected) || selected.matches('.guide-section-heading,.guide-image-row') || selected.closest('[data-local-block]')) throw new Error('안쪽에 추가하려면 목록에서 섹션 또는 팁박스 영역을 선택해 주세요');
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
      invalidateIndex();
    }
    function action(run) {
      if (isBusy()) return;
      try { run(); } catch (error) { message(error.message,true); }
    }
    function requireSingle() {
      if (selection.length > 1) throw new Error('여러 항목을 선택했을 때는 이동만 할 수 있어요 한 항목을 선택한 뒤 이용해 주세요');
    }
    function moveBeside(source, target, side) {
      const logical = getSelectedElements(), primary = selected, parent = promotedParent(logical), moving = movingElements(source);
      const preserve = logical.length > 1 && (logical.includes(source) || source === parent);
      if (preserve && logical.includes(target) || moving.includes(target) && moving.length > 1) { refresh(); return; }
      const error = movementError(source,target);
      if (error) throw new Error(error);
      const actualSource = moving[0], entry = entryFor(actualSource), other = entryFor(target), top = actualSource === rootElement(entry.id);
      if (top) {
        const movingEntries = moving.map(element => entryFor(element)), movingSet = new Set(movingEntries);
        const previous = entries.map(item => item.id).join('|'), next = entries.filter(item => !movingSet.has(item));
        next.splice(next.indexOf(other) + (side === 'after' ? 1 : 0),0,...movingEntries);
        if (next.map(item => item.id).join('|') === previous) { refresh(); return; }
        beforeChange();
        const fragment = doc.createDocumentFragment();
        for (const member of movingEntries) {
          const {start,end} = boundaries(member.id);
          for (let node = start; node;) { const following = node.nextSibling; fragment.append(node); if (node === end) break; node = following; }
        }
        article.insertBefore(fragment,side === 'before' ? boundaries(other.id).start : boundaries(other.id).end.nextSibling);
        entries = next;
        invalidateIndex();
      } else {
        const container = actualSource.parentElement, previous = [...container.children], next = previous.filter(element => !moving.includes(element));
        next.splice(next.indexOf(target) + (side === 'after' ? 1 : 0),0,...moving);
        if (next.every((element,index) => element === previous[index])) { refresh(); return; }
        beforeChange();
        const fragment = doc.createDocumentFragment(); moving.forEach(element => fragment.append(element));
        container.insertBefore(fragment,side === 'before' ? target : target.nextSibling);
        mark(entry);
      }
      setSelection(preserve ? logical : moving,preserve ? primary : source); onChange(); onMove?.(moving.slice());
    }
    function move(direction) {
      ensureEditable(selected);
      const other = adjacent(selected,direction);
      if (!other) throw new Error('같은 부모 안에서 이동할 수 있는 항목이 없어요');
      moveBeside(selected,other,direction < 0 ? 'before' : 'after');
    }
    function spacingUnits(elements) {
      const units = ordered(elements.map(element => {
        let unit = baseMoveElement(element);
        if (!unit) return null;
        const entry = entryFor(unit), root = rootElement(entry.id);
        while (unit !== root && unit.parentElement?.matches('p,h2,h3,h4,h5,h6,figcaption,span,strong,em,b,i,u,s,a,small,code,sup,sub')) unit = baseMoveElement(unit.parentElement);
        return unit;
      }));
      const error = selectionError(units);
      if (error) throw new Error(error);
      return units;
    }
    function flowError(element) {
      let parent = element?.parentElement;
      while (parent && doc.defaultView.getComputedStyle(parent).display === 'contents') parent = parent.parentElement;
      const display = parent && doc.defaultView.getComputedStyle(parent).display;
      if (!parent || /^(?:inline-)?(?:flex|grid)$/.test(display)) return '가로·격자 배치 안의 간격은 묶음 전체를 선택해 조절해 주세요';
      if (/^(?:absolute|fixed)$/.test(doc.defaultView.getComputedStyle(element).position)) return '일반 본문 흐름 안의 항목에서 간격을 조절해 주세요';
      const entry = entryFor(element);
      if (entry && transientLayout(entry)) return '추가한 GAP·팁박스를 먼저 저장한 뒤 간격을 조절해 주세요';
      return '';
    }
    const isSpacer = element => !!element?.matches('.guide-spacer-v') && !element.children.length && !element.textContent.trim();
    function spacerHeight(element) {
      const measured = element.getBoundingClientRect().height, declared = parseFloat(element.style.height), computed = parseFloat(doc.defaultView.getComputedStyle(element).height);
      return measured || (Number.isFinite(declared) ? declared : Number.isFinite(computed) && computed > 0 ? computed : 70);
    }
    function spacingPlan(element,side,pixels) {
      const error = flowError(element);
      if (error) throw new Error(error);
      const entry = ensureEditable(element), top = element === rootElement(entry.id), neighbor = side === 'before' ? element.previousElementSibling : element.nextElementSibling;
      if (isSpacer(neighbor)) {
        const owner = ensureEditable(neighbor);
        if (top !== (neighbor === rootElement(owner.id)) || !top && entry !== owner) throw new Error('같은 영역의 인접 여백만 조절할 수 있어요');
        if (pixels === 0 && hasAnchors(neighbor)) throw new Error('연결 주소가 있는 여백은 제거할 수 없어요');
        if (pixels > 0 && Math.abs(spacerHeight(neighbor)-pixels) < .5) return null;
        return {kind:pixels ? 'update' : 'remove',element,entry,top,neighbor,owner,side,pixels};
      }
      if (!pixels) return null;
      return {kind:'insert',element,entry,top,side,pixels};
    }
    function applySpacing(plans) {
      const changes = plans.filter(Boolean);
      if (!changes.length) return false;
      beforeChange();
      for (const plan of changes) {
        if (plan.kind === 'insert') {
          const spacer = doc.createElement('div'); spacer.className = 'guide-spacer-v'; spacer.style.height = plan.pixels + 'px';
          if (plan.top) insertRegion(spacer,plan.side === 'before' ? plan.entry.id : null,plan.side === 'after' ? plan.entry.id : null);
          else { if (plan.side === 'before') plan.element.before(spacer); else plan.element.after(spacer); mark(plan.entry); }
        } else if (plan.kind === 'update') { plan.neighbor.style.height = plan.pixels + 'px'; mark(plan.owner); }
        else if (plan.top) {
          const {start,end} = boundaries(plan.owner.id); nodes(plan.owner.id).forEach(node => node.remove()); start.remove(); end.remove(); entries = entries.filter(entry => entry !== plan.owner); invalidateIndex();
        } else { plan.neighbor.remove(); mark(plan.owner); }
      }
      refresh(); selectionChanged(); onChange();
      return true;
    }
    function setSpacing(side,pixels) {
      if (!enabled || isBusy()) throw new Error('편집을 마친 뒤 간격을 조절해 주세요');
      if (!['before','after'].includes(side)) throw new Error('앞 또는 뒤 간격을 선택해 주세요');
      const value = Number(pixels);
      if (!Number.isFinite(value) || value < 0 || value > 1000) throw new Error('간격은 0부터 1000px 사이로 입력해 주세요');
      const units = spacingUnits(getSelectedElements());
      if (!units.length) throw new Error('간격을 조절할 항목을 먼저 선택해 주세요');
      return applySpacing([spacingPlan(side === 'before' ? units[0] : units.at(-1),side,Math.round(value))]);
    }
    function clearSpacing() {
      if (!enabled || isBusy()) throw new Error('편집을 마친 뒤 간격을 조절해 주세요');
      const units = spacingUnits(getSelectedElements());
      if (!units.length) throw new Error('간격을 조절할 항목을 먼저 선택해 주세요');
      return applySpacing([spacingPlan(units[0],'before',0),spacingPlan(units.at(-1),'after',0)]);
    }
    function correctSpacing(elements = getSelectedElements()) {
      if (!enabled || isBusy()) throw new Error('편집을 마친 뒤 간격을 조절해 주세요');
      const units = spacingUnits(elements);
      if (!units.length) return false;
      const image = element => imageGroup(element) || element.matches('.guide-image-row');
      const text = element => element.matches('p,h2,h3,h4,h5,h6,span,strong,blockquote,pre,.guide-section-heading,[data-local-block]') && !image(element);
      const plans = [];
      for (const [edge,side] of [[units[0],'before'],[units.at(-1),'after']]) {
        if (flowError(edge)) continue;
        const neighbor = side === 'before' ? edge.previousElementSibling : edge.nextElementSibling;
        const other = isSpacer(neighbor) ? side === 'before' ? neighbor.previousElementSibling : neighbor.nextElementSibling : neighbor;
        if (!other || units.includes(other) || !(image(edge) && text(other) || text(edge) && image(other))) continue;
        if (isSpacer(neighbor) && spacerHeight(neighbor) >= 12) continue;
        const a = edge.getBoundingClientRect(), b = other.getBoundingClientRect(), gap = side === 'before' ? a.top-b.bottom : b.top-a.bottom;
        if (!Number.isFinite(gap) || gap < 0 || gap >= 12) continue;
        plans.push(spacingPlan(edge,side,24));
      }
      return applySpacing(plans);
    }
    function remove() {
      requireSingle();
      const entry = ensureEditable(selected);
      if (imagePart(selected)) throw new Error('이미지와 캡션은 이미지 묶음을 선택해 함께 삭제해 주세요');
      if (hasAnchors(selected)) throw new Error('다른 위치에서 연결하는 주소가 있는 영역은 삭제할 수 없어요');
      if (!ui.outline.ownerDocument.defaultView.confirm('선택한 영역을 삭제할까요? 저장 전에는 되돌릴 수 있어요')) return;
      beforeChange();
      if (selected === rootElement(entry.id)) {
        const {start,end} = boundaries(entry.id); nodes(entry.id).forEach(node => node.remove()); start.remove(); end.remove(); entries = entries.filter(e => e !== entry); invalidateIndex();
      } else { selected.remove(); mark(entry); }
      select(null); onChange();
    }
    function duplicate() {
      requireSingle();
      const entry = ensureEditable(selected);
      if (imagePart(selected)) throw new Error('이미지와 캡션은 이미지 묶음을 선택해 함께 복제해 주세요');
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
      requireSingle();
      if (!enabled) { message('이 문서에서는 이미지 배치를 편집할 수 없어요',true); return; }
      if (target) ensureEditable(target);
      imageTarget = target;
      const images = imageElements(target);
      if (target && !images.length) throw new Error('변경할 이미지를 목록 또는 화면에서 선택해 주세요');
      imageCount = target ? images.length : Number(ui.imageColumns?.value || 1);
      const code = state.path.split('/').pop().replace(/^L\d+/,'').replace(/\.html$/,'').toLowerCase();
      imageFields(Array.from({length:imageCount},(_,index) => {
        const img = images[index], src = img?.getAttribute('src') || '';
        return {name:src.split('/').pop()?.split('?')[0] || `jjstar_d_${code}-ex-${String(index+1).padStart(2,'0')}.webp`,alt:img?.alt || '',caption:captionFor(img)?.textContent || ''};
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
      requireSingle();
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
          const figure = img.closest('figure'), legacy = legacyImage(img.parentElement) ? img.parentElement : null;
          if (figure || legacy) {
            let caption = captionFor(img);
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
      article.querySelectorAll('img').forEach(img => {
        if (!imageGroup(img.parentElement)) return;
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
    article?.addEventListener('mousedown',event => {
      if (event.button !== 0) return;
      const text = doc.getSelection();
      pointerGesture = {x:event.clientX,y:event.clientY,moved:false,hadText:!!text && !text.isCollapsed && !!text.toString()};
    },true);
    article?.addEventListener('mousemove',event => {
      if (pointerGesture && Math.hypot(event.clientX-pointerGesture.x,event.clientY-pointerGesture.y) > 5) pointerGesture.moved = true;
    });
    article?.addEventListener('click', event => {
      const gesture = pointerGesture; pointerGesture = null;
      const text = doc.getSelection(), modifier = event.ctrlKey || event.metaKey || event.shiftKey;
      if (text && !text.isCollapsed && text.toString() && (!modifier || !gesture || gesture.moved || gesture.hadText)) return;
      if (gesture?.moved) return;
      let target = event.target.closest('.guide-section-heading') || event.target.closest('img,figcaption,[data-local-block],' + BLOCK_SELECTOR);
      if (event.target.matches('div') && !event.target.matches('[data-local-gap-owner]') && outlineChildren(event.target).length > 0 && entryFor(event.target)) target = event.target;
      const group = target?.closest('figure') || (legacyImage(target?.parentElement) ? target.parentElement : null);
      if (group && !group.closest('.guide-section-heading')) target = group;
      if (!target || !article.contains(target)) return;
      const entry = entryFor(target);
      if (entry && choose(target,event) && modifier && selection.length > 1) doc.getSelection()?.removeAllRanges();
    });
    article?.addEventListener('dblclick', event => {
      const image = event.target.closest('img');
      if (!image || !article.contains(image) || image.closest('.guide-section-heading')) return;
      event.preventDefault();
      action(() => openImages(image.closest('figure') || (legacyImage(image.parentElement) ? image.parentElement : image)).catch(error => message(error.message,true)));
    });
    if (ui.insertBlock) ui.insertBlock.onclick = () => action(() => ui.insertType.value === 'image' ? openImages().catch(error => message(error.message,true)) : insert(template(ui.insertType.value),ui.insertType.value));
    if (ui.moveUp) ui.moveUp.onclick = () => action(() => move(-1));
    if (ui.moveDown) ui.moveDown.onclick = () => action(() => move(1));
    if (ui.deleteBlock) ui.deleteBlock.onclick = () => action(remove);
    if (ui.duplicateBlock) ui.duplicateBlock.onclick = () => action(duplicate);
    if (ui.editImage) ui.editImage.onclick = () => action(() => {
      let target = selected;
      if (target && imagePart(target)) target = target.parentElement;
      else if (target?.matches('p,h2,h3,h4')) target = target.closest('figure') || target;
      openImages(target).catch(error => message(error.message,true));
    });
    if (ui.imageApply) ui.imageApply.onclick = event => { event.preventDefault(); action(applyImages); };
    if (ui.imageCancel) ui.imageCancel.onclick = () => ui.imageDialog.close();
    if (enabled && window.JJSTAR_EDITOR_BODY_DRAG) bodyDrag = window.JJSTAR_EDITOR_BODY_DRAG.create({
      doc, root:article, getSelection:() => selected, getSelections:getSelectedElements, isBusy,
      getParent:() => getSelectionPath().at(-2)?.element || null,selectParent,
      normalize:bodyMoveElement, getTargets:bodyMoveTargets,
      canDrop:(source,target) => !movementError(source,target),
      move:(source,target,side) => action(() => moveBeside(source,target,side)),
      select:element => {
        if (selection.length > 1 && (selection.includes(element) || promotedParent(getSelectedElements()) === element)) setSelection(selection,selection.includes(element) ? element : selected);
        else select(element);
      }
    });
    watchImages(); refresh();
    return {snapshot,restore,layout,changed,summary,refresh,select,getSelectionPath,selectParent,getSelectedElements,getMoveElements,setSpacing,clearSpacing,correctSpacing,
      destroy() { bodyDrag?.destroy(); bodyDrag = null; endDrag(); },
      getCodeHTML() { const shell = doc.createElement('div'); if (article) shell.append(article.cloneNode(true)); return cleanTree(shell).innerHTML; },
      ownsText:id => id.startsWith('newtext-'),
      markText(element) { invalidateIndex(); const entry = entryFor(element); if (entry && !entry.protected && (entry.dirty || entry.id.startsWith('new-'))) entry.dirty = true; },
      textAllowed(element) { return !entryFor(element)?.protected; }};
  }
  window.JJSTAR_EDITOR_BLOCKS = {create, safeName, cleanTree};
})();
