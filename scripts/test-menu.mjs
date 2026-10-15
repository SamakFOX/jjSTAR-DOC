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
assert.equal(groups.length, 42);
assert.equal(leaves.length, 165);
assert.equal(new Set(all.map(n => n.code)).size, all.length);
assert.equal(new Set(all.map(n => n.path)).size, all.length);
for (const field of ['title', 'miniLabel', 'code', 'path', 'enabled']) {
  assert.ok(all.every(n => Object.hasOwn(n, field)), `Missing legacy field: ${field}`);
}
assert.equal(new Set(leaves.map(leaf => leaf.sourceDomId)).size, leaves.length);
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
  assert.match(leaf.sourceDomId, /^M\d+$/);
  assert.notEqual(leaf.code, leaf.sourceDomId);
  assert.ok(Object.hasOwn(leaf, 'hideInNav'));
  if (leaf.guideStatus === 'existing') assert.ok(fs.existsSync(leaf.path));
  if (leaf.guideStatus === 'embedded') {
    assert.ok(fs.readFileSync(leaf.contentPath, 'utf8').includes(`id="${leaf.contentAnchor}"`));
  }
}
const content = context.window.JJSTAR_CONTENT;
const paths = new Set(all.map(n => n.path));
for (const overview of [...service, ...groups]) {
  const html = content.overview(overview);
  const inline = new Set(content.hiddenChildren(overview).map(node => node.code));
  if (overview.overviewPath) assert.ok(fs.existsSync(overview.overviewPath));
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    assert.ok(paths.has(match[1]) || (match[1].startsWith('#') && inline.has(match[1].slice(1))));
  }
  for (const child of overview.children) {
    assert.ok(html.includes(inline.has(child.code) ? '#' + child.code : child.path), `Missing child: ${child.code}`);
  }
}
for (const leaf of leaves.filter(n => n.guideStatus !== 'embedded')) {
  const before = requests;
  const html = await content.load(leaf, 'https://example.test/guide/');
  if (leaf.guideStatus === 'pending') {
    assert.equal(requests, before, 'Pending guide must not request a nonexistent file');
    assert.ok(html.includes('상세 이용 안내는 준비 중'));
  } else assert.ok(requests === before || requests === before + 1);
}
const search = context.window.JJSTAR_SEARCH;
const aliasResult = search.filterMenu(menu, 'SUPER STAR');
assert.equal(aliasResult.length, 1);
assert.equal(aliasResult[0].title, 'My Page');
assert.equal(aliasResult[0].children.flatMap(n => n.children).length, 14);
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
assert.equal(groups.find(node => node.code === 'L03INFO').overviewPath, 'pages/L03STMG.html');
assert.ok(groups.find(node => node.code === 'L03SCHL').children.find(node => node.code === 'L04SCHN').hideInNav);
console.log(`PASS: 7/42/165 hierarchy${source ? ' and external source reconciliation' : ''}, unique routes, 49 overview link specifications, ${requests} existing guide loads, pending routes, source anchors, alias/Korean/special-character search, syntax. Use scripts/menu-browser-check.html to verify rendered embeds.`);
