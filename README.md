# Petron — World-Class Redesign

A full-stack rebuild of [petron-us.com](https://www.petron-us.com/), moving off Wix to a fast,
content-managed Next.js site. Two flagship interactive features lead the experience:

1. **Interactive nationwide project map** (`/projects`) — a dark MapLibre map with glowing,
   color-coded pins for every build. Filter by type and client; click any pin for a case-study
   drawer with scope, client, and photos. Deep-linkable (`/projects?project=<slug>`).
2. **Commercial real-estate listings browser** (`/properties`) — filter by type, square footage,
   and location; grid and live-map views with hover sync; per-property detail pages with a photo
   gallery, specs, location map, and a **Schedule a Tour** form that does real lead-gen.

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v4**
- **MapLibre GL** via `react-map-gl/maplibre` with a free CARTO dark basemap (no API key)
- **Sanity** CMS (embedded Studio at `/studio`) — optional; the site runs on local seed data
  until you connect a project
- **Resend** for inquiry/tour emails — optional
- **framer-motion** for motion, **zod** for validation

## Design system — "Engineered Confidence"

Dark, heavy-duty industrial: steel-tinted neutrals, a functional **safety amber** accent, and
**blueprint cyan** hairlines. OKLCH throughout, no pure black/white. Typography pairs **Bebas Neue**
(display) with **Archivo** (UI), **Inter** (body), and **IBM Plex Mono** (data). Full tokens live in
[`app/globals.css`](app/globals.css); rationale in [`DESIGN.md`](DESIGN.md) and [`PRODUCT.md`](PRODUCT.md).

## Getting started

```bash
npm install
npm run dev
# http://localhost:3000
```

No environment variables are required. The content layer in [`lib/content.ts`](lib/content.ts)
falls back to local seed data in [`lib/data`](lib/data), so the full site (map, listings, forms)
works out of the box.

## Connecting Sanity (optional)

1. Create a free project at [sanity.io](https://www.sanity.io/) and copy the project id.
2. Add to `.env.local` (see [`.env.example`](.env.example)):

   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_WRITE_TOKEN=token_with_write_access   # for logging inquiries
   ```

3. Visit `/studio` to edit Properties, Projects, Services, Tenants, and Site Settings. Schemas are
   in [`sanity/schemaTypes`](sanity/schemaTypes). Once content exists, the public site reads from
   Sanity automatically; otherwise it keeps using seed data.

> Seed content (scraped from the current site + realistic placeholders) lives in `lib/data`. To
> migrate it into Sanity, recreate the documents in the Studio or write an import script against the
> `writeClient`. Images currently use stable placeholders; replace with real photos in the Studio.

## Client logos (optional)

The "Trusted by national names" strip shows a real brand logo when one is
available, and a styled wordmark otherwise. Three ways to provide real logos:

1. **Per-tenant file** — drop an officially licensed asset in `public/logos/`
   and set `logo: "/logos/att.svg"` on that tenant (in `lib/data/site.ts` or the
   Sanity `tenant` document).
2. **Logo provider** — set `NEXT_PUBLIC_LOGODEV_TOKEN` (from [logo.dev](https://logo.dev))
   and logos auto-resolve from each tenant's `domain` (dark-theme variants).
3. **Leave it** — the wordmark fallback is on-brand and ships by default.

These are third-party trademarks; use officially provided/licensed assets and
confirm usage rights. The app never recreates or alters a logo.

## Email inquiries (optional)

Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, and `INQUIRY_FROM_EMAIL`. The `/api/inquiry` route
validates with zod, blocks spam (honeypot + rate limit), emails the right department, and logs a
lead document in Sanity when configured. With nothing configured, submissions are logged server-side
so they are never lost.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) (framework auto-detected as Next.js).
3. Add the optional env vars above in **Project Settings → Environment Variables**.
4. Deploy. `npm run build` is already green.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |

## Content sources

Client names, the real-estate portfolio (Common Point, Market Square, Union Station, King Fisher
Crossing, Emerald Square), services, and contact details are drawn from the current petron-us.com.
Exact addresses, lease rates, project coordinates, and photography are best-effort placeholders and
should be confirmed before launch — all editable in the Studio.
