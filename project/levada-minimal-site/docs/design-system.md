# Levada — Design System

**Source:** Claude Design mockup *"Левада - мокапи сайту"* (project: "Publishing service website mockups").
URL: https://claude.ai/design/p/ce431d73-896c-4750-9efc-eed50d08e105
**Status:** Working reference extracted from the mockup + design brief. A few exact values (marked ⚠️) are close approximations read off screenshots, not pixel-exact — treat them as a starting point, not a locked spec.

This is the shared source of truth for building `levada-minimal-site` pages/components. Code-level tokens matching this doc live in `app/globals.css` (Tailwind v4 `@theme` block) — use the Tailwind utilities they generate (`bg-brand`, `text-ink`, etc.) rather than hardcoding hex values in components.

## 1. Brand basics

- Name shown on site: **ЛЕВАДА**
- Language: Ukrainian only (`lang="uk"`) — no i18n for v1.
- Tone: fast & practical — restrained typography, lots of white space, confident and short copy.
- Platform priority: mobile-first (the mockup itself is mobile-only; desktop layout is not yet designed).

## 2. Color tokens

| Token | Value | Usage |
|---|---|---|
| `--brand` | `#2f5d3a` | Confirmed from the design brief. Primary CTA fill, price highlights (e.g. the discounted "160 грн" tier), proof-stat numbers in some layouts, slider fill, links. |
| `--brand-dark` ⚠️ | `#24492c` | Derived hover/active shade for the brand color. |
| `--ink` | `#14140f` | Primary text, headlines. Near-black rather than pure `#000` (warm black). |
| `--paper` ⚠️ | `#f5f4f0` | Page background — a warm off-white, not pure white. |
| `--surface` | `#ffffff` | Card/panel background, sits on top of `--paper`. |
| `--muted` ⚠️ | `#6b6a64` | Secondary text, helper copy, unit labels next to big numbers. |
| `--line` ⚠️ | `#e3e1da` | Hairline borders on cards, dividers between price rows. |
| `--dark` | `#14140f` | Background for deliberately dark sections (hero variant B, testimonial block) — see §5. |
| `--dark-foreground` | `#ffffff` | Text/icon color on `--dark` sections. |

Green is used sparingly and deliberately — as a signal (best price, key stat, primary action) — not as a background wash. Most of the UI is black text on white/off-white.

## 3. Typography

- Font: Geist Sans (already wired up via `next/font/google` in `app/layout.tsx`) as the working default — the mockup doesn't specify an exact typeface, so this is a reasonable placeholder to confirm later, not a confirmed brand font.
- Headlines: large, bold, tight line-height (e.g. "Друкуємо книги та журнали"). Two-line hero headlines are expected on mobile.
- Body copy: regular weight, relaxed line-height, `--muted` or `--ink` depending on emphasis.
- Micro-labels / eyebrows: uppercase, letter-spaced, small size — used for section labels and field labels (e.g. "ДРУКАРНЯ · ВІД 1 ПРИМІРНИКА", "ТИП ВИДАННЯ", "ЗА ПРИМІРНИК", "ОБКЛАДИНКА"). Treat this as a reusable `.eyebrow` text style.
- Numerals (prices, stats): bold, set apart from their unit, which appears smaller/lighter beside or below (e.g. big "18" + small "років досвіду"; "160" **грн** with "грн" smaller). Use tabular/lining figures where possible so numbers in a row line up.

## 4. Spacing & shape

- Cards and buttons share the same moderate corner radius — noticeably rounded but not pill-shaped. Use `1rem` (`rounded-2xl` in Tailwind) as the default (⚠️ approximate).
- Cards: `--surface` background, 1px `--line` border, generous internal padding (mockup reads as roughly 24px), stacked with clear vertical rhythm rather than dense grids.
- Buttons: full-width on mobile, comfortable tap height (~52–56px), same radius as cards.

## 5. Component patterns

**Primary / secondary buttons (light sections)**
- Primary: solid `--brand` fill, white text — e.g. `Замовити дзвінок`.
- Secondary: `--surface` fill (or transparent), `--ink`/`--line` border, `--ink` text — e.g. `Розрахувати вартість`.

**Buttons on dark sections** (hero B, testimonial band)
- Primary inverts to solid white fill with `--ink` text.
- Secondary becomes `--dark` fill with a light/white border and white text.
- This is a deliberate content-section treatment, not a system dark-mode toggle — see the note in §6.

**Toggle / segmented controls** (used throughout the calculator: Тип видання, Обкладинка, Кріплення, Папір, Колірність, Ламінація)
- Unselected: `--surface` fill, `--line` border, `--ink` text.
- Selected: solid `--ink` (black) fill, white text — **not** the brand green. Green is reserved for CTAs, price emphasis, and proof stats, so it doesn't compete with the selection state.

**Slider** (Наклад / print-run quantity)
- Thin track, `--brand` fill up to the handle, circular handle with a visible outline, current value shown as a large number to the right of the label (e.g. "150 прим.").

**Price display**
- Unit price × quantity = total, shown as `200 грн × 150 прим.  30 000 грн`, with the total emphasized (larger/bolder) and pinned to the bottom of the viewport on the full calculator screen so it's visible while scrolling through options.

**Proof / trust stats**
- A row of 3 stats, each a big number + small caption underneath (e.g. "18 / років досвіду", "1 / мін. наклад", "5 / днів на тираж"). Two variants were explored — plain `--ink` numerals, and `--brand`-colored numerals — pick one for consistency (open question, also flagged in the PRD).

**Cards ("Що друкуємо", portfolio, service-card treatments)**
- Title + short description + price (or "за запитом"), in a bordered `--surface` card. Portfolio cards add a photo gallery (hero photo + tappable thumbnail strip, one selected photo shown at a time) and spec tags (cover / binding / format / pages).

## 6. Implementation notes for `levada-minimal-site`

- Tokens above are implemented as CSS variables + a Tailwind v4 `@theme` block in `app/globals.css`, so components should use the generated utilities (`bg-brand`, `text-ink`, `bg-paper`, `bg-surface`, `text-muted`, `border-line`, `bg-dark`, `text-dark-foreground`) instead of one-off hex values.
- The default `create-next-app` behavior of flipping `--background`/`--foreground` under `prefers-color-scheme: dark` has been removed. This is a branded marketing site with its own deliberate light theme and occasional dark *sections* (hero B, testimonial) — it should not silently invert based on the visitor's OS theme.
- `app/layout.tsx`'s `<html lang>` should be `"uk"` to match the Ukrainian-only content decision.
- Everything marked ⚠️ above (exact grays, exact radius, exact hover shade) is a reasonable working default, not a confirmed brand spec — nothing in the design brief nailed these down precisely. Revisit if/when the business provides an actual brand guide, or if we get raw access to the mockup's source instead of reading it off screenshots.
