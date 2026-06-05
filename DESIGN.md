# DESIGN.md — "Engineered Confidence"

Dark, heavy-duty industrial. Reads as built infrastructure, not a luxury brochure.
All color is OKLCH; no pure `#000` / `#fff`; neutrals are tinted toward steel-blue.

## Theme
Dark. Scene: an operator/developer reviewing a property on a job-site tablet at
dusk. The mood is rugged confidence, so the surface is graphite/concrete-dark.

## Color (tokens in `app/globals.css`)
| Role | Token | OKLCH |
|---|---|---|
| Base | `--base` | `0.16 0.012 250` |
| Base 2 | `--base-2` | `0.19 0.012 250` |
| Surface | `--surface` | `0.22 0.012 250` |
| Line | `--line` | `0.33 0.012 250` |
| Text | `--text` | `0.94 0.008 250` |
| Muted | `--muted` | `0.62 0.013 250` |
| Accent (safety amber) | `--amber` | `0.79 0.16 68` |
| Blueprint cyan (hairlines) | `--blueprint` | `0.74 0.08 228` |
| OK / available | `--ok` | `0.74 0.15 150` |

Strategy: Restrained-to-Committed. Dark surface dominates; amber carries CTAs,
active states, and key data (~10-15%); cyan only as hairlines/grid. Map pins use
amber (fuel), blueprint (retail), and green (government) as a functional legend.

## Typography
- Display: **Bebas Neue** — big condensed headlines, hero, section titles.
- Condensed UI: **Archivo** (600-800) — buttons, nav, labels.
- Body: **Inter** — paragraphs, capped 65-75ch.
- Data/mono: **IBM Plex Mono** — eyebrows, specs, coordinates, tags.
- Hierarchy via scale + weight; ratio >= 1.25 between steps.

## Texture & motion
- `.bp-grid` faint blueprint grid; `.concrete` subtle noise overlay; `.hazard-rule`
  thin amber/graphite diagonal divider used sparingly.
- Motion: ease-out only (expo / quint), no bounce. Never animate layout properties.
  Reveal-on-scroll via `components/ui/Reveal.tsx`.

## Components
`.btn` (amber / ghost), `.tag`, `.surface-panel`, `.eyebrow`, `.link-underline`,
`.pin*` (map markers). Cards used only where they are the best affordance; never
nested. No side-stripe borders, no gradient text, no glassmorphism by default.
