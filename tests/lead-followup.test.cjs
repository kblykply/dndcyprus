const assert = require("node:assert/strict");
const test = require("node:test");
const { loadTypeScript } = require("./helpers/load-typescript.cjs");

const m = loadTypeScript("lib/lead-followup.ts");

test("Cyprus local time converts to the right instant in winter and summer", () => {
  // Kasım: Kıbrıs UTC+2
  assert.equal(m.cyprusLocalToDate("2026-11-27", "14:00").toISOString(), "2026-11-27T12:00:00.000Z");
  // Temmuz: Kıbrıs UTC+3
  assert.equal(m.cyprusLocalToDate("2027-07-01", "09:30").toISOString(), "2027-07-01T06:30:00.000Z");
  // saat yoksa 10:00
  assert.equal(m.cyprusLocalToDate("2026-11-27", "").toISOString(), "2026-11-27T08:00:00.000Z");
  assert.equal(m.cyprusLocalToDate("2026-02-31", "10:00"), null);
  assert.equal(m.cyprusLocalToDate("27.11.2026", "10:00"), null);
  assert.equal(m.cyprusLocalToDate("2026-11-27", "25:00"), null);
  const back = m.dateToCyprusInputs(new Date("2026-11-27T12:00:00Z"));
  assert.equal(back.date, "2026-11-27");
  assert.equal(back.time, "14:00");
  assert.deepEqual({ ...m.dateToCyprusInputs(null) }, { date: "", time: "" });
});

test("follow-up state and short labels", () => {
  const now = new Date("2026-11-26T10:00:00Z"); // Kıbrıs 12:00
  assert.equal(m.followUpState(new Date("2026-11-26T08:00:00Z"), now), "gecikti");
  assert.equal(m.followUpState(new Date("2026-11-26T20:00:00Z"), now), "bugun"); // 22:00 Kıbrıs
  assert.equal(m.followUpState(new Date("2026-11-26T22:30:00Z"), now), "ileride"); // ertesi gün 00:30 Kıbrıs
  assert.equal(m.followUpState(null, now), null);
  assert.equal(m.followUpLabel(new Date("2026-11-26T12:00:00Z"), now), "Bugün 14:00");
  assert.equal(m.followUpLabel(new Date("2026-11-27T07:00:00Z"), now), "Yarın 09:00");
  assert.equal(m.followUpLabel(new Date("2026-11-30T07:30:00Z"), now), "30.11 09:30");
  assert.equal(m.followUpLabel(new Date("2026-11-26T09:20:00Z"), now), "40 dk gecikti");
  assert.equal(m.followUpLabel(new Date("2026-11-26T05:00:00Z"), now), "5 saat gecikti");
  assert.equal(m.followUpLabel(new Date("2026-11-23T10:00:00Z"), now), "3 gün gecikti");
});

test("today's list: overdue first, sold/negative leads left out", () => {
  const now = new Date("2026-11-26T10:00:00Z");
  const L = (id, iso, status = "arandi") => ({ id, followUpAt: iso ? new Date(iso) : null, status });
  const due = m.dueFollowUps([L(1, "2026-11-26T15:00:00Z"), L(2, "2026-11-20T09:00:00Z"), L(3, "2026-11-28T09:00:00Z"), L(4, null), L(5, "2026-11-25T09:00:00Z", "satis"), L(6, "2026-11-26T09:00:00Z", "olumsuz")], now);
  assert.deepEqual(due.map((d) => d.id), [2, 1]);
  assert.equal(m.cleanAssignee("  Talha   Uygur  "), "Talha Uygur");
  assert.equal(m.cleanAssignee("x".repeat(60)).length, 40);
});

test("CSV export has the follow-up columns", () => {
  const b = loadTypeScript("lib/lead-backup.ts");
  const csv = b.leadsToCsv([{ createdAt: new Date("2026-11-26T08:00:00Z"), name: "A", email: "a@b.c", status: "arandi", assignee: "Talha", followUpAt: new Date("2026-11-27T12:00:00Z") }]);
  assert.ok(csv.includes("\"Sorumlu\";\"Sonraki arama (Kıbrıs)\""));
  assert.ok(csv.includes("\"Talha\""));
  assert.match(csv, /27 Kasım 2026 14:00/);
});
