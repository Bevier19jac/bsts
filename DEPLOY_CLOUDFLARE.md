# Deploying to Cloudflare Pages (free, $0)

The site is a pure static export — `npm run build` writes the complete
deployable site to `out/`. Any static host can serve it; Cloudflare Pages
free tier is the launch target and requires no credit card.

## One-time setup (dashboard, ~5 minutes)

1. Create a free Cloudflare account at dash.cloudflare.com (no card needed).
2. Push this repository to GitHub (free account is fine).
3. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git**, and select the repository.
4. Build configuration:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
5. (Optional) Environment variable `NEXT_PUBLIC_CONTACT_EMAIL` — set it to
   the public contact address to enable the form's "open in your email app"
   button. Leave unset for demo mode. This is a public value, not a secret.
6. Deploy. You get a free `https://<project>.pages.dev` URL with automatic
   HTTPS. Every push to the connected branch redeploys automatically.

## Alternative: direct upload (no GitHub)

```bash
npm run build
npx wrangler pages deploy out --project-name=bsts
```

`wrangler` will prompt for a free-account login on first use.

## After the first deploy

- Update `src/lib/site.ts` → `url` to the real `*.pages.dev` address (it
  feeds canonical metadata, sitemap.xml, robots.txt, and JSON-LD), then push.
- Verify `/sitemap.xml` and `/robots.txt` resolve.
- Run a Lighthouse pass against the deployed URL.

## Portability (no lock-in)

Nothing in the project is Cloudflare-specific. The same `out/` directory
deploys unchanged to GitHub Pages, Netlify's free tier, or any web server
that can serve files. `trailingSlash: true` is set so every route is a
directory with an `index.html`, which keeps deep links working on dumb
static hosts.

## Custom domain (later, optional)

A custom domain is the only step that ever costs money (the domain itself).
Cloudflare Pages attaches one for free: **Pages project → Custom domains →
Add**, then follow the DNS instructions. Not required for launch — the
`pages.dev` address is production-grade with HTTPS.
