# Tasks

## 1. Move and rename source photos into `public/`

- [x] 1.1 Create `LelekaStore/levada-minimal-site/public/portfolio/{medicover-journal,english-construction,vasyl-dutka-album,jeanne-darc}/` and move+rename the 16 source files per the mapping below (hero photo listed first per job), then verify `find public/portfolio -type f | wc -l` reports `16` and the old `photos/` folder is gone:

  **medicover-journal** (from `photos/ex1/`):
  - `photo_5303203159729709374_y.jpg` (720x1280) → `cover-stack-lifestyle.jpg` (hero)
  - `70776f7b-7259-491a-8edc-30d4afec6001.jpeg` (1024x1280) → `collage-details-1.jpg`
  - `88a64890-f237-400e-8c03-3b993ecb0c29.jpeg` (853x1280) → `collage-details-2.jpg`

  **english-construction** (from `photos/ex2_eng/`):
  - `photo_5303203159729709407_y.jpg` (960x1280) → `cover-closeup.jpg` (hero)
  - `photo_5303203159729709408_y.jpg` (960x1280) → `stack-with-plant.jpg`
  - `photo_5303203159729709405_y.jpg` (960x1280) → `two-stacks.jpg`
  - `photo_5303203159729709406_y.jpg` (1280x960) → `production-floor.jpg`

  **vasyl-dutka-album** (from `photos/ex3_albom/`):
  - `1e53f47d-01cc-424b-923f-b7119cfebd6a.jpeg` (1280x960) → `cover-front.jpg` (hero)
  - `1397f674-c5d2-4879-9b5e-0948ea73e95d.jpeg` (1280x960) → `spread-still-life.jpg`
  - `f2416860-ea59-4947-ad06-9e7c91809dad.jpeg` (1280x960) → `spread-hutsul-landscapes.jpg`
  - `photo_5303203159729709419_y.jpg` (1280x960) → `spread-landscapes.jpg`

  **jeanne-darc** (from `photos/ex3_JannaDark/`):
  - `photo_5303203159729709440_y.jpg` (1024x1280) → `cover-front.jpg` (hero)
  - `photo_5303203159729709448_y.jpg` (1024x1280) → `stack-flatlay.jpg`
  - `f2902f89-dcb5-497c-bee4-78042b520d90.jpeg` (1024x1280) → `cover-angled.jpg`
  - `photo_5303203159729709437_y.jpg` (1024x1280) → `spread-author-bio.jpg`
  - `photo_5303203159729709438_y.jpg` (1024x1280) → `spread-decorative.jpg`

- [x] 1.2 Remove the now-empty `LelekaStore/levada-minimal-site/photos/` directory and verify `git status` no longer lists it as untracked.

## 2. Rebuild the portfolio page

- [x] 2.1 In `app/portfolio/page.tsx`, replace the `PORTFOLIO` array with the four real items (`medicover-journal`, `english-construction`, `vasyl-dutka-album`, `jeanne-darc`), each with `slug`, `title`, `spec`, `price`, and a `photos` array (`src`, `width`, `height`, `alt`) built from the paths and dimensions in Task 1.1, hero photo first — verify the file type-checks (`npx tsc --noEmit`).
  - `medicover-journal` title/spec/price: "Обмінна карта · Щоденник вагітності" / "А5 · скоби · 150 крейда + 80 офсет (Pantone) · обкладинка 300 крейда" / "60 грн/прим." — no client name anywhere in the copy.
  - `english-construction` title/spec/price: "English Construction 3 (with Kahoots!)" / "А5 · 200 стор. · біндер · обкладинка 250 крейда" / "за запитом".
  - `vasyl-dutka-album` title/spec/price: "Василь Дутка · Графіка · Малярство · Скульптура" / "280 стор. 150 крейда, колір · тверда обкладинка · шиття" / "1300 грн/прим.".
  - `jeanne-darc` title/spec/price: "Жанна д'Арк на кострищі / Жанна д'Арк" / "А5 · 185 стор. · м'яка обкладинка · біндер" / "180 грн/прим.".
- [x] 2.2 Add a `PortfolioItemCard` component (in `app/portfolio/page.tsx` or a new `components/PortfolioItemCard.tsx`, matching the codebase's existing convention of colocating simple presentational components under `components/`) that holds `selectedPhotoIndex` state (default `0`), renders `photos[selectedPhotoIndex]` as a `next/image` hero at a fixed aspect-ratio container, and renders the rest as a row of tappable thumbnail `next/image`s that update the selection — verify by reading the rendered output for a `role="button"`/`<button>` per thumbnail with an active-state affordance for the selected one.
- [x] 2.3 Render the price/"за запитом" value in the existing top-right badge position (replacing the old `qty` field) and keep the existing spec-tag string styling — verify the four cards render with a bordered `--surface` card, spec string, and price badge matching `docs/design-system.md` §4-5 tokens.
- [x] 2.4 Run `npm run dev` in `LelekaStore/levada-minimal-site`, open `/portfolio` in a browser, and confirm for each of the 4 sections: the hero photo loads, tapping each thumbnail swaps the hero and shows the selected state, and the layout stays single-column and centered at both a mobile and a desktop viewport width (per the unmodified "Portfolio layout adapts from mobile to desktop" requirement).

## 3. Sync documentation

- [x] 3.1 Update `docs/PRD.md` §6.4 to describe the shipped real-photo galleries instead of "placeholder for v1", and update §11.6 (Open Questions) to remove/resolve the placeholder-photography question — verify by re-reading the section for no remaining "placeholder" wording about portfolio imagery.
- [x] 3.2 Remove the now-resolved "Real portfolio photography" line from `docs/follow-ups.md` — verify the file no longer references PRD §6.4/§11.6 placeholder photography.
- [x] 3.3 Update the "Portfolio cards add an image area (placeholder for v1)" line in `docs/design-system.md` §5 to describe the hero+thumbnail gallery pattern instead — verify by re-reading §5.
- [x] 3.4 Update `docs/mockup/components/Portfolio.jsx`'s header comment and `PORTFOLIO` data to match the shipped component (it explicitly says to do this "once photography exists") — verify the file no longer claims to be an unswapped placeholder reference.

## 4. Final checks

- [x] 4.1 Run `npm run lint` and `npm run test` (vitest) in `LelekaStore/levada-minimal-site` and verify both pass. (`npm run test` passes cleanly. `npm run lint` fails on 3 pre-existing `react/no-unescaped-entities` errors in `docs/mockup/components/CallbackModal.jsx` and `Home.jsx` — confirmed via `git status` as untouched by this change and out of its scope; user explicitly accepted leaving them as-is.)
- [x] 4.2 Run `npm run build` in `LelekaStore/levada-minimal-site` and verify the build succeeds with the new `public/portfolio/**` assets and updated `app/portfolio/page.tsx`.
