const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const st = loadTypeScript("lib/lead-status.ts");

const L = (id, status, daysAgo = 1) => ({ id, status, createdAt: new Date(Date.now() - daysAgo * 86_400_000), name: "x", email: "", phone: null, project: null, source: null });

test("'Satış dışı' is a status, but not a sales lead", () => {
  assert.equal(st.isLeadStatus("satis_disi"), true);
  assert.equal(st.statusInfo("satis_disi").label, "Satış dışı");
  assert.equal(st.isSalesLead({ status: "satis_disi" }), false);
  assert.equal(st.isSalesLead({ status: "yeni" }), true);
});

test("summary leaves non-sales records out of totals and conversion", () => {
  const s = st.leadSummary([L(1, "satis"), L(2, "yeni"), L(3, "satis_disi"), L(4, "satis_disi")]);
  assert.equal(s.total, 2);
  assert.equal(s.sold, 1);
  assert.equal(s.conversion, 50);
  assert.equal(s.waiting, 1);
});

test("form origin reads as website / Meta / panel", () => {
  assert.equal(st.formOrigin("contact"), "Web sitesi · İletişim formu");
  assert.equal(st.formOrigin("lead"), "Web sitesi · Proje formu");
  assert.equal(st.formOrigin("meta-lead"), "Meta reklam formu");
  assert.equal(st.formOrigin("panel"), "Panelden eklendi");
  assert.equal(st.formOrigin(null), "Web sitesi formu");
});
