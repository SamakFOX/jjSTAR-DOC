// Content shared by the main viewer and popup. The menu tree owns overview links.
window.JJSTAR_CONTENT = (() => {
  const textCache = new Map();
  const escape = value => String(value).replace(/[&<>"']/g, char =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  function hiddenChildren(current) {
    return (current.children || []).flatMap(node => node.children
      ? node.children.filter(leaf => node.hideInNav || leaf.hideInNav)
      : node.hideInNav ? [node] : []).filter(node => node.enabled !== false);
  }

  function overview(current) {
    const inlineCodes = new Set(hiddenChildren(current).map(node => node.code));
    const list = nodes => `<ul>${nodes.filter(node => node.enabled !== false).map(node => `
      <li class="${node.children ? 'toctree-l1' : 'toctree-l2'}${inlineCodes.has(node.code) ? ' is-info' : ''}">
        <a href="${inlineCodes.has(node.code) ? '#' + escape(node.code) : escape(node.path)}" class="reference internal">
          <span class="menu-title">${escape(node.title)}</span>
          ${!node.children && node.guideStatus !== 'pending' ? '<span class="text-red-600 font-semibold"> *</span>' : ''}
          ${node.description ? `<span class="menu-desc">${escape(node.description)}</span>` : ''}
          ${node.guideStatus === 'pending' ? '<span class="menu-desc">상세 안내 준비 중</span>' : ''}
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

  function embeddedSection(html, current) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const target = template.content.querySelector(`#${CSS.escape(current.contentAnchor)}`);
    if (!target) throw new Error(`기존 안내 섹션을 찾을 수 없습니다: ${current.contentAnchor}`);
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
    return section.innerHTML;
  }

  function embeddedSections(html, current) {
    return (current.contentAnchors || [current.contentAnchor])
      .map(contentAnchor => embeddedSection(html, { ...current, contentAnchor })).join('\n');
  }

  async function fetchText(path, absoluteBase, signal) {
    const url = new URL(path, absoluteBase).href;
    if (signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
    if (textCache.has(url)) return textCache.get(url);
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`문서를 로드할 수 없습니다. (Status: ${response.status})`);
    const html = await response.text();
    textCache.set(url, html);
    return html;
  }

  function fragment(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }

  async function loadOverview(current, absoluteBase, signal) {
    const result = fragment(overview(current));
    const article = result.querySelector('article');
    const reads = new Map();
    const read = path => {
      if (!reads.has(path)) reads.set(path, fetchText(path, absoluteBase, signal));
      return reads.get(path);
    };
    const strings = window.JJSTAR_STRINGS?.[current.code];
    if (current.overviewPath) {
      const source = fragment(await read(current.overviewPath));
      const toc = source.querySelector('.toctree-wrapper');
      let root = toc?.parentElement;
      while (root && !root.querySelector('h1')) root = root.parentElement;
      if (root) {
        const prefix = document.createElement('div');
        for (const child of root.childNodes) {
          if (child === toc || (child.nodeType === 1 && child.contains(toc))) break;
          prefix.appendChild(child.cloneNode(true));
        }
        // Keep the source header, illustration and notes; replace its stale menu list.
        article.querySelector('nav').remove();
        article.querySelector('h1').remove();
        article.querySelector('.guide-lead').remove();
        prefix.querySelector('h1').textContent = current.title;
        article.prepend(...prefix.childNodes);
      }
    }
    let description = article.querySelector('.guide-lead, .page-description');
    if (!description) {
      description = document.createElement('p');
      description.className = 'guide-lead';
      description.textContent = '하위 메뉴를 선택하면 이용 안내를 확인할 수 있어요.';
      article.querySelector('h1').after(description);
    }
    if (description && strings?.desc) description.innerHTML = strings.desc;
    article.querySelectorAll('img:not([src]), img[src=""]').forEach(img => {
      if (strings?.heroImage) img.setAttribute('src', strings.heroImage);
      else img.remove();
    });
    const sections = await Promise.all(hiddenChildren(current).map(async node => {
      let body;
      if (node.guideStatus === 'pending') body = fragment(pending(node));
      else {
        const raw = await read(node.contentPath || node.path);
        body = fragment(node.contentAnchor ? embeddedSections(raw, node) : raw);
      }
      const block = document.createElement('section');
      block.className = 'mt-5 pt-5';
      block.id = node.code;
      // Section IDs live on their outer block; duplicated headings/IDs would break scrolling.
      body.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      body.querySelectorAll('nav, script, style, #direct-link').forEach(el => el.remove());
      body.querySelectorAll('.btn-direct').forEach(el => el.remove());
      const sourceHeading = body.querySelector('h1, h3');
      if (sourceHeading) sourceHeading.textContent = node.title;
      else {
        const heading = document.createElement('h3');
        heading.textContent = node.title;
        block.appendChild(heading);
      }
      if (!node.contentAnchor) {
        const desc = body.querySelector('.guide-lead, .page-description');
        const pageStrings = window.JJSTAR_STRINGS?.[node.code];
        if (desc && pageStrings?.desc) desc.innerHTML = pageStrings.desc;
      }
      body.querySelectorAll('img:not([src]), img[src=""]').forEach(img => img.remove());
      block.appendChild(body);
      return block;
    }));
    article.append(...sections);
    return article.outerHTML;
  }

  async function load(current, absoluteBase, signal) {
    let html;
    if (current.hideInNav && current.parentOverview) {
      html = await loadOverview(current.parentOverview, absoluteBase, signal);
    } else if (current.generatedOverview) {
      html = await loadOverview(current, absoluteBase, signal);
    } else if (current.guideStatus === 'pending') html = pending(current);
    else {
      html = await fetchText(current.contentPath || current.path, absoluteBase, signal);
      if (current.contentAnchor) html = `<article class="guide-article" no-image>
        <nav id="auto-breadcrumb" class="flex items-center gap-2 text-sm mb-8 text-gray-500"></nav>
        <h1>${escape(current.title)}</h1>${embeddedSections(html, current)}</article>`;
    }
    return html.replace(/src="(?!https?:|data:|\/\/)([^"]*)"/g, (_, path) =>
      `src="${new URL(path.replace(/^(\.\.\/)+/, ''), absoluteBase).href}"`);
  }

  return { load, overview, pending, hiddenChildren };
})();
