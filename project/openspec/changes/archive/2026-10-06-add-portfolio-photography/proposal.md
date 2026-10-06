# Proposal

## Why

`/portfolio` on `levada-minimal-site` ships with three generic placeholder cards ("поставте заглушки" per the v1 design brief). Real photography for four completed client jobs is now available, and the open question in `docs/PRD.md` §11.6 ("timeline for replacing placeholder portfolio images with real photography") can be resolved now instead of later.

## What Changes

- Replace the three placeholder items in `app/portfolio/page.tsx` with four real past-work entries, each backed by real photos moved into `public/`:
  - Обмінна карта · Щоденник вагітності (А5, скоби, тираж 300 шт., 60 грн/прим.) — client name not shown in copy.
  - English Construction 3 (with Kahoots!) (А5, 200 стор., біндер, за запитом).
  - Василь Дутка — Графіка · Малярство · Скульптура (280 стор., тверда обкладинка, шиття, 1300 грн/прим.).
  - Жанна д'Арк на кострищі / Жанна д'Арк (А5, 185 стор., м'яка обкладинка, біндер, 180 грн/прим.).
- Each item shows every available photo for that job (3-5 each, 16 total) instead of one placeholder block, via a hero photo + tappable thumbnail strip (new interaction, client-side state).
- The corner badge switches from print-run count ("N прим.") to price per copy, with an explicit "за запитом" state for jobs where price isn't disclosed.
- Source images move from the untracked `photos/` folder into `public/portfolio/<job-slug>/`, renamed from opaque UUID/export filenames to descriptive slugs.
- Update `docs/PRD.md` §6.4 and §11.6, `docs/follow-ups.md`, and the "placeholder for v1" line in `docs/design-system.md` to reflect that placeholder imagery has been replaced.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `levada-site/portfolio`: portfolio items show real per-job photo galleries (hero + thumbnails) instead of a placeholder image area, and the spec-tag badge shows price per copy (or "за запитом") instead of print quantity.

## Impact

- `app/portfolio/page.tsx` — full rewrite of the `PORTFOLIO` data array and card markup.
- `public/portfolio/**` — new static image assets (moved/renamed from `LelekaStore/levada-minimal-site/photos/`, which is removed).
- `docs/mockup/components/Portfolio.jsx` — reference mockup, updated for consistency (not runtime code).
- `docs/PRD.md`, `docs/follow-ups.md`, `docs/design-system.md` — documentation updates reflecting the placeholder decision is resolved.
- No backend, API, or pricing-calculator changes; this is presentation-only content on a static marketing page.
