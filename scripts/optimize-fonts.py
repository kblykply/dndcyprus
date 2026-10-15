"""Regenerate local fonts with fonttools[woff]. Sources are pinned and verified.

Usage: python scripts/optimize-fonts.py
The preloaded subset retains Western/European Latin, Turkish letters, punctuation,
currency and arrows. Russian characters use a separate unicode-range face.
Other scripts continue to use system fallback fonts.
"""
import hashlib
import io
import json
from pathlib import Path
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
COMMIT = "bd8f81ddb5c74d5c8897b36ad88b440266245103"
CORE_UNICODES = "0000-017F,0218-021B,0300-036F,2000-206F,20A0-20CF,2122,2190-21FF,2212,2215,FEFF,FFFD"
CYRILLIC_UNICODES = "0400-04FF,0300-036F"
FONTS = [
    ("inter", "Inter%5Bopsz%2Cwght%5D.ttf", "DND Sans", {"opsz": 14}),
    ("montserrat", "Montserrat%5Bwght%5D.ttf", "DND Display", {"wght": (300, 400, 500)}),
]


def build():
    directory = ROOT / "app/fonts"
    directory.mkdir(parents=True, exist_ok=True)
    manifest = {"sourceCommit": COMMIT, "unicodeRanges": {"latin": CORE_UNICODES, "cyrillic": CYRILLIC_UNICODES}, "fonts": []}
    for family, filename, name, axes in FONTS:
        url = f"https://raw.githubusercontent.com/google/fonts/{COMMIT}/ofl/{family}/{filename}"
        original = urlopen(url).read()
        font = instantiateVariableFont(TTFont(io.BytesIO(original)), axes, inplace=True)
        # Reload after axis instancing to normalize lazy glyph/variation tables.
        normalized = io.BytesIO()
        font.save(normalized)
        for script, unicodes, sample in [("latin", CORE_UNICODES, "ÇĞİÖŞÜçğıöşü©€₺–’ąęłńśźż"), ("cyrillic", CYRILLIC_UNICODES, "Брошюра")]:
            font = TTFont(io.BytesIO(normalized.getvalue()))
            options = subset.Options()
            options.flavor = "woff2"
            options.layout_features += ["tnum", "pnum", "case", "ordn"]
            options.hinting = False
            options.name_IDs = ["*"]
            options.name_languages = ["*"]
            processor = subset.Subsetter(options=options)
            processor.populate(unicodes=subset.parse_unicodes(unicodes))
            processor.subset(font)
            for record in font["name"].names:
                if record.nameID in (1, 4, 6, 16):
                    record.string = (name.replace(" ", "") if record.nameID == 6 else name).encode(record.getEncoding())
            font.flavor = "woff2"
            output = io.BytesIO()
            font.save(output)
            data = output.getvalue()
            target = directory / f"{family}-{script}.woff2"
            target.write_bytes(data)
            assert all(ord(char) in font.getBestCmap() for char in sample), "Missing required glyphs"
            manifest["fonts"].append({"family": family, "script": script, "file": target.name, "source": url,
                "sourceSha256": hashlib.sha256(original).hexdigest(), "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(), "glyphs": len(font.getBestCmap())})
            print(f"{family} {script}: {len(data)} bytes, {len(font.getBestCmap())} mapped characters")
        license_url = url.rsplit("/", 1)[0] + "/OFL.txt"
        (directory / f"{family}-OFL.txt").write_bytes(urlopen(license_url).read())
    (directory / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    build()
