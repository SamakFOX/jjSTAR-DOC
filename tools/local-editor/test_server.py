import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('local_editor', Path(__file__).with_name('server.py'))
editor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(editor)


class EditorTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.original_root = editor.ROOT
        editor.ROOT = Path(self.temp.name)
        (editor.ROOT / 'pages').mkdir()
        (editor.ROOT / 'data').mkdir()
        self.source = '<article>\r\n<h1>제목</h1>\r\n<p>소개</p>\r\n<p>선택한 <span class="guide-button-label">저장</span> 버튼</p>\r\n</article>\r\n'
        self.page = editor.ROOT / 'pages/L04CHECK.html'
        self.page.write_bytes(self.source.encode())
        self.strings = 'window.JJSTAR_STRINGS = {\n"L04CHECK": {\n"desc": "별도 소개",\n"btnText": "바로가기"\n}\n};\n'
        (editor.ROOT / 'data/strings.js').write_bytes(self.strings.encode())

    def tearDown(self):
        editor.ROOT = self.original_root
        self.temp.cleanup()

    def payload(self, state, block, markup):
        return dict(path=state['path'], versions=state['versions'], changes=[dict(id=block['id'], html=markup)])

    def test_source_preserved_and_backup(self):
        state = editor.prepare('pages/L04CHECK.html')
        block = state['blocks'][-1]
        replacement = '변경한 <strong>문구</strong>'
        result = editor.save(self.payload(state, block, replacement))
        expected = self.source[:block['start']] + replacement + self.source[block['end']:]
        self.assertEqual(self.page.read_bytes(), expected.encode())
        self.assertEqual((editor.ROOT / result['backup'] / 'pages/L04CHECK.html').read_bytes(), self.source.encode())

    def test_central_description(self):
        state = editor.prepare('pages/L04CHECK.html')
        block = next(b for b in state['blocks'] if b['target'] == 'data/strings.js')
        self.assertEqual(block['html'], '별도 소개')
        editor.save(self.payload(state, block, '<strong>새 소개</strong>'))
        self.assertEqual(self.page.read_bytes(), self.source.encode())
        expected = self.strings[:block['start']] + json.dumps('<strong>새 소개</strong>', ensure_ascii=False) + self.strings[block['end']:]
        self.assertEqual(editor.read(editor.ROOT / 'data/strings.js'), expected)

    def test_external_change_conflict(self):
        state = editor.prepare('pages/L04CHECK.html')
        self.page.write_bytes((self.source + '<!-- 수정 -->').encode())
        with self.assertRaises(FileExistsError):
            editor.save(self.payload(state, state['blocks'][0], '덮어쓰기'))
        self.assertIn('수정', editor.read(self.page))

    def test_no_nested_edit_blocks(self):
        state = editor.prepare('pages/L04CHECK.html')
        self.assertEqual(len(state['blocks']), 3)
        self.assertEqual(state['html'].count('data-local-block='), 3)

    def test_reject_path_and_markup(self):
        for path in ['../index.html', 'data/strings.js', 'pages/../index.html', '/pages/L04CHECK.html']:
            with self.assertRaises(ValueError): editor.prepare(path)
        for markup in ['<script>alert(1)</script>', '<img onerror="x()">', '<a href="javascript:x()">x</a>']:
            with self.assertRaises(ValueError): editor.SafeMarkup().feed(markup)

    def test_empty_save_has_no_backup(self):
        state = editor.prepare('pages/L04CHECK.html')
        result = editor.save(dict(path=state['path'], versions=state['versions'], changes=[]))
        self.assertIsNone(result['backup'])
        self.assertFalse((editor.ROOT / 'outputs').exists())


if __name__ == '__main__':
    unittest.main()
