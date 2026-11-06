# Credential badge assets

This folder intentionally ships **empty of badge images**.

## SBA VetCert icons (added 2026-11-06)

`sba-sdvosb-certified.png` is the official SBA certification icon (the VOSB
icon is intentionally not displayed — SDVOSB already implies it) from the SBA brand guide ("Decals and web icons",
sba.gov/document/brand-guide-decals-web-icons). BSTS was approved by SBA
VetCert as SDVOSB + VOSB on 2026-10-26 (see `vetCertStatus` in
`src/lib/site.ts` and `CLAIMS_REGISTER.md`), so use is permitted.

SBA's usage rule shipped with the icons: certified firms MAY use them on the
website, business cards, social media profiles, capability statements and
proposal bids. They MAY NOT be used on letterhead, marketing materials or
advertising (paid or PSA, traditional or digital), or to imply SBA endorsement
of any goods or services. Remove them if certification lapses (renewal due
2026-10-26 + 3 years).

## Founder certification badges (added 2026-11-06)

- `credly-comptia-security-plus.png` — CompTIA Security+ ce, downloaded from the
  founder's own Credly account (badge 6ec5df3f-f586-4dc9-92ff-47f040bf23ca).
- `credly-aws-ai-practitioner.png` — AWS Certified AI Practitioner, downloaded from
  the founder's own Credly account (badge a566981a-1004-423c-9d3a-76ec4465a549).
- `microsoft-certified-fundamentals.svg` — Microsoft's official "Microsoft Certified
  Fundamentals" badge from the founder's Microsoft Learn credentials page
  (Microsoft no longer issues distinct Azure Fundamentals artwork; the AZ-900
  wording lives in the adjacent text). `microsoft-certified-fundamentals.png` is a
  320px raster of the same SVG for the email signature, since Gmail does not
  render SVG.

Display order follows the credential precedence rule in `CLAIMS_REGISTER.md`.
- `marquis-honored-listee-2026.png` — Marquis Who's Who Honored Listee 2026 seal, from the
  founder's own Marquis listing assets (cropped from `marquis-honored-listee-2026-post.png`).

## Why

BSTS displays credentials as text-based components (see `/security` and
`/about`) rather than third-party logos. Certification bodies license their
badge artwork under specific terms, and displaying a logo without completing
the issuer's verification/consent process would undercut the exact
precision-of-claims policy this site is built on.

## Adding official badges later (after verification)

1. **CompTIA Security+** — the credential holder can generate a shareable
   verified badge through CompTIA's certification account (delivered via
   Credly). Download the badge asset from the holder's own Credly account and
   follow Credly's embedding/usage terms.
2. **AWS Certified AI Practitioner** — AWS certifications also issue
   verifiable digital badges through Credly, with usage guidelines in the
   AWS Certification Agreement. Use the badge issued to the credential
   holder's account only.
3. Place the downloaded asset in this folder (SVG or PNG, ideally with a
   transparent background), then update the credential components in
   `src/app/(marketing)/security/page.tsx` and
   `src/app/(marketing)/about/page.tsx` to render the image alongside —
   not instead of — the text description, with meaningful `alt` text.

## What must NOT go here

- Copied or screenshotted logos from certification-body websites
- NIST, SOC 2/AICPA, or ISO marks — these frameworks inform methodology and
  BSTS holds no certification from them; displaying their marks would imply
  otherwise (see `CLAIMS_REGISTER.md`)
- Any badge for a credential that has lapsed or cannot be verified
