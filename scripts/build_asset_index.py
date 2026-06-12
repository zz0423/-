#!/usr/bin/env python3
from pathlib import Path
import struct


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "source"
INDEX_FILE = ROOT / "references" / "asset-index.md"


def png_size(path):
    with path.open("rb") as handle:
        header = handle.read(24)
    if header[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    width, height = struct.unpack(">II", header[16:24])
    return width, height


def main():
    rows = []
    for path in sorted(SOURCE_DIR.glob("*.png"), key=lambda item: item.name):
        size = png_size(path)
        if not size:
            continue
        rows.append((path.name, size[0], size[1]))

    lines = [
        "# Doudou Asset Index",
        "",
        "Generated from `assets/source/`. Refresh with `python3 scripts/build_asset_index.py` after adding or removing source files.",
        "",
        "| File | Width | Height |",
        "| --- | ---: | ---: |",
    ]
    for name, width, height in rows:
        lines.append(f"| `{name}` | {width} | {height} |")
    lines.append("")
    INDEX_FILE.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(rows)} assets to {INDEX_FILE}")


if __name__ == "__main__":
    main()
