# BSTS Brochures — print instructions

Two brochures. Same visual identity, different audiences, different content.

| File | Audience | The thought it should produce |
| --- | --- | --- |
| `BSTS_Client_Capabilities_Brochure.pdf` | Prospective customers | "BSTS understands a problem my company has." |
| `BSTS_Advisor_Referral_Field_Guide.pdf` | Consultants, fractional execs, CPAs, MSPs, attorneys | "I know a client who needs to talk to BSTS." |

---

## Which file to hand over

**Two versions of each brochure ship, and the right one depends on where you print.**

### Retail counter — Office Depot / OfficeMax / Staples / FedEx Office

Use the plain files:

- `BSTS_Client_Capabilities_Brochure.pdf`
- `BSTS_Advisor_Referral_Field_Guide.pdf`

These are exactly **11 × 8.5 in** — final trim size, artwork running to the edge.
Retail shops print on pre-cut letter stock and do not trim, so a file with
bleed would get scaled down and land with white margins. Ask for
**borderless / full-bleed** printing if they offer it.

### Commercial printer

Use the bleed files:

- `BSTS_Client_Capabilities_Brochure_PRINT_BLEED.pdf`
- `BSTS_Advisor_Referral_Field_Guide_PRINT_BLEED.pdf`

**11.25 × 8.75 in** — 0.125 in bleed on all four edges, trimming to 11 × 8.5.

---

## What to tell the print operator

> Letter size, **11 × 8.5 landscape**, **double-sided**, **flip on the short
> edge**, **tri-fold (letter/roll fold)**, **100 lb matte text**, full colour.
> Page 1 is the outside, page 2 is the inside.

**Flip on the short edge is the one thing that must not be wrong.** Landscape
duplex flipped on the long edge prints the inside upside down relative to the
outside. If the shop's form says "head to head" vs "head to toe," you want the
option that keeps both sides reading the same way up in landscape.

---

## Panel layout and fold

Roll fold. The right-hand panel of the inside face folds in first, so it is
deliberately 1/16 in narrower.

```
PAGE 1 — OUTSIDE          (left to right, as printed)
┌──────────────┬──────────────┬──────────────┐
│ inner flap   │ back cover   │ FRONT COVER  │
│   3.625"     │   3.6875"    │   3.6875"    │
└──────────────┴──────────────┴──────────────┘
  folds at 3.625" and 7.3125"

PAGE 2 — INSIDE           (left to right, as printed)
┌──────────────┬──────────────┬──────────────┐
│ panel 3      │ panel 4      │ panel 5      │
│   3.6875"    │   3.6875"    │   3.625"     │
└──────────────┴──────────────┴──────────────┘
  folds at 3.6875" and 7.375"
```

Reading order once folded — verified by simulation, see
`CLIENT_FOLD_ORDER_CHECK.png` and `ADVISOR_FOLD_ORDER_CHECK.png`:

1. Front cover
2. Back cover
3. Inner flap (the first thing seen when the cover is lifted)
4, 5, 6. The inside spread, left to right

The inner flap deliberately carries the strongest recognition content — the
problem list in the client brochure, "When your client says…" in the advisor
guide — because it is what the reader's eye hits first on opening.

---

## Verification already performed

Both files passed **94 automated checks** (54 layout/claims + 40 physical).

Geometry

- Page size exact at both trim and bleed; 2 pages each
- Six panels; widths sum to 11.000 in on both faces
- Roll-fold widths correct (narrow panel on the correct side of each face)
- No panel content overflow
- No text straddles a fold
- No text inside the 0.25 in safe margin
- Reassembled fold simulation confirms the front cover is the front cover

Print behaviour

- Rasterised at 300 DPI from the exported PDFs and measured
- No type below 7 pt; long-form copy never below 8 pt; body copy 9–10 pt
- Every tracer ≥ 2.0 pt so it survives toner on matte
- Background field lifted (median luma 26–27), not flat black — avoids muddy
  large dark areas on matte
- Crushed black held under 0.06% of the sheet, confined to tank shadow detail
- Tank armour detail deliberately lifted from the website asset so plates,
  tracks, and the gun tube stay readable in print

QR codes

- Decoded from the 300 DPI raster of the final PDFs, not from the source image
- Both resolve to `https://bevierstrategic.com/start` — a stable QR
  landing route that forwards into the discovery assessment
- Module size 0.45 mm, above the 0.4 mm reliable-scan threshold for matte

Claims

- SOC 2 CPA boundary present verbatim in both brochures
- "Service-Disabled Veteran-Owned & Operated"; VetCert stated as
  **application planned**, never as certified or "in process"
- No framework certification claims, no invented proof points, no buzzwords,
  no placeholder text
- Continuous assurance labelled "not a product available today"

---

## Before you print — two things to settle

**1. One canonical address: `bevierstrategic.com`. (Settled.)**

The QR code and the printed URL on both brochures now point to
`bevierstrategic.com` — the custom domain on the Cloudflare Pages project connected to
GitHub, which redeploys automatically on every push to `main` and matches
the repo's `site.url`. The old `bsts.pages.dev` project was a one-time
manual upload; delete it (or make it redirect) in the Cloudflare dashboard
so a stale copy of the site is never reachable.

**2. There is no email or phone on these brochures — on purpose.**

The only contact routes are the website and the QR code. A personal Gmail
address does not belong on collateral handed to a contracting officer or a
CPA firm, and inventing a business address was not an option. Once a domain
and business mailbox exist, add a contact line to the back panel of both
brochures and re-export.

---

## Editing and re-exporting

Source lives in `../src` (also delivered as `BSTS_Brochure_Source.zip`).

```
src/
  brochure.css        shared design system, geometry, print tuning
  client.html         client capabilities brochure
  advisor.html        advisor referral field guide
  render.mjs          exports all four PDFs + preview PNGs
  qa-brochures.mjs    54 layout, geometry, and claims checks
  qa-physical.py      40 PDF, fold, QR, and print-behaviour checks
assets/
  abrams-print.png    tank, tuned for matte print
  qr-bsts.png         QR to bevierstrategic.pages.dev
  inter.woff2, fraunces.woff2
```

Re-export after any edit:

```bash
cd src
node render.mjs        # writes all four PDFs and the previews
node qa-brochures.mjs  # must report 54/54
python3 qa-physical.py # must report 40/40
```

Both QA suites are worth running after every content change. They caught real
defects during the build, including panel overflow, text landing on a fold, a
non-canonical SOC 2 sentence, and tracers being silently crushed to zero
height by the flex layout.
