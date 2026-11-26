const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/wa-templates.ts");

test("language from the phone number: +90 / 05xx Turkish, other countries English", () => {
  assert.equal(m.guessWaLang("+90 533 123 45 67"), "tr");
  assert.equal(m.guessWaLang("0542 855 41 23"), "tr");
  assert.equal(m.guessWaLang("5338551122"), "tr");
  assert.equal(m.guessWaLang("+44 7700 900123"), "en");
  assert.equal(m.guessWaLang("0049 151 2345678"), "en");
  assert.equal(m.guessWaLang(null), "tr");
});

test("templates: full name in Turkish, first name in English, project or general wording, no placeholder names", () => {
  const tr = m.waTemplates({ name: "Ayşe Yılmaz", project: "Lagoon Verde" }, "tr");
  assert.equal(tr.length, 4);
  assert.match(tr[0].text, /^Merhaba Ayşe Yılmaz, DND Cyprus'tan yazıyorum\. Lagoon Verde için bıraktığınız talep/);
  assert.match(tr[3].text, /Lagoon Verde projesini yerinde/);
  const en = m.waTemplates({ name: "John Smith", project: null }, "en");
  assert.match(en[0].text, /^Hi John, this is DND Cyprus\. Thank you for your enquiry about our projects\./);
  assert.match(m.waTemplates({ name: "Meta talebi", project: "NeoCity" }, "tr")[0].text, /^Merhaba, DND Cyprus'tan/);
  for (const t of [...tr, ...en]) assert.ok(!/ücretsiz|free|indirim|discount|%/i.test(t.text), "vaat yok");
  const link = m.waLink("905331234567", tr[0].text);
  assert.ok(link.startsWith("https://wa.me/905331234567?text=Merhaba%20Ay%C5%9Fe"));
});
