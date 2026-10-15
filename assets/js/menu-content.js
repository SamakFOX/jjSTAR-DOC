// Content shared by the main viewer and popup. The menu tree owns overview links.
window.JJSTAR_CONTENT = (() => {
  const escape = value => String(value).replace(/[&<>"']/g, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  function overview(current) {
    const list = nodes => `<ul>${nodes.filter(node => node.enabled !== false).map(node => `
      <li class="${node.children ? 'toctree-l1' : 'toctree-l2'}">
        <a href="${escape(node.path)}" class="reference internal">
          <span class="menu-title">${escape(node.title)}</span>
          ${node.guideStatus === 'pending' ? '<span class="menu-desc">안내 준비 중</span>' : ''}
        </a>
        ${node.children ? list(node.children) : ''}
      </li>`).join('')}</ul>`;
    return `<article class="guide-article" no-image>
      <nav id="auto-breadcrumb" class="flex items-center gap-2 text-sm mb-8 text-gray-500"></nav>
      <h1>${escape(current.title)}</h1>
      <p class="guide-lead">하위 메뉴를 선택하면 이용 안내를 확인할 수 있어요.</p>
      <section class="rst-content"><div class="toctree-wrapper">${list(current.children || [])}</div></section>
    </article>`;
  }

  function pending(current) {
    return `<article class="guide-article" no-image>
      <nav id="auto-breadcrumb" class="flex items-center gap-2 text-sm mb-8 text-gray-500"></nav>
      <h1>${escape(current.title)}</h1>
      <p>${(current.sourceMenuPath || []).map(escape).join(' &gt; ')}</p>
      <div class="tip-box"><p>이 메뉴의 상세 이용 안내는 준비 중이에요.</p></div>
    </article>`;
  }

  function embedded(html, current) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const target = template.content.querySelector(`#${CSS.escape(current.contentAnchor)}`);
    if (!target) return pending(current);
    // Existing embedded guides use either a section ID or an H3 inside a title row.
    const start = /^H[1-6]$/.test(target.tagName) ? target.parentElement : target;
    const section = document.createElement('section');
    let node = start;
    while (node) {
      if (node !== start && (node.matches('.section-sticky-return, .guide-spacer-v')
        || node.querySelector('h3[id^="L04"]'))) break;
      section.appendChild(node.cloneNode(true));
      if (start.tagName === 'SECTION') break;
      node = node.nextElementSibling;
    }
    section.querySelectorAll('a[href="#"]').forEach(link => {
      if (link.classList.contains('btn-direct-mini')) link.remove();
      else link.replaceWith(...link.childNodes);
    });
    return `<article class="guide-article" no-image>
      <nav id="auto-breadcrumb" class="flex items-center gap-2 text-sm mb-8 text-gray-500"></nav>
      <h1>${escape(current.title)}</h1>${section.innerHTML}</article>`;
  }

  async function load(current, absoluteBase, signal) {
    if (current.generatedOverview) return overview(current);
    if (current.guideStatus === 'pending') return pending(current);
    const response = await fetch(new URL(current.contentPath || current.path, absoluteBase), { signal });
    if (!response.ok) throw new Error(`문서를 로드할 수 없습니다. (Status: ${response.status})`);
    let html = await response.text();
    if (current.contentAnchor) html = embedded(html, current);
    return html.replace(/src="(?!https?:|data:|\/\/)([^"]*)"/g, (_, path) =>
      `src="${new URL(path.replace(/^(\.\.\/)+/, ''), absoluteBase).href}"`);
  }

  return { load, overview, pending };
})();
