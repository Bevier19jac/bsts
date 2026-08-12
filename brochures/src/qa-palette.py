#!/usr/bin/env python3
"""
Palette guard.

BSTS is dark slate, metallic grey, restrained gold, restrained teal. Nothing
else. This walks every rendered PDF and preview and fails on pixels that read
as pink to a human eye -- which is NOT the same as "magenta hue". A light,
desaturated red like #d98a80 sits at hue 7 degrees and a naive magenta test
sails straight past it, which is exactly how one got into a diagram that
shipped.

Run:  python3 src/qa-palette.py
"""
import glob, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

def pink_mask(a):
    R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
    mx, mn = a.max(axis=2), a.min(axis=2)
    v = mx
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-9), 0)
    d = np.maximum(mx - mn, 1e-9)
    h = np.where(mx == R, ((G - B) / d) % 6,
                 np.where(mx == G, (B - R) / d + 2, (R - G) / d + 4)) * 60
    # a light unsaturated red (salmon / rose), or a true magenta
    rose = ((h < 28) | (h > 320)) & (s > 0.22) & (s < 0.75) & (v > 0.55) & (B > 0.35)
    magenta = (h > 285) & (h < 352) & (s > 0.25) & (v > 0.4)
    return rose | magenta

def check(path, label, budget):
    a = np.asarray(Image.open(path).convert("RGB")).astype(float) / 255.0
    m = pink_mask(a)
    n = int(m.sum())
    ok = n <= budget
    extra = ""
    if n:
        c = a[m] * 255
        extra = (f" mean #{int(c[:,0].mean()):02x}{int(c[:,1].mean()):02x}"
                 f"{int(c[:,2].mean()):02x}")
    print(f"{'PASS' if ok else 'FAIL'} {label} -- {n} px (budget {budget}){extra}")
    return ok

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "out")
allok = True

with tempfile.TemporaryDirectory() as tmp:
    for pdf in sorted(glob.glob(os.path.join(OUT, "*.pdf"))):
        base = os.path.join(tmp, os.path.basename(pdf)[:-4])
        subprocess.run(["pdftoppm", "-r", "150", "-png", pdf, base],
                       check=True, capture_output=True)
    for png in sorted(glob.glob(os.path.join(tmp, "*.png"))):
        # Zero tolerance in anything that goes to press.
        allok &= check(png, os.path.basename(png), 0)

# Previews are screenshots, so a handful of antialiased glyph edges is normal.
for png in sorted(glob.glob(os.path.join(OUT, "*PREVIEW.png"))):
    allok &= check(png, os.path.basename(png), 900)

sys.exit(0 if allok else 1)
