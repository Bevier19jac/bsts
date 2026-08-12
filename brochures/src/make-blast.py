#!/usr/bin/env python3
"""
Procedural 120mm muzzle-blast envelope for the BSTS brand lockup.

Nothing here is traced, sampled, or derived from any photograph. Every pixel
is computed from noise functions and analytic falloffs. A reference image was
consulted only to fix the PHYSICS the maths has to reproduce:

  * the barrel does not stop at the edge of the flash — the gun tube is
    swallowed by the gas mass, whose centre sits FORWARD of the muzzle;
  * the boundary is turbulent and broken (burning propellant), never a
    circle, oval, cone, beam or decorative sun;
  * radial filaments stream outward from the bore exit, densest forward;
  * a narrower incandescent jet runs on the bore axis well past the ball;
  * the hottest point is at the muzzle itself and cools outward, so colour
    is a monotone function of intensity: white -> pale gold -> amber -> ember.

Geometry contract (consumed by client.html / advisor.html):
    the bore axis is the exact vertical centre of the canvas (y_frac 0.5)
    the muzzle attach point is at MUZZLE_X_FRAC of the canvas width
so the tank's muzzle pixel and this point are simply made to coincide.

Deterministic: fixed seed, so every build is byte-identical.
"""

import numpy as np
from PIL import Image

SEED = 20260812
SS = 2                      # supersample factor
W, H = 1500, 834            # final canvas
X0, X1 = -0.30, 1.62        # physical x span; muzzle at x = 0
MUZZLE_X_FRAC = -X0 / (X1 - X0)   # bore exit, fraction of width
OUT = "/home/claude/brochures/assets/blast-envelope.png"

rng = np.random.default_rng(SEED)

# ---------------------------------------------------------------- noise ----
def _grid(n, m):
    return rng.random((n, m), dtype=np.float32)

def value_noise(x, y, freq, tiles=None):
    """Bilinear value noise with a smootherstep fade, sampled at `freq`."""
    n = int(freq) + 3
    g = (_grid(n + 1, n + 1) if tiles is None else tiles).astype(np.float32)
    gx, gy = x * freq, y * freq
    x0, y0 = np.floor(gx).astype(int) % n, np.floor(gy).astype(int) % n
    fx, fy = gx - np.floor(gx), gy - np.floor(gy)
    sx = fx * fx * fx * (fx * (fx * 6 - 15) + 10)
    sy = fy * fy * fy * (fy * (fy * 6 - 15) + 10)
    x1, y1 = (x0 + 1) % n, (y0 + 1) % n
    a = g[x0, y0] * (1 - sx) + g[x1, y0] * sx
    b = g[x0, y1] * (1 - sx) + g[x1, y1] * sx
    return a * (1 - sy) + b * sy

def fbm(x, y, octaves=5, freq=3.0, lac=2.03, gain=0.5):
    tot = np.zeros(x.shape, dtype=np.float32)
    amp, norm, f = 1.0, 0.0, freq
    for _ in range(octaves):
        tot += amp * value_noise(x, y, f)
        norm += amp
        amp *= gain
        f *= lac
    return tot / norm

def smoothstep(e0, e1, v):
    t = np.clip((v - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3 - 2 * t)

# ------------------------------------------------------- physical space ----
# x runs from X0 (behind the muzzle) to X1 ; muzzle sits at x = 0.
# y is the bore axis at 0, canvas half-height 0.5.
px = np.linspace(X0, X1, W * SS, dtype=np.float32)
py = np.linspace(-0.50, 0.50, H * SS, dtype=np.float32)
X, Y = np.meshgrid(px, py)

# Noise sample coordinates, offset positive so the integer floor is stable.
NX, NY = X + 4.0, Y + 4.0

# Domain warp — this is what turns smooth blobs into rolling combustion gas.
wx = fbm(NX * 0.55, NY * 0.55, octaves=4, freq=2.2)
wy = fbm(NX * 0.55 + 1.7, NY * 0.55 + 3.1, octaves=4, freq=2.2)
WX = NX + 0.42 * (wx - 0.5)
WY = NY + 0.42 * (wy - 0.5)

turb = fbm(WX, WY, octaves=6, freq=3.4)          # coarse billows
fine = fbm(WX * 2.6 + 9.0, WY * 2.6 + 2.0, octaves=5, freq=5.0)

# ------------------------------------------------------------ fireball ----
CX = 0.330                    # gas-mass centre, FORWARD of the muzzle
RX_F, RX_B, RY = 0.395, 0.366, 0.335
dx = X - CX
rx = np.where(dx >= 0, RX_F, RX_B)
u, v = dx / rx, Y / RY
r = np.sqrt(u * u + v * v) + 1e-9

# Radial filaments: high angular frequency, low radial frequency, so the
# noise stretches into streamers pointing away from the bore exit.
theta = np.arctan2(Y, dx)
fil = fbm(theta * 1.35 + 6.0, r * 0.85 + 6.0, octaves=4, freq=6.5)

# Break the boundary with turbulence, then push filaments through the rim.
r_edge = r * (1.0 - 0.34 * (turb - 0.5) - 0.26 * (fil - 0.5))
body = smoothstep(1.16, 0.30, r_edge)

# Interior is not uniform: coarse billows read as separate gas lobes.
body = body * np.clip(0.46 + 1.15 * turb * (0.60 + 0.60 * fine), 0.0, 1.40)

def shift_rows(a, dy):
    """Roll a field up by dy rows, blending the fractional part."""
    i = int(np.floor(dy))
    f = float(dy - i)
    return np.roll(a, -i, axis=0) * (1 - f) + np.roll(a, -(i + 1), axis=0) * f


BODY_RAW = body

# ------------------------------------------------- muzzle flash + core ----
# The hottest region is at the bore exit and just ahead of it, not at the
# geometric centre of the ball. This is what buries the barrel in light.
mdx, mdy = X - 0.02, Y
mcone = np.exp(-((mdy / (0.050 + 0.30 * np.clip(mdx, 0, None))) ** 2))
mcone *= np.exp(-np.clip(mdx, 0, None) / 0.17) * smoothstep(-0.17, -0.02, mdx)
flash = mcone * (0.55 + 0.60 * fine)

core = np.exp(-((X - 0.06) ** 2 / 0.0092 + Y ** 2 / 0.0078))

# Reverse flow: propellant gas spills back along the tube for a few inches
# after the shot. Physically why the muzzle is inside the fire, not at its
# leading edge — and it hugs the barrel instead of ballooning the silhouette.
collar = np.exp(-((X + 0.055) ** 2 / 0.0072 + Y ** 2 / 0.0125)) * (0.45 + 0.70 * fine)

# ---------------------------------------------------------------- jet ----
# A narrower incandescent plume on the bore axis, widening and cooling.
jx = np.clip(X - 0.16, 0, None)
jw = 0.017 + 0.058 * jx ** 0.62
jet = np.exp(-(Y / jw) ** 2) * np.exp(-jx / 0.52)
jet *= 0.80 + 0.34 * fbm(NX * 2.4 + 14.0, np.full_like(X, 7.0), octaves=3, freq=5.0)
jet *= smoothstep(-0.02, 0.10, X)
# The lance is secondary light: cap it so it never clips to white and
# competes with the fireball for the eye.
jet = np.clip(jet, 0.0, 0.60)

# ------------------------------------------------------------ compose ----
# Hard vignette to zero at the canvas edges so nothing clips at the crop.
edge = (smoothstep(X0, X0 + 0.10, X) * smoothstep(X1, X1 - 0.20, X)
        * smoothstep(-0.50, -0.40, Y) * smoothstep(0.50, 0.40, Y))


def compose(dy):
    """Full intensity field with the turbulent body shifted up by dy rows."""
    b = shift_rows(BODY_RAW, dy)
    f = 1.06 * b + 0.72 * flash + 0.48 * core + 0.62 * collar + 1.05 * jet
    return np.clip(np.clip(f, 0.0, None) * edge, 0.0, 1.0) ** 1.30


# ------------------------------------------------- balance on the axis ----
# Balance the INCANDESCENT CORE on the bore axis, not the total energy.
#
# The first version of this balanced the alpha-weighted centroid, and it was
# wrong in a way that passed every check. A muzzle blast throws a large faint
# plume upward and a denser bright mass below; balance the two and the total
# energy sits on the axis while the part the eye actually tracks — the white
# core — hangs well below it. Measured on the rendered page, that error was
# 20px on a 633px lockup: the fireball visibly sagged under the gun tube
# while the QA reported it centred to a fifth of a point.
#
# So the metric is the intensity-weighted centroid of pixels above CORE_LVL,
# which is the same quantity qa-lockup.mjs now measures. Because shifting the
# body also moves that centroid non-linearly (the analytic flash, core and
# jet stay put), solve for it: a damped fixed-point iteration, converging in
# a handful of steps and fully deterministic.
CORE_LVL = 0.80
_rows = np.arange(H * SS, dtype=np.float32)[:, None]
_axis = (H * SS - 1) / 2.0


def core_offset(field):
    w = field * (field > CORE_LVL)
    return float((_rows * w).sum() / w.sum()) - _axis


dy = 0.0
for _step in range(14):
    err = core_offset(compose(dy))
    if abs(err) < 0.15:
        break
    dy += 0.85 * err
I = compose(dy)
print(f"body re-centred by {dy:+.2f} rows  "
      f"(core offset {core_offset(I):+.3f}px of {H * SS})")

# --------------------------------------------------- temperature ramp ----
# Colour is a pure monotone function of intensity: cool ember at the fringe,
# white-hot at the bore. Anchors are the BSTS gold family.
stops = np.array([
    [0.00, 0x6b, 0x33, 0x0e],
    [0.14, 0x9c, 0x51, 0x18],
    [0.30, 0xc9, 0x76, 0x2a],
    [0.46, 0xe8, 0x9c, 0x42],
    [0.62, 0xf5, 0xbe, 0x63],
    [0.78, 0xff, 0xdd, 0x9c],
    [0.90, 0xff, 0xf1, 0xcf],
    [1.00, 0xff, 0xff, 0xfa],
], dtype=np.float64)

R = np.interp(I, stops[:, 0], stops[:, 1])
G = np.interp(I, stops[:, 0], stops[:, 2])
B = np.interp(I, stops[:, 0], stops[:, 3])

# Emissive fire: opacity tracks intensity, lifted slightly so the outer gas
# still reads on a dark ground without turning into a rectangle of haze.
A = np.clip(I * 1.30, 0, 1) ** 1.05 * 255.0

img = np.stack([R, G, B, A], axis=-1).astype(np.uint8)
im = Image.fromarray(img, "RGBA").resize((W, H), Image.LANCZOS)
im.save(OUT)

# ------------------------------------------------------------ report ----
a = np.asarray(im)[:, :, 3].astype(np.float64)
ys, xs = np.nonzero(a > 8)
cy = float((np.arange(a.shape[0])[:, None] * a).sum() / a.sum())
print(f"wrote {OUT}  {im.size}")
print(f"MUZZLE_X_FRAC {MUZZLE_X_FRAC:.4f}   axis_y_frac 0.5000")
print(f"alpha bbox x[{xs.min()},{xs.max()}] y[{ys.min()},{ys.max()}]")
print(f"luminance centroid y_frac {cy / a.shape[0]:.4f}")
