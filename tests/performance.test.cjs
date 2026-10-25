const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const sharp = require('sharp');

test('optimized artwork has accurate dimensions and is smaller than its source', async () => {
  const manifest = require('../src/lib/artwork-images.json');
  for (const [name, image] of Object.entries(manifest)) {
    const optimized = `public${image.src}`;
    const metadata = await sharp(optimized).metadata();
    assert.equal(metadata.width, image.w, name);
    assert.equal(metadata.height, image.h, name);
    assert.equal(metadata.format, 'webp', name);
    assert.ok(fs.statSync(optimized).size < fs.statSync(`public/artwork/${name}.png`).size, name);
  }
});

test('starfield pauses offscreen/hidden, honors motion preferences, and cleans up', () => {
  const frames = new Map();
  const listeners = {};
  let nextFrame = 0;
  let effect;
  let intersection;
  let resize;
  let preferenceChange;
  let disconnects = 0;
  let paints = 0;
  let gradients = 0;
  let layoutReads = 0;
  const ctx = {
    createRadialGradient: () => { gradients++; return { addColorStop() {} }; },
    createLinearGradient: () => ({ addColorStop() {} }),
    fillRect() {}, clearRect() {}, setTransform() {},
    drawImage() { paints++; }, beginPath() {}, arc() {}, fill() {},
    moveTo() {}, lineTo() {}, stroke() {},
  };
  const canvas = {
    get clientWidth() { layoutReads++; return 1200; },
    get clientHeight() { layoutReads++; return 800; },
    getContext: () => ctx,
  };
  const preference = {
    matches: false,
    addEventListener: (_, callback) => { preferenceChange = callback; },
    removeEventListener: () => { preferenceChange = null; },
  };
  const document = {
    hidden: false,
    createElement: () => ({ getContext: () => ctx }),
    addEventListener: (event, cb) => { listeners[event] = cb; },
    removeEventListener: (event) => { delete listeners[event]; },
  };
  const sandbox = {
    exports: {}, document, performance: { now: () => 0 },
    window: { devicePixelRatio: 2, matchMedia: () => preference },
    requestAnimationFrame: (cb) => { frames.set(++nextFrame, cb); return nextFrame; },
    cancelAnimationFrame: (id) => frames.delete(id),
    IntersectionObserver: class {
      constructor(cb) { intersection = cb; }
      observe() {} disconnect() { disconnects++; }
    },
    ResizeObserver: class {
      constructor(cb) { resize = cb; }
      observe() {} disconnect() { disconnects++; }
    },
    require: (name) => {
      if (name === 'react') return { useRef: () => ({ current: canvas }), useEffect: (cb) => { effect = cb; } };
      if (name === 'react/jsx-runtime') return { jsx: () => null };
      throw new Error(`Unexpected import: ${name}`);
    },
  };
  const source = fs.readFileSync('src/components/tribute/starfield.tsx', 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } });
  vm.runInNewContext(compiled.outputText, sandbox);
  sandbox.exports.Starfield({});
  const cleanup = effect();
  resize();
  assert.equal(frames.size, 0, 'no animation before intersecting');
  intersection([{ isIntersecting: true }]);
  const tick = (time) => {
    const [id, cb] = frames.entries().next().value;
    frames.delete(id);
    cb(time);
  };
  tick(100);
  assert.equal(paints, 100, 'desktop star count is capped');
  tick(110);
  assert.equal(paints, 100, 'skip frames above the 30fps drawing budget');
  tick(140);
  assert.equal(paints, 200);
  assert.equal(gradients, 3, 'star glows are generated only once');
  assert.equal(layoutReads, 2, 'no layout reads in the animation loop');
  intersection([{ isIntersecting: false }]);
  assert.equal(frames.size, 0);
  intersection([{ isIntersecting: true }]);
  assert.equal(frames.size, 1);
  document.hidden = true;
  listeners.visibilitychange();
  assert.equal(frames.size, 0);
  document.hidden = false;
  listeners.visibilitychange();
  assert.equal(frames.size, 1);
  preference.matches = true;
  preferenceChange();
  assert.equal(frames.size, 0);
  preference.matches = false;
  preferenceChange();
  assert.equal(frames.size, 1);
  cleanup();
  assert.equal(frames.size, 0);
  assert.equal(disconnects, 2);
  assert.equal(Object.keys(listeners).length, 0);
  assert.equal(preferenceChange, null);
});
