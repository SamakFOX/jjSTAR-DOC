import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('./editor.js', import.meta.url), 'utf8');
const helper = source.slice(source.indexOf('  function formattingRoot('), source.indexOf('  function apply('));
const context = vm.createContext({ doc: { defaultView: { getComputedStyle: e => ({ display: e.display }) } } });
vm.runInContext(helper, context);
function node(parentElement, display = 'inline') {
  return {
    nodeType: 1, parentElement, display,
    contains(other) {
      for (let n = other; n; n = n.parentElement) if (n === this) return true;
      return false;
    }
  };
}
const listItem = node(null, 'flex');
const number = node(listItem);
const text = node(listItem);
const emphasis = node(text);
const range = (startContainer, endContainer = startContainer) => ({ startContainer, endContainer });
assert.equal(context.formattingRoot(range(emphasis), listItem), text, 'Preserve the list text column');
assert.equal(context.formattingRoot(range(emphasis, text), listItem), text, 'Allow selection across inline styles in one column');
assert.equal(context.formattingRoot(range(number, emphasis), listItem), null, 'Reject selection across number and text columns');
const paragraph = node(null, 'block');
const badge = node(paragraph, 'inline-flex');
assert.equal(context.formattingRoot(range(badge), paragraph), paragraph, 'An inline badge can still be split for removing its style');
const grid = node(null, 'grid');
const cell = node(grid);
assert.equal(context.formattingRoot(range(cell), grid), cell, 'Preserve grid cells');
console.log('PASS: 5 formatting boundaries preserve list and grid structure');
