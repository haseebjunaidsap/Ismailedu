#!/usr/bin/env python3
"""Make a one-file copy of Pip's Learning Park.

The site on GitHub loads its CSS and JavaScript from the css/ and js/ folders.
This script puts them all back inside one HTML file (handy for sharing as a
single download, or for hosts that only take one file).

    python3 tools/bundle.py                 -> writes pips-learning-park-single.html
    python3 tools/bundle.py out.html        -> writes out.html
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def bundle(root=ROOT):
    html = open(os.path.join(root, "index.html"), encoding="utf-8").read()
    read = lambda p: open(os.path.join(root, p), encoding="utf-8").read()

    # the explainer styles sit alone in the first <style>; the rest share the second one
    links = re.findall(r'<link rel="stylesheet" href="(css/[^"]+)">', html)
    first, rest = links[0], links[1:]
    html = html.replace(f'<link rel="stylesheet" href="{first}">', "<style>" + read(first) + "</style>", 1)
    block = "\n".join(f'<link rel="stylesheet" href="{c}">' for c in rest)
    assert block in html, "keep the css/ links together, one per line, in index.html"
    html = html.replace(block, "<style>" + "".join(read(c) for c in rest) + "</style>", 1)

    # every <script src> becomes one <script>, in the same order
    m = re.search(r'<!-- Scripts load in this order\.[^\n]*-->\n((?:<!--[^\n]*-->\n|<script src="[^"]+"></script>\n)+)', html)
    assert m, "script list not found in index.html"
    srcs = re.findall(r'<script src="([^"]+)"></script>', m.group(1))
    js = "".join(read(s) for s in srcs)
    return html[:m.start()] + "<script>\n" + js + "</script>" + html[m.end():]


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "pips-learning-park-single.html")
    data = bundle()
    open(out, "w", encoding="utf-8").write(data)
    print(f"wrote {out} ({len(data):,} bytes)")
