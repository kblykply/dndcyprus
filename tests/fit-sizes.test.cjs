const assert = require("node:assert/strict");
const test = require("node:test");
const path = require("node:path");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/fit-sizes.ts");

test("sizes: pixel widths scale with the page zoom, media conditions and vw stay", () => {
  assert.equal(m.scaleSizes("(min-width: 1000px) 460px, 86vw", 1.5), "(min-width: 1000px) 690px, 86vw");
  assert.equal(
    m.scaleSizes("(max-width: 1023px) calc(100vw - 48px), (max-width: 1279px) calc((100vw - 96px) / 2), 592px", 2),
    "(max-width: 1023px) calc(100vw - 96px), (max-width: 1279px) calc((100vw - 192px) / 2), 1184px",
  );
  assert.equal(m.scaleSizes("(min-width: 1100px) and (min-height: 600px) 1050px, 180vw", 1.3), "(min-width: 1100px) and (min-height: 600px) 1365px, 180vw");
  assert.equal(m.scaleSizes("100vw", 1.7), "100vw");
  assert.equal(m.scaleSizes("420px", 1), "420px");
  assert.equal(m.scaleSizes("", 2), "");
});

test("viewport units are compensated for the page zoom in CSS", async () => {
  const plugin = require(path.join(__dirname, "..", "postcss-viewport-zoom.cjs"));
  const postcss = require("postcss");
  const css = `.a{height:min(86vh,860px);width:calc(100vw - 2*var(--g))}.b{content:"10vh";background:url(a-5vw.png)}.c{zoom:var(--z)}@media (min-width:2000px){.d{max-height:62svh}}`;
  const out = (await postcss([plugin()]).process(css, { from: undefined })).css;
  assert.match(out, /height:min\(calc\(86vh \/ var\(--z, 1\)\),860px\)/);
  assert.match(out, /width:calc\(calc\(100vw \/ var\(--z, 1\)\) - 2\*var\(--g\)\)/);
  assert.match(out, /content:"10vh"/);
  assert.match(out, /url\(a-5vw\.png\)/);
  assert.match(out, /\.c\{zoom:var\(--z\)\}/);
  assert.match(out, /@media \(min-width:2000px\)\{\.d\{max-height:calc\(62svh \/ var\(--z, 1\)\)\}\}/);
  // ikinci kez işlenince değer değişmez
  assert.equal((await postcss([plugin()]).process(out, { from: undefined })).css, out);
});
