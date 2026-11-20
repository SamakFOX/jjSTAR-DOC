import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./editor.js', import.meta.url), 'utf8');
const helpers = source.slice(source.indexOf('  async function request('), source.indexOf('  function blocks('));
const saveFunction = source.slice(source.indexOf('  async function saveDocument('), source.indexOf('  $(\'save\').onclick = saveDocument;'));
const loadFunction = source.slice(source.indexOf('  async function load('), source.indexOf('  function readable('));
const shortcutFunction = source.slice(source.indexOf('  function shortcut('), source.indexOf('  document.querySelectorAll(\'[data-format]\')'));
const response = (status, value, raw = false) => ({
  status, ok: status >= 200 && status < 300,
  text: async () => raw ? value : JSON.stringify(value)
});

function setup(queue) {
  const calls = [], messages = [], nodes = {
    save: {disabled: false}, review: {disabled: false}, pages: {value: ''},
    reviewDialog: {closed: 0, close() { this.closed++; }}
  };
  const draft = [{id: '4', html: '수정한 문구', gapBefore: 0, gapAfter: 0, tipBox: false}];
  const context = vm.createContext({
    config: {token: 'old-token'}, state: {path: 'pages/L04CHECK.html', versions: {page: 'old'}},
    doc: {marker: 'original-document'}, busy: false,
    frame: {srcdoc: 'original-frame', contentWindow: {scrollY: 120, scrollTo() {}}},
    changes: () => draft, status: (...args) => messages.push(args), $: id => nodes[id],
    load: async () => true,
    fetch: async (url, options) => {
      calls.push({url, options});
      const next = queue.shift();
      if (next instanceof Error) throw next;
      assert.ok(next, `Unexpected request: ${url}`);
      return next;
    }
  });
  vm.runInContext(helpers + saveFunction, context);
  return {context, calls, messages, nodes, draft};
}

let checks = 0;
async function test(name, run) {
  await run(); checks++;
  console.log('PASS: ' + name);
}

await test('403 refreshes the token and retries the identical payload once', async () => {
  const t = setup([response(403, {error: '연결 만료'}), response(200, {token: 'new-token'}), response(200, {saved: 1})]);
  const payload = {path: 'pages/L04CHECK.html', versions: {a: 'v1'}, changes: t.draft};
  assert.equal((await t.context.saveChanges(payload)).saved, 1);
  assert.deepEqual(t.calls.map(c => c.url), ['/__editor/save', '/__editor/config', '/__editor/save']);
  assert.equal(t.calls[0].options.body, t.calls[2].options.body);
  assert.equal(t.calls[0].options.headers['X-Editor-Token'], 'old-token');
  assert.equal(t.calls[2].options.headers['X-Editor-Token'], 'new-token');
  assert.equal(payload.changes, t.draft);
});

await test('a repeated 403 stops after the single refresh', async () => {
  const t = setup([response(403, {error: '연결 만료'}), response(200, {token: 'new-token'}), response(403, {error: '접근 거부'})]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), error => error.status === 403 && /접근 거부/.test(error.message));
  assert.equal(t.calls.length, 3);
});

await test('409 conflicts remain blocked without refreshing or retrying', async () => {
  const t = setup([response(409, {error: '다른 창에서 파일이 변경됐어요'})]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), error => error.status === 409 && /다른 창/.test(error.message));
  assert.equal(t.calls.length, 1);
});

await test('file access denial remains a single failed write', async () => {
  const t = setup([response(400, {code: 'FILE_ACCESS_DENIED', error: '파일 쓰기 권한이 없어요'})]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), error => error.status === 400 && error.code === 'FILE_ACCESS_DENIED');
  assert.equal(t.calls.length, 1);
});

await test('an HTML 403 cannot trigger an authentication retry', async () => {
  const t = setup([response(403, '<html>access denied</html>', true)]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), error => error.status === 403 && /HTTP 403/.test(error.message));
  assert.equal(t.calls.length, 1);
});

await test('network failures never retry a potentially completed write', async () => {
  const t = setup([new Error('network disconnected')]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), /network disconnected/);
  assert.equal(t.calls.length, 1);
});

await test('a failed token refresh does not send a second write', async () => {
  const t = setup([response(403, {error: '연결 만료'}), new Error('refresh disconnected')]);
  await assert.rejects(t.context.saveChanges({changes: t.draft}), /refresh disconnected/);
  assert.deepEqual(t.calls.map(c => c.url), ['/__editor/save', '/__editor/config']);
});

await test('HTML error responses retain the HTTP status with a readable error', async () => {
  const t = setup([response(500, '<html>server failure</html>', true)]);
  await assert.rejects(t.context.request('/__editor/page'), error => error.status === 500 && /HTTP 500/.test(error.message) && !/Unexpected token|<html>/.test(error.message));
});

await test('empty responses retain the HTTP status with a readable error', async () => {
  const t = setup([response(200, '', true)]);
  await assert.rejects(t.context.request('/__editor/page'), error => error.status === 200 && /응답이 비어/.test(error.message));
});

await test('a failed preview fetch preserves the previous document and draft', async () => {
  const t = setup([response(503, {error: '미리보기 일시 중지'})]);
  const oldDocument = t.context.doc, oldState = t.context.state;
  vm.runInContext(loadFunction, t.context);
  assert.equal(await t.context.load('pages/L04CHECK.html', true), false);
  assert.equal(t.context.doc, oldDocument);
  assert.equal(t.context.state, oldState);
  assert.equal(t.context.frame.srcdoc, 'original-frame');
  assert.equal(t.context.changes(), t.draft);
  assert.equal(t.context.busy, false);
});

await test('a successful write followed by preview failure stays a successful write', async () => {
  const t = setup([response(200, {saved: 1, backup: 'outputs/backup'})]);
  t.context.load = async () => false;
  const oldDocument = t.context.doc;
  await t.context.saveDocument();
  assert.equal(t.calls.length, 1);
  assert.match(t.messages.at(-1)[0], /원본 파일 저장 완료.*미리보기를 다시 불러오지 못/);
  assert.equal(t.context.doc, oldDocument);
  assert.equal(t.context.changes(), t.draft);
  assert.equal(t.context.busy, false);
  assert.equal(t.nodes.save.disabled, false);
});

await test('scroll restoration failure cannot retry or mislabel the completed write', async () => {
  const t = setup([response(200, {saved: 1})]);
  t.context.frame.contentWindow.scrollTo = () => { throw new Error('scroll unavailable'); };
  await t.context.saveDocument();
  assert.equal(t.calls.length, 1);
  assert.match(t.messages.at(-1)[0], /원본 파일 저장 완료.*스크롤 위치/);
});

await test('scroll position read failure cannot prevent saving', async () => {
  const t = setup([response(200, {saved: 1})]);
  let restoredY;
  Object.defineProperty(t.context.frame.contentWindow, 'scrollY', {get() { throw new Error('access denied'); }});
  t.context.frame.contentWindow.scrollTo = (_, y) => { restoredY = y; };
  await t.context.saveDocument();
  assert.equal(t.calls.length, 1);
  assert.equal(restoredY, 0);
  assert.match(t.messages.at(-1)[0], /^저장 완료/);
});

await test('unexpected preview errors after saving are reported separately', async () => {
  const t = setup([response(200, {saved: 1})]);
  t.context.load = async () => { throw new Error('preview unavailable'); };
  await t.context.saveDocument();
  assert.equal(t.calls.length, 1);
  assert.match(t.messages.at(-1)[0], /원본 파일 저장 완료.*미리보기 갱신.*preview unavailable/);
});

await test('an in-flight save ignores a second save action', async () => {
  const t = setup([]); t.context.busy = true;
  await t.context.saveDocument();
  assert.equal(t.calls.length, 0);
});

await test('saving blocks editing shortcuts and the browser save dialog', async () => {
  const t = setup([]); t.context.busy = true;
  vm.runInContext(shortcutFunction, t.context);
  for (const key of ['s', 'z', 'y', 'b']) {
    let prevented = false;
    t.context.shortcut({ctrlKey: true, key, preventDefault() { prevented = true; }});
    assert.equal(prevented, true, key);
  }
  assert.equal(t.calls.length, 0);
});

await test('structural layout is saved together with the same document versions', async () => {
  const t = setup([response(200, {saved: 1, backup: 'outputs/backup'})]);
  const layout = [{id:'r0'}, {id:'new-1',html:'<p>새 문단</p>'}];
  t.context.structure = {layout:() => layout, changed:() => true, refresh() {}};
  await t.context.saveDocument();
  const payload = JSON.parse(t.calls[0].options.body);
  assert.deepEqual(payload.layout, layout);
  assert.equal(payload.path, 'pages/L04CHECK.html');
  assert.deepEqual(payload.versions, {page:'old'});
  assert.equal(t.calls.length, 1);
});

await test('unchanged structure does not rewrite the original source layout', async () => {
  const t = setup([response(200, {saved: 1})]);
  t.context.structure = {layout:() => undefined, changed:() => false, refresh() {}};
  await t.context.saveDocument();
  assert.equal('layout' in JSON.parse(t.calls[0].options.body), false);
});

await test('a structural save failure keeps the full layout draft and review action', async () => {
  const t = setup([response(409, {error:'다른 창에서 파일이 변경됐어요'})]);
  const layout = [{id:'r0'}, {id:'new-1',html:'<figure><img src="assets/images/example.webp"></figure>'}];
  const structure = {layout:() => layout, changed:() => true, refresh() {}};
  t.context.structure = structure;
  t.context.changes = () => [];
  let loaded = false; t.context.load = async () => { loaded = true; };
  await t.context.saveDocument();
  assert.equal(t.context.structure, structure);
  assert.equal(t.context.structure.layout(), layout);
  assert.equal(loaded, false);
  assert.equal(t.nodes.review.disabled, false);
  assert.equal(t.calls.length, 1);
});

console.log(`PASS: ${checks} saving checks`);
