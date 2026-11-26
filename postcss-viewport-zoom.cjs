// postcss-viewport-zoom.cjs
// Büyük ekran ölçeği (26.11.2026): 1920 pikselden geniş ekranlarda sitenin tamamı CSS `zoom` ile orantılı büyür
// (app/globals.css → "Büyük ekran ölçeği"). `zoom` ekran birimlerini (vw, vh, svh, dvh, …) de büyüttüğü için tam ekran
// bölümler taşardı; bu eklenti her ekran birimini `calc(Nvh / var(--z, 1))` yapar, böylece 100vh yine tam ekran olur.
// --z tanımlı değilse (panel, 1920 ve altı ekranlar) değer 1'dir: görünüm hiç değişmez.
// Tırnak içindeki metin ve url(...) değişmez; @media / @container koşulları bildirim olmadığı için dokunulmaz.

const UNIT = /(-?(?:\d+\.?\d*|\.\d+))(svw|svh|dvw|dvh|lvw|lvh|vw|vh|vmin|vmax)\b/g;
const HAS_UNIT = /\d(?:s|d|l)?v(?:w|h|min|max)\b/;
const SKIP_PROPS = new Set(["zoom", "--z"]);

function outsideQuotes(value, fn) {
  // "…", '…' ve url(…) parçalarını olduğu gibi bırak, arasını dönüştür
  const parts = value.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|url\([^)]*\))/g);
  return parts.map((p, i) => (i % 2 ? p : fn(p))).join("");
}

const plugin = () => ({
  postcssPlugin: "viewport-zoom",
  Declaration(decl) {
    if (SKIP_PROPS.has(decl.prop) || !HAS_UNIT.test(decl.value) || decl.value.includes("var(--z,")) return;
    decl.value = outsideQuotes(decl.value, (s) => s.replace(UNIT, (_, n, u) => `calc(${n}${u} / var(--z, 1))`));
  },
});
plugin.postcss = true;
module.exports = plugin;
