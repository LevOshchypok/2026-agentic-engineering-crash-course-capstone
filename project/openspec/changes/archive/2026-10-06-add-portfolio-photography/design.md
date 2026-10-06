# Design

## Context

`app/portfolio/page.tsx` is currently a client component (`"use client"`, for `useLeadCapture()`) rendering a static `PORTFOLIO` array of 3 placeholder items. There is no `next/image` usage anywhere in this codebase yet, and no interactive/stateful UI component beyond `LeadCaptureModal`. Source photos live in `LelekaStore/levada-minimal-site/photos/<job>/` (untracked, per `git status`), with opaque filenames (UUIDs, Telegram export IDs). `Dockerfile` already copies `public/` verbatim into the standalone build, so no deployment changes are needed once assets live there.

See `proposal.md` - Why / What Changes for motivation and scope; see the `levada-site/portfolio` spec delta for the exact behavior contract.

## Goals / Non-Goals

**Goals:**
- Serve the 16 real photos from `public/`, organized so each job's photos are easy to find and reference from code.
- Render each job as a section with a hero photo + tappable thumbnail strip (first client-side interactive gallery pattern in this codebase).
- Keep the data model a plain in-file array, per the explicit decision to hand-edit code for each new job for now.
- Bring `docs/PRD.md`, `docs/follow-ups.md`, and `docs/design-system.md` back in sync with reality (placeholder decision resolved).

**Non-Goals:**
- No generic/self-serve content pipeline (folder-scan, CMS, sidecar metadata files) — explicitly deferred by the user to a later change.
- No lightbox/full-screen viewer, pinch-zoom, or swipe-gesture support — the hero+thumbnail strip is the full interaction for this change.
- No changes to the calculator, lead-capture flow, or pricing logic.
- No image CDN/remote optimization service — local files served via Next.js's built-in static asset handling and `next/image`.

## Decisions

**Asset location: `public/portfolio/<job-slug>/<photo-slug>.<ext>`, not a static `import`.**
Next.js can serve images either via `public/` (referenced by URL string) or via a static `import` (which lets `next/image` infer intrinsic width/height automatically). Each job has 3-5 photos of *different* aspect ratios used interchangeably as hero or thumbnail, so a plain `public/` path plus an explicit `{ width, height }` recorded per photo in the data array is simpler than 16 named imports, and matches how a future generic/folder-driven mechanism would likely also address images (by path, not by import). Intrinsic dimensions are already known from this session's inspection (see per-photo list below) and get hardcoded into the data array — no runtime image-probing needed.

**Filenames: descriptive slugs, not the original UUID/export names.**
`70776f7b-7259-491a-8edc-30d4afec6001.jpeg` etc. carry no meaning and would make the data array unreadable. Rename on move, e.g. `public/portfolio/medicover-journal/cover-stack.jpg`. The mapping from old → new name is recorded in tasks.md so the move is a mechanical, checkable step.

**Job slugs and order (top to bottom on the page):**
1. `jeanne-darc` — Жанна д'Арк на кострищі / Жанна д'Арк (5 photos)
2. `medicover-journal` — Обмінна карта · Щоденник вагітності (3 photos)
3. `english-construction` — English Construction 3 (with Kahoots!) (4 photos)
4. `vasyl-dutka-album` — Василь Дутка — Графіка · Малярство · Скульптура (4 photos)

Initially shipped in the order the client jobs were provided; reordered to lead with `jeanne-darc` per explicit owner request after review.

**Data shape:**
```ts
type PortfolioPhoto = { src: string; width: number; height: number; alt: string };
type PortfolioItem = {
  slug: string;
  title: string;       // no client/brand name per the branding decision (job 1)
  spec: string;         // "А5 · скоби · 300 крейда" style, existing "·"-joined string convention
  price: string;        // "60 грн/прим." or "за запитом"
  photos: PortfolioPhoto[]; // first photo is the default hero
};
```
This mirrors the existing `PORTFOLIO` array's flat-object style (see `docs/mockup/components/Portfolio.jsx`) rather than introducing a new content-modeling layer, consistent with the "plain data array, edit code for now" decision.

**Hero + thumbnail interaction: local `useState` per item, no new dependency.**
Each portfolio item card manages its own `selectedPhotoIndex` state (defaults to `0`). Tapping a thumbnail updates that item's state only. This is plain React state — no gallery/lightbox library needed for a 4-item, single-select-per-item interaction. `app/portfolio/page.tsx` already is a client component, so no new client-boundary is introduced; the per-item state can live in a small child component (e.g. `PortfolioItemCard`) so each item's selection is independent.

**Price badge fallback:** literal string `"за запитом"` for `english-construction`, following the existing site convention for undisclosed pricing (used elsewhere for calculator line items per `docs/PRD.md` §7).

**Client branding (Medicover):** the job's `title`/`spec`/`price` copy will not name Medicover; the photos themselves (which show the client's printed logo on the physical product) are used as-is, per the explicit decision that showing the printed product is fine but naming the client in site copy is not.

## Risks / Trade-offs

- **[Risk] Hardcoded `{width, height}` per photo can drift if a photo file is later swapped without updating the array.** → Mitigation: this is the same risk any static-import-free `next/image` usage carries; acceptable given the small, hand-edited array and the explicit choice not to build tooling for this yet.
- **[Risk] 16 full-resolution JPEGs (~2.8 MB total) added to `public/` grow the deployed image and page weight.** → Mitigation: `next/image` serves responsively-sized, re-encoded variants at request time regardless of source file size, so page-weight impact is bounded by rendered size, not source size; no separate pre-optimization step is needed for this change.
- **[Risk] Four sections × up to 5 thumbnails each is more visual density than the rest of the site's "stacked, generous spacing" cards.** → Mitigation: accepted explicitly by the user when choosing the hero+thumbnail layout (Option B) over a full-width photo stack.

## Migration Plan

1. Move and rename the 16 files from `LelekaStore/levada-minimal-site/photos/**` into `LelekaStore/levada-minimal-site/public/portfolio/<job-slug>/` per the mapping in tasks.md.
2. Delete the now-empty `photos/` folder (currently untracked, so this is a plain filesystem cleanup, not a git-tracked removal).
3. Replace `PORTFOLIO` and the card markup in `app/portfolio/page.tsx`.
4. Update `docs/mockup/components/Portfolio.jsx` for consistency with the shipped component (it's a reference file, not runtime code, but the file header explicitly says "swap `note`/`placeholder` for a real `<Image>` once photography exists" — that condition is now met).
5. Update `docs/PRD.md` §6.4 and §11.6, `docs/follow-ups.md`, and the "placeholder for v1" phrase in `docs/design-system.md`.

No rollback concerns beyond a normal revert — this is a static-content change with no data migration, no API, and no schema.
