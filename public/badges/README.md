# Credential badge assets

This folder intentionally ships **empty of badge images**.

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
