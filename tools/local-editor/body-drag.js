(() => {
  function create(options) {
    const {doc, root, getSelection, getSelections, getParent, selectParent, isBusy, normalize, getTargets, canDrop, move, select, onDragChange} = options;
    const view = doc.defaultView;
    if (!root || root === doc.body || root === doc.documentElement) throw new Error('본문 드래그에는 별도의 본문 영역이 필요해요');
    const ui = doc.createElement('div'); ui.dataset.localEditorUi = 'body-drag';
    const style = doc.createElement('style');
    style.textContent = '[data-local-editor-ui="body-drag"]{position:fixed;inset:0;z-index:2147483000;pointer-events:none}[data-local-editor-ui="body-drag"] [hidden]{display:none!important}.local-body-drag-handle{position:fixed!important;display:flex!important;align-items:center;justify-content:center;width:28px!important;height:30px!important;min-width:0!important;padding:0!important;margin:0!important;border:1px solid #71a9d2!important;border-radius:5px!important;background:#fff!important;color:#005da8!important;box-shadow:0 2px 7px #0002!important;font:700 22px/1 sans-serif!important;cursor:grab!important;pointer-events:auto;user-select:none;touch-action:none}.local-body-drag-handle.dragging{cursor:grabbing!important;background:#eaf5ff!important}.local-body-drop-line{position:fixed;pointer-events:none;background:#0083c3;border-radius:2px;box-shadow:0 0 0 1px #fff9}';
    const handle = doc.createElement('button'); handle.type = 'button'; handle.className = 'local-body-drag-handle';
    handle.draggable = true; handle.contentEditable = 'false'; handle.textContent = '⠿';
    handle.title = '선택한 영역을 끌어 같은 부모 안에서 이동'; handle.setAttribute('aria-label',handle.title); handle.hidden = true;
    const line = doc.createElement('div'); line.className = 'local-body-drop-line'; line.hidden = true; line.setAttribute('aria-hidden','true');
    const parentButton = doc.createElement('button'); parentButton.type = 'button'; parentButton.className = 'local-body-parent';
    parentButton.textContent = '↑ 상위 묶음'; parentButton.title = '선택한 항목을 감싸는 상위 묶음 전체 선택'; parentButton.contentEditable = 'false'; parentButton.hidden = true;
    style.textContent += '.local-body-parent{position:fixed;pointer-events:auto;min-width:0;padding:4px 7px;margin:0;border:1px solid #71a9d2;border-radius:5px;background:#fff;color:#005da8;box-shadow:0 2px 7px #0002;font:600 12px/1.3 sans-serif;white-space:nowrap;cursor:pointer}';
    ui.append(style,handle,line,parentButton); doc.body.append(ui);
    let active = null, destroyed = false, scrollFrame = 0, geometryFrame = 0;
    let availableSource = null, sourceCanMove = false;
    let availableSources = [];
    let geometryNeedsValidation = false;
    const listeners = [];
    const listen = (target,type,callback,capture = false) => { target.addEventListener(type,callback,capture); listeners.push(() => target.removeEventListener(type,callback,capture)); };
    const report = error => { if (options.onError) options.onError(error); };
    const notify = value => { try { onDragChange?.(value); } catch (error) { report(error); } };
    const rectFor = element => element.getBoundingClientRect();
    const withinViewport = rect => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0 && rect.top < view.innerHeight && rect.left < view.innerWidth;
    const elementVisible = element => {
      const style = view.getComputedStyle(element), rect = rectFor(element);
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    };
    function visible() {
      if (destroyed || isBusy() || !root.isConnected || doc.hidden || !root.getClientRects().length) return false;
      try { if (view.frameElement && !view.frameElement.getClientRects().length) return false; } catch (_) {}
      const style = view.getComputedStyle(root);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }
    function unit(element) {
      if (!element || !element.isConnected || !root.contains(element)) return null;
      try {
        const result = normalize(element);
        return result?.isConnected && root.contains(result) ? result : null;
      } catch (_) { return null; }
    }
    function selectedUnits() {
      const values = getSelections ? getSelections() : [getSelection()];
      const elements = [...new Set(values.map(unit).filter(Boolean))];
      if (elements.some(element => element.parentElement !== elements[0].parentElement)) return [];
      return elements.sort((a,b) => a === b ? 0 : a.compareDocumentPosition(b) & 4 ? -1 : 1);
    }
    function sourcesFor(source) {
      const elements = active?.sources || selectedUnits();
      return elements.includes(source) ? elements : [];
    }
    function targets(source) {
      if (!source?.isConnected || !root.contains(source)) return [];
      const sources = sourcesFor(source), selected = new Set(sources);
      if (!sources.length || sources.some(element => !element.isConnected || element.parentElement !== source.parentElement)) return [];
      try {
        return [...new Set(getTargets(source).map(unit))].filter(target => target && !selected.has(target)
          && target.parentElement === source.parentElement && !source.contains(target) && !target.contains(source)
          && sources.every(element => canDrop(element,target)) && elementVisible(target));
      } catch (_) { return []; }
    }
    function clearLine() {
      line.hidden = true; delete line.dataset.axis; delete line.dataset.side;
      if (active) { active.target = null; active.side = null; }
    }
    function showHandle(source) {
      const sources = sourcesFor(source), rectangles = sources.filter(elementVisible).map(rectFor);
      if (!rectangles.length || !active && !rectangles.some(withinViewport)) { handle.hidden = true; return; }
      const rect = {left:Math.min(...rectangles.map(r => r.left)),top:Math.min(...rectangles.map(r => r.top)),bottom:Math.max(...rectangles.map(r => r.bottom))};
      const left = Math.max(4,Math.min(view.innerWidth - 32,rect.left - 36));
      const top = Math.max(4,Math.min(Math.max(rect.top + 4,4),Math.min(rect.bottom - 30,view.innerHeight - 34)));
      const count = getSelections ? getSelections().length : sources.length;
      handle.dataset.selectionCount = String(count);
      handle.title = count > sources.length ? `선택한 ${count}개 항목을 전체 묶음으로 이동` : count > 1 ? `선택한 ${count}개 영역을 함께 이동` : '선택한 영역을 끌어 같은 부모 안에서 이동';
      handle.setAttribute('aria-label',handle.title);
      handle.style.left = left + 'px'; handle.style.top = top + 'px'; handle.hidden = false;
    }
    function showParent(source) {
      parentButton.hidden = true;
      if (active || !getParent || !selectParent) return;
      const parent = getParent();
      if (!parent?.isConnected || parent === root || !root.contains(parent)) return;
      const rectangles = sourcesFor(source).filter(elementVisible).map(rectFor);
      if (!rectangles.some(withinViewport)) return;
      const left = Math.min(...rectangles.map(rect => rect.left)), top = Math.min(...rectangles.map(rect => rect.top));
      parentButton.hidden = false;
      const height = parentButton.offsetHeight, width = parentButton.offsetWidth;
      parentButton.style.left = Math.max(4,Math.min(left+3,view.innerWidth-width-4)) + 'px';
      parentButton.style.top = Math.max(4,Math.min(top-height-5,view.innerHeight-height-4)) + 'px';
    }
    function refresh() {
      if (destroyed) return;
      if (!visible()) { if (active) cancel(); handle.hidden = true; parentButton.hidden = true; clearLine(); return; }
      const source = active?.source || unit(getSelection());
      availableSources = source ? sourcesFor(source) : [];
      availableSource = source; sourceCanMove = !!source && targets(source).length > 0;
      showParent(source);
      if (!sourceCanMove) { if (active) cancel(); handle.hidden = true; clearLine(); return; }
      showHandle(source);
      if (active?.point) updatePoint(active.point);
    }
    function refreshGeometry() {
      if (destroyed) return;
      if (!visible()) { if (active) cancel(); handle.hidden = true; parentButton.hidden = true; clearLine(); return; }
      const source = active?.source || unit(getSelection());
      const sources = source ? sourcesFor(source) : [];
      if (source !== availableSource || sources.length !== availableSources.length || sources.some((element,index) => element !== availableSources[index])) { refresh(); return; }
      showParent(source);
      if (!source || !sourceCanMove) { handle.hidden = true; clearLine(); return; }
      showHandle(source);
      if (active?.point) updatePoint(active.point);
    }
    function horizontal(target, siblings) {
      const rect = rectFor(target);
      return siblings.some(sibling => {
        if (sibling === target) return false;
        const other = rectFor(sibling), overlap = Math.min(rect.bottom,other.bottom) - Math.max(rect.top,other.top);
        return overlap > Math.min(rect.height,other.height) * 0.45
          && (other.left >= rect.right - 2 || rect.left >= other.right - 2);
      });
    }
    function updatePoint(point) {
      if (!active || !visible()) { clearLine(); return; }
      active.point = point;
      const area = rectFor(root);
      if (point.x < Math.max(0,area.left - 12) || point.x > Math.min(view.innerWidth,area.right + 12)
          || point.y < Math.max(0,area.top - 12) || point.y > Math.min(view.innerHeight,area.bottom + 12)) { clearLine(); return; }
      const siblings = targets(active.source), sourceRects = active.sources.map(rectFor);
      if (sourceRects.some(rect => point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom)) { clearLine(); return; }
      let best = null, distance = Infinity;
      for (const target of siblings) {
        const rect = rectFor(target);
        if (!withinViewport(rect)) continue;
        const dx = Math.max(rect.left - point.x,0,point.x - rect.right), dy = Math.max(rect.top - point.y,0,point.y - rect.bottom);
        const score = dx * dx + dy * dy;
        if (score < distance) { best = target; distance = score; }
      }
      if (!best || distance > 48 * 48) { clearLine(); return; }
      const rect = rectFor(best), isHorizontal = horizontal(best,[...active.sources,...siblings]);
      const side = (isHorizontal ? point.x < (rect.left + rect.right) / 2 : point.y < (rect.top + rect.bottom) / 2) ? 'before' : 'after';
      active.target = best; active.side = side;
      line.dataset.axis = isHorizontal ? 'x' : 'y'; line.dataset.side = side;
      line.style.left = (isHorizontal ? (side === 'before' ? rect.left : rect.right) - 1 : rect.left) + 'px';
      line.style.top = (isHorizontal ? rect.top : (side === 'before' ? rect.top : rect.bottom) - 1) + 'px';
      line.style.width = (isHorizontal ? 3 : rect.width) + 'px'; line.style.height = (isHorizontal ? rect.height : 3) + 'px';
      line.hidden = false;
    }
    function scrollSpeed() {
      if (!active?.point) return 0;
      const edge = 52, y = active.point.y;
      if (y < 0 || y > view.innerHeight) return 0;
      return y < edge ? -Math.min(18,Math.ceil((edge-y)/3)) : y > view.innerHeight-edge ? Math.min(18,Math.ceil((y-view.innerHeight+edge)/3)) : 0;
    }
    function queueAutoScroll() {
      if (!scrollFrame && scrollSpeed()) scrollFrame = view.requestAnimationFrame(autoScroll);
    }
    function autoScroll() {
      scrollFrame = 0;
      if (!active || destroyed) return;
      if (!visible()) { cancel(); return; }
      const speed = scrollSpeed();
      if (!speed) return;
      const before = view.scrollY;
      view.scrollBy(0,speed);
      updatePoint(active.point); showHandle(active.source);
      if (view.scrollY !== before) queueAutoScroll();
    }
    function scheduleGeometry(validate = false) {
      if (destroyed) return;
      geometryNeedsValidation = geometryNeedsValidation || validate;
      if (geometryFrame || active && scrollFrame && !geometryNeedsValidation) return;
      geometryFrame = view.requestAnimationFrame(() => {
        geometryFrame = 0;
        const check = geometryNeedsValidation; geometryNeedsValidation = false;
        if (check) refresh(); else refreshGeometry();
      });
    }
    function cancel() {
      const wasActive = !!active;
      active = null; clearLine(); handle.classList.remove('dragging');
      if (scrollFrame) view.cancelAnimationFrame(scrollFrame); scrollFrame = 0;
      if (wasActive) notify(false);
      if (!destroyed) refresh();
    }
    listen(handle,'click',event => { event.preventDefault(); event.stopPropagation(); });
    listen(parentButton,'mousedown',event => event.preventDefault());
    listen(parentButton,'click',event => {
      event.preventDefault(); event.stopPropagation();
      if (!visible() || active) return;
      try { selectParent?.(); refresh(); } catch (error) { report(error); }
    });
    listen(handle,'dragstart',event => {
      const sources = selectedUnits(), source = unit(getSelection());
      if (!visible() || !source || !sources.length || !sources.some(element => elementVisible(element) && withinViewport(rectFor(element))) || !targets(source).length || !event.dataTransfer) { event.preventDefault(); return; }
      event.stopPropagation();
      active = {source,sources,target:null,side:null,point:null}; handle.classList.add('dragging');
      parentButton.hidden = true;
      event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.clearData(); event.dataTransfer.setData('application/x-jjstar-block','move');
      notify(true);
      try { if (sources.length === 1) select(source); } catch (error) { event.preventDefault(); cancel(); report(error); return; }
      queueAutoScroll();
    });
    listen(doc,'dragover',event => {
      if (!active) return;
      event.preventDefault(); event.stopPropagation();
      if (!visible()) { cancel(); return; }
      event.dataTransfer.dropEffect = 'move'; updatePoint({x:event.clientX,y:event.clientY}); queueAutoScroll();
    },true);
    listen(doc,'drop',event => {
      if (!active) return;
      event.preventDefault(); event.stopPropagation();
      if (visible()) updatePoint({x:event.clientX,y:event.clientY}); else clearLine();
      const {source,target,side} = active;
      const valid = !!target && targets(source).includes(target);
      cancel();
      if (!valid) return;
      try { move(source,target,side); } catch (error) { report(error); }
      refresh();
    },true);
    listen(doc,'dragend',cancel,true);
    listen(doc,'dragleave',event => {
      if (active && !event.relatedTarget) { active.point = null; clearLine(); }
    },true);
    listen(doc,'keydown',event => {
      if (active && event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); cancel(); }
    },true);
    listen(doc,'visibilitychange',() => { if (doc.hidden) cancel(); else refresh(); });
    listen(view,'pagehide',cancel);
    listen(view,'scroll',() => scheduleGeometry(),true);
    listen(view,'resize',() => scheduleGeometry(true));
    listen(root,'load',() => scheduleGeometry(true),true);
    listen(root,'error',() => scheduleGeometry(true),true);
    function destroy() {
      if (destroyed) return;
      destroyed = true; cancel();
      if (geometryFrame) view.cancelAnimationFrame(geometryFrame); geometryFrame = 0;
      listeners.forEach(remove => remove()); ui.remove();
    }
    refresh();
    return {refresh,cancel,destroy};
  }
  window.JJSTAR_EDITOR_BODY_DRAG = {create};
})();
