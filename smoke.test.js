// Plays through the Branchline missions in a simulated browser.
// Run with: npm install && npm test
const { test } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const { JSDOM } = require('jsdom');

async function load() {
  const dom = await JSDOM.fromFile(path.join(__dirname, '..', 'index.html'), {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });
  const { document, KeyboardEvent } = dom.window;
  const input = document.getElementById('cmd');
  const term = document.getElementById('term-out');
  const run = (cmd) => {
    input.value = cmd;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  };
  const text = () => term.textContent;
  const doneCount = () => document.querySelectorAll('#track li.done').length;
  return { dom, document, run, text, doneCount };
}

test('blocks git commands before git init', async () => {
  const { run, text } = await load();
  run('git status');
  assert.match(text(), /not a git repository/);
});

test('plays through all ten missions', async () => {
  const { run, text, doneCount, document } = await load();
  [
    'git init',
    'echo "Hello, Git" > hello.txt',
    'git status',
    'git add hello.txt',
    'git commit -m "Add hello file"',
    'git switch -c feature',
    'echo "A second line" >> hello.txt',
    'git commit -am "Add a second line"',
    'git switch main',
    'git merge feature',
  ].forEach(run);
  assert.strictEqual(doneCount(), 7, 'first seven missions done');
  assert.match(text(), /Fast-forward/);

  [
    'git switch main',
    'git switch -c edit-a',
    'echo "Hello from A" > hello.txt',
    'git commit -am "A says hello"',
    'git switch main',
    'git switch -c edit-b',
    'echo "Hello from B" > hello.txt',
    'git commit -am "B says hello"',
    'git merge edit-a',
  ].forEach(run);
  assert.match(text(), /CONFLICT \(content\): Merge conflict in hello\.txt/);
  run('git commit -m "too soon"');
  assert.match(text(), /unmerged files/);
  [
    'echo "Hello from A and B" > hello.txt',
    'git add hello.txt',
    'git commit -m "Resolve hello conflict"',
  ].forEach(run);
  assert.strictEqual(doneCount(), 8, 'conflict mission done');

  [
    'git remote add origin https://github.com/me/my-project.git',
    'git push -u origin main',
  ].forEach(run);
  assert.strictEqual(doneCount(), 10, 'all missions done');
  assert.ok(document.querySelector('#finish .finish'), 'finish panel shown');
  assert.ok(document.querySelector('#map svg'), 'commit map drawn');
});

test('refuses to switch branches with conflicting local changes', async () => {
  const { run, text } = await load();
  ['git init', 'echo "one" > a.txt', 'git add a.txt', 'git commit -m "one"',
   'git switch -c other', 'echo "two" > a.txt', 'git commit -am "two"',
   'git switch main', 'echo "dirty" > a.txt', 'git switch other'].forEach(run);
  assert.match(text(), /would be overwritten/);
});

test('merging a branch that is already merged says so', async () => {
  const { run, text } = await load();
  ['git init', 'echo "x" > a.txt', 'git add .', 'git commit -m "x"',
   'git switch -c f', 'git switch main', 'git merge f'].forEach(run);
  assert.match(text(), /Already up to date/);
});

test('unclosed quotes get a friendly error', async () => {
  const { run, text } = await load();
  run('echo "oops');
  assert.match(text(), /Unclosed quote/);
});
