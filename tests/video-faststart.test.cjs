// Sitedeki MP4 videoları: "moov" kutusu "mdat"tan önce (faststart, indirme bitmeden oynar)
// ve görüntü H.264 (avc1) — Safari dahil her tarayıcıda açılır. Kaliteyi düşüren yeniden kodlama bu testte değil,
// docs/qa raporundaki ffprobe tablosunda izlenir.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const PUBLIC = path.join(__dirname, "..", "public");

function mp4Files(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== "tours") out.push(...mp4Files(p)); }
    else if (/\.mp4$/i.test(e.name)) out.push(p);
  }
  return out;
}

function topBoxes(file) {
  const fd = fs.openSync(file, "r");
  const size = fs.fstatSync(fd).size;
  const head = Buffer.alloc(16);
  const boxes = [];
  let off = 0;
  try {
    while (off + 8 <= size && boxes.length < 32) {
      fs.readSync(fd, head, 0, 16, off);
      let len = head.readUInt32BE(0);
      const type = head.toString("latin1", 4, 8);
      if (len === 1) len = Number(head.readBigUInt64BE(8));
      else if (len === 0) len = size - off;
      boxes.push({ type, off, len });
      if (len < 8) break;
      off += len;
    }
    const moov = boxes.find((b) => b.type === "moov");
    const moovBuf = moov ? Buffer.alloc(Math.min(moov.len, 8 * 1024 * 1024)) : Buffer.alloc(0);
    if (moov) fs.readSync(fd, moovBuf, 0, moovBuf.length, moov.off);
    return { boxes, moovBuf };
  } finally {
    fs.closeSync(fd);
  }
}

const files = mp4Files(PUBLIC);

test("public altında video var", () => {
  assert.ok(files.length > 0);
});

for (const file of files) {
  const rel = path.relative(PUBLIC, file);
  test(`${rel}: faststart ve H.264`, () => {
    const { boxes, moovBuf } = topBoxes(file);
    const types = boxes.map((b) => b.type);
    assert.ok(types.includes("moov"), "moov kutusu yok");
    assert.ok(types.includes("mdat"), "mdat kutusu yok");
    assert.ok(types.indexOf("moov") < types.indexOf("mdat"), `moov sonda (${types.join(",")}): faststart değil`);
    assert.ok(moovBuf.includes("avc1"), "görüntü H.264 (avc1) değil");
  });
}
