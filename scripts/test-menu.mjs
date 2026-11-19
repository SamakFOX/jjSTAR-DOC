import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

let requests = 0;
const context = { window: {}, URL, fetch: async url => {
  requests++;
  const path = new URL(url).pathname.replace('/guide/', '');
  assert.ok(fs.existsSync(path), `Unexpected missing-file request: ${path}`);
  return { ok: true, text: async () => fs.readFileSync(path, 'utf8') };
} };
vm.createContext(context);
for (const file of ['data/menu.js', 'data/strings.js', 'assets/js/search.js', 'assets/js/menu-content.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
}
const menu = context.window.JJSTAR_MENU;
const service = menu.slice(1);
const groups = service.flatMap(cat => cat.children);
const leaves = groups.flatMap(mid => mid.children);
const all = menu.flatMap(cat => [cat, ...cat.children.flatMap(mid => [mid, ...(mid.children || [])])]);
// An external extraction can optionally be supplied for source reconciliation.
// The normal check must work in a fresh clone without local analysis outputs.
const source = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) : null;
assert.equal(service.length, 7);
assert.equal(groups.length, 43);
assert.equal(leaves.length, 195);
assert.equal(new Set(all.map(n => n.code)).size, all.length);
assert.equal(new Set(all.map(n => n.path)).size, all.length);
for (const field of ['title', 'miniLabel', 'code', 'path', 'enabled']) {
  assert.ok(all.every(n => Object.hasOwn(n, field)), `Missing legacy field: ${field}`);
}
const identified = leaves.filter(leaf => leaf.sourceDomId);
assert.equal(new Set(identified.map(leaf => leaf.sourceDomId)).size, identified.length);
for (const cat of service) {
  for (const mid of cat.children) {
    for (const leaf of mid.children) {
      assert.equal(JSON.stringify(leaf.sourceMenuPath), JSON.stringify([cat.title, mid.title, leaf.title]));
    }
  }
}
if (source) assert.equal(source.menus.length, leaves.length);
for (const [i, leaf] of leaves.entries()) {
  if (source) {
    assert.equal(leaf.sourceDomId, source.menus[i].domId);
    assert.equal(JSON.stringify(leaf.sourceMenuPath), JSON.stringify(source.menus[i].menuPath));
    assert.equal(leaf.title, source.menus[i].title);
  }
  if (leaf.sourceDomId) assert.match(leaf.sourceDomId, /^M\d+$/);
  assert.notEqual(leaf.code, leaf.sourceDomId);
  assert.ok(Object.hasOwn(leaf, 'hideInNav'));
  assert.equal(leaf.directUrl, 'https://jjstar.jj.ac.kr/');
  if (leaf.guideStatus === 'existing') assert.ok(fs.existsSync(leaf.path));
  if (leaf.guideStatus === 'embedded') {
    for (const anchor of leaf.contentAnchors || [leaf.contentAnchor]) {
      assert.ok(fs.readFileSync(leaf.contentPath, 'utf8').includes(`id="${anchor}"`));
    }
  }
}
const content = context.window.JJSTAR_CONTENT;
const paths = new Set(all.map(n => n.path));
const expectedExternalUrls = {
  L04CYBR: "https://jjstar.jj.ac.kr/",
  L04LIBR: "https://jjstar.jj.ac.kr/",
  L04COLG: "https://jjstar.jj.ac.kr/",
  L04DPHP: "https://jjstar.jj.ac.kr/",
  L04GRAD: "https://graduate.jj.ac.kr/graduate/index.do",
  L04FOOD: "https://jj.ac.kr/jj/campuslife/food.do",
  L04MAIL: "https://jjstar.jj.ac.kr/",
  L04MS65: "https://jjstar.jj.ac.kr/",
  L04RMOT: "https://jjstar.jj.ac.kr/",
  L04APOC: "https://jjstar.jj.ac.kr/",
  L04MDWN: "https://jjstar.jj.ac.kr/",
  L04CEGD: 'http://jj.webminwon.kr/',
  L04CEIS: 'http://jj.webminwon.kr/',
  L04CEHI: 'http://jj.webminwon.kr/',
  L04WEBG: 'https://docs.jjstar.site/',
  L04PDFG: 'https://jjstar.jj.ac.kr/upload/univGuide.pdf',
  L04BASK: 'https://sugang.jj.ac.kr/',
  L04ENRA: 'https://sugang.jj.ac.kr/',
  L04AHAL: 'https://aha.jj.ac.kr/',
  L04QNAA: 'https://www.jj.ac.kr/jj/community/itbaro.do?mode=list',
  L04PSYC: 'https://happyjcc.jj.ac.kr/happyjcc/test/test01.do',
  L04PSCN: 'https://happyjcc.jj.ac.kr/happyjcc/counsel/individual02.do'
};
const detailedExternalCodes = new Set(['L04QNAA', 'L04PSYC', 'L04PSCN']);
const externalUrls = new Set(Object.values(expectedExternalUrls));
assert.equal(leaves.filter(node => node.externalUrl).length, Object.keys(expectedExternalUrls).length);
for (const [code, url] of Object.entries(expectedExternalUrls)) {
  const node = leaves.find(leaf => leaf.code === code);
  assert.equal(node.externalUrl, url);
  assert.equal(node.hideInNav, !detailedExternalCodes.has(code));
  if (detailedExternalCodes.has(code)) assert.equal(node.linkOnly, false);
  assert.match(node.description, /[가-힣]/);
  const group = groups.find(mid => mid.children.some(leaf => leaf.code === code));
  assert.ok(!content.hiddenChildren(group).some(leaf => leaf.code === code));
  const row = content.overview(group).match(new RegExp(`<li id="${code}"[\\s\\S]*?</li>`))?.[0];
  assert.ok(row?.includes(`href="${url}" class="reference external" target="_blank" rel="noopener"`));
  assert.ok(row.includes(node.description));
  assert.ok(!row.includes('guide-required-marker') && !row.includes('<img'));
}
for (const overview of [...service, ...groups]) {
  const html = content.overview(overview);
  const inline = new Set(content.hiddenChildren(overview).map(node => node.code));
  if (overview.overviewPath) assert.ok(fs.existsSync(overview.overviewPath));
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    assert.ok(paths.has(match[1]) || externalUrls.has(match[1]) || (match[1].startsWith('#') && inline.has(match[1].slice(1))));
  }
  for (const child of overview.children) {
    assert.ok(html.includes(child.externalUrl || (inline.has(child.code) ? '#' + child.code : child.path)), `Missing child: ${child.code}`);
  }
}
for (const leaf of leaves.filter(n => n.guideStatus !== 'embedded')) {
  const before = requests;
  const html = await content.load(leaf, 'https://example.test/guide/');
  assert.ok(!html.includes('usage-draft') && !html.includes('data-usage-menu'), `Inspection hint remains: ${leaf.code}`);
  if (leaf.externalUrl && leaf.linkOnly !== false) {
    assert.equal(requests, before, 'External link must not fetch the old detailed guide');
    assert.ok(html.includes(leaf.externalUrl) && !html.includes('<img') && !html.includes('btn-direct'));
  } else if (leaf.externalUrl && leaf.linkOnly === false) {
    assert.ok(requests === before || requests === before + 1);
    assert.ok(html.includes(`href="${leaf.externalUrl}" id="direct-link" class="btn-direct"`));
    const original = fs.readFileSync(leaf.path, 'utf8');
    assert.equal((html.match(/<img\b/g) || []).length, (original.match(/<img\b/g) || []).length);
    for (const match of original.matchAll(/<(p|h[1-6]|figcaption)\b[^>]*>[\s\S]*?<\/\1>/gi)) {
      assert.ok(html.includes(match[0]), `Existing guide prose changed: ${leaf.code}`);
    }
    for (const match of original.matchAll(/\bsrc="([^"]+)"/g)) {
      assert.ok(html.includes(new URL(match[1], 'https://example.test/guide/').href), `Existing guide image lost: ${leaf.code}`);
    }
    const group = groups.find(mid => mid.children.some(node => node.code === leaf.code));
    const withParent = await content.load({ ...leaf, parentOverview: group }, 'https://example.test/guide/');
    assert.equal(withParent, html, `Navigation must retain the detailed guide: ${leaf.code}`);
  } else if (leaf.guideStatus === 'pending') {
    assert.equal(requests, before, 'Pending guide must not request a nonexistent file');
    assert.ok(html.includes('상세 이용 안내는 준비 중'));
  } else assert.ok(requests === before || requests === before + 1);
}
const search = context.window.JJSTAR_SEARCH;
const aliasResult = search.filterMenu(menu, 'SUPER STAR');
assert.equal(aliasResult.length, 1);
assert.equal(aliasResult[0].title, 'My Page');
assert.equal(aliasResult[0].children.flatMap(n => n.children).length, 16);
for (const query of ['ㅈㅎ', '장학', 'RC설문', '전과전공 시뮬레이션', 'JJKECO']) {
  assert.ok(search.filterMenu(menu, query).length, `Missing search result: ${query}`);
}
for (const char of ['[', ']', '(', ')', '\\', '*', '+', '?', '.', '$', '^', '{', '}', '|']) {
  assert.equal(search.highlightText(`a${char}b`, char), `a<mark class="search-highlight">${char}</mark>b`);
}
const html = fs.readFileSync('index.html', 'utf8');
for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  if (!/src=/.test(match[1])) new vm.Script(match[2], { filename: 'index.html' });
}
assert.ok(!html.includes('pages/L01HOME.html'));
assert.ok(!content.pending({ title: '<script>', sourceMenuPath: ['<img>'] }).includes('<script>'));
const markerHtml = content.overview({ title: 'Test', children: [{ title: '긴 메뉴 제목', path: 'pages/example.html', guideStatus: 'existing' }] });
assert.match(markerHtml, /class="menu-title">긴 메뉴 <span class="menu-title-end">제목<sup class="guide-required-marker"/);
assert.equal(groups.find(node => node.code === 'L03STMG').title, '정보조회');
assert.equal(groups.find(node => node.code === 'L03STMG').overviewPath, 'pages/L03STMG.html');
assert.ok(groups.find(node => node.code === 'L03SCHL').children.find(node => node.code === 'L04SCHN').hideInNav);
// Independent placement expectations from the September change history and October final list.
const placements = [
  ['M000020405', 'L04EDCR', 'STAR 지원', '정보조회'],
  ['M000020509', 'L04NCSJ', '진로개발 및 상담', '직무탐색'],
  ['M000021786', 'L04CPRA', '학사정보', '사회봉사'],
  ['M000021787', 'L04CPRH', '학사정보', '사회봉사'],
  ['M000021784', 'L04AHAL', '학사정보', '수강관리'],
  ['M000020073', 'L04OVAP', '학사정보', '해외봉사'],
  ['M000020074', 'L04OVCK', '학사정보', '해외봉사'],
  ['M000020075', 'L04OVRP', '학사정보', '해외봉사'],
  ['M000020461', 'L04MJDG', '역량강화', '전공역량'],
  ['M000020477', 'L04SUPE', '역량강화', 'SUPER 핵심역량'],
  ['M000019985', 'L04BUSA', '대학생활', '통학버스'],
  ['M000020002', 'L04DMAP', '대학생활', '학생생활관'],
  ['M000020164', 'L04INDC', '대학생활', '산학협력활동'],
  ['M000020126', 'L04CPAG', '대학생활', '캡스톤디자인'],
  ['M000020404', 'L04HMJR', 'My Page', '나의정보'],
  ['M000020439', 'L04DEPT', 'My Page', '나의정보'],
  ['M000020444', 'L04PAPR', 'My Page', '나의정보'],
  ['M000020468', 'L04AWIN', 'My Page', '수상·인증 내역']
];
for (const [domId, code, category, group] of placements) {
  const leaf = leaves.find(node => node.sourceDomId === domId);
  assert.equal(leaf?.code, code, `Historical code mapping: ${domId}`);
  assert.equal(leaf.sourceMenuPath[0], category);
  assert.equal(leaf.sourceMenuPath[1], group);
}
const course = leaves.find(node => node.code === 'L04EDCR');
const catalog = leaves.find(node => node.code === 'L04EDCRB');
assert.equal(catalog.hideInNav, false);
assert.equal(catalog.guideStatus, 'existing');
assert.ok(!catalog.contentAnchor && !catalog.contentPath);
assert.ok(!content.hiddenChildren(groups.find(node => node.code === 'L03STMG')).some(node => node.code === catalog.code));
assert.ok(/(?:연도|년도)[\s\S]*?선택/.test(fs.readFileSync(catalog.path, 'utf8')));
assert.ok(course.hideInNav && course.guideStatus === 'embedded');
assert.equal(course.contentAnchor, 'L04EDCR');
assert.ok(!leaves.some(node => node.code === 'L04CURV'));
const starT = leaves.find(node => node.code === 'L04STGD');
assert.equal(JSON.stringify(starT.contentAnchors), JSON.stringify(['L043CAT', 'L04TRCK', 'L04STPG', 'L04STBF']));
assert.ok(search.filterMenu(menu, 'NCS').flatMap(cat => cat.children.flatMap(mid => mid.children)).some(node => node.code === 'L04NCSJ'));
assert.ok(search.filterMenu(menu, 'star관리').some(cat => cat.children.some(mid => mid.code === 'L03STMG')));
vm.runInContext(fs.readFileSync('assets/js/menu-views.js', 'utf8'), context);
const visible = context.window.JJSTAR_MENU_VIEWS.select(menu, '').menu;
const shownCodes = new Set(visible.flatMap(cat => cat.children.flatMap(group => group.children || [group])).map(n => n.code));
for (const code of detailedExternalCodes) {
  assert.ok(shownCodes.has(code), `Detailed external guide hidden from navigation: ${code}`);
  const node = leaves.find(leaf => leaf.code === code);
  const found = search.filterMenu(menu, node.title).flatMap(cat => cat.children.flatMap(mid => mid.children || [])).some(leaf => leaf.code === code);
  assert.ok(found, `Detailed external guide missing from search: ${code}`);
}
for (const code of ['L04BEST', 'L04MYCP', 'L04STID', 'L04DBMJ', 'L04READ', 'L04SDMJ', 'L04PLEX', 'L04LVLB', 'L04LCVT', 'L04OPTB']) {
  assert.ok(leaves.some(n => n.code === code), `Retained menu missing: ${code}`);
}
for (const code of ['L04BEST', 'L04STID', 'L04DBMJ', 'L04READ', 'L04PLEX', 'L04LVLB', 'L04LCVT', 'L04OPTB']) {
  assert.ok(!shownCodes.has(code), `Retained menu shown: ${code}`);
}
for (const code of ['L04MYCP', 'L04SDMJ']) {
  assert.ok(shownCodes.has(code), `Completed retained guide hidden: ${code}`);
}
const generalNotice = leaves.find(node => node.code === 'L04GNNT');
assert.equal(generalNotice.contentPath, 'pages/L03CMTY.html');
assert.equal(generalNotice.contentAnchor, 'L04GNNT');
assert.equal(generalNotice.showDirectLink, false);
const generalNoticeWithoutExtraction = await content.load({ ...generalNotice, contentAnchor: undefined }, 'https://example.test/guide/');
assert.ok(!generalNoticeWithoutExtraction.includes('btn-direct'));
const generalNoticeSource = fs.readFileSync(generalNotice.contentPath, 'utf8');
const generalNoticeSection = generalNoticeSource.match(/<section\b[^>]*id="L04GNNT"[\s\S]*?<\/section>/)?.[0];
assert.ok(generalNoticeSection);
assert.equal((generalNoticeSection.match(/<img\b/g) || []).length, 1);
assert.ok(!/<p\b|btn-direct|<h[1-6]\b/.test(generalNoticeSection));
for (const code of ['L04SVNT', 'L04OVNT', 'L04DMNT']) {
  const notice = leaves.find(node => node.code === code);
  assert.equal(notice.showDirectLink, false);
  assert.equal(notice.guideStatus, 'embedded');
  const raw = fs.readFileSync(notice.contentPath, 'utf8');
  const anchor = raw.indexOf('id="' + code + '"');
  const start = raw.lastIndexOf('<section', anchor);
  const end = raw.indexOf('</section>', anchor);
  assert.ok(anchor >= 0 && start >= 0 && end > start, code);
  const section = raw.slice(start, end + 10);
  assert.equal((section.match(/<img\b/g) || []).length, 1);
  assert.equal((section.match(/<figcaption\b/g) || []).length, 1);
  assert.ok(!/<p\b|btn-direct|<h[1-6]\b/.test(section));
}
assert.ok(!shownCodes.has('L04EDCRB') && !shownCodes.has('L04SGGD'));
assert.ok(leaves.some(n => n.code === 'L04NCRD'));
assert.ok(leaves.some(n => n.code === 'L04NVCR'));
assert.notEqual(leaves.find(n => n.code === 'L04BEST').path, leaves.find(n => n.code === 'L04CRAP').path);
assert.ok(!leaves.some(n => /서베이|Survey|Micro/.test(n.title)));

const busGuide = leaves.find(node => node.code === 'L04BUSI');
assert.equal(busGuide.sourceDomId, 'M000019986');
assert.equal(busGuide.contentPath, 'pages/L03BUSS.html');
assert.equal(busGuide.contentAnchor, 'L04BUSI');
assert.equal(busGuide.guideStatus, 'embedded');
assert.equal(JSON.stringify(groups.find(node => node.code === 'L03BUSS').children.map(node => node.code)), JSON.stringify(['L04BUSM', 'L04BUSA', 'L04BUSI']));
assert.ok(shownCodes.has('L04GTWY'), 'Completed guide hidden: L04GTWY');
assert.ok(shownCodes.has('L04TRAP'), 'Completed guide hidden: L04TRAP');
console.log(`PASS: 7/43/195 hierarchy${source ? ' and external source reconciliation' : ''}, unique routes, overview links, ${requests} existing guide loads, retained menu visibility, distinct recommendation routes, source anchors, search, syntax.`);
