# Clickable mockup

A prototype of the Levada mockup we pulled from Claude Design (see `../PRD.md` and
`../design-system.md`), built to actually click through before writing the real
implementation — not a screenshot, an interactive one.

## Just want to look at it?

Open `index.html` directly in any browser (double-click it, or `open index.html`
on macOS) — no `npm install`, no dev server. It loads React, ReactDOM, and
Babel Standalone from cdnjs and compiles the JSX in the browser, so all it
needs is an internet connection to fetch those three scripts once.

What you can click through:
- **Головна** — the two explored hero directions (А: typographic/price-first,
  Б: dark hero with an image placeholder) behind a switcher, plus the trust
  stats, pricing snapshot, "Що друкуємо" cards, testimonial, and closing CTA.
- **Калькулятор** — every field from the design brief (тип видання, наклад,
  формат, сторінок, обкладинка, кріплення, папір, колірність, оздоблення),
  with a live-updating price pinned to the bottom.
- **Портфоліо** — placeholder photo blocks + spec tags, per the "заглушки"
  decision in the brief.
- **Замовити дзвінок** — opens from any screen; when opened from the
  calculator it shows the selected configuration attached, and "submitting"
  shows a confirmation state (no backend call — it's a prototype).

## What's real vs. illustrative

- Colors, spacing, and component patterns follow `../design-system.md`.
- Copy (headlines, prices shown, package names) is taken directly from the
  design brief / PRD.
- **The calculator's price is not the real Levada price list.** Only the two
  flagship packages in `docs/PRD.md` §7 are confirmed; everything else
  (paper, lamination, color, binding surcharges, per-page scaling) is an
  invented placeholder formula so the screen is interactive — see the big
  comment in `components/pricing.js`. This is flagged as an open question in
  the PRD (§11, item 2) and needs real numbers from the business before it
  ships.
- The lead form doesn't submit anywhere real. The PRD recommends wiring it to
  the existing `storefront-customer-requests` capability (§9) — that's next
  implementation work, not part of this mockup.
- Desktop layout isn't addressed — this is a mobile-frame prototype only,
  matching the design brief (which was mobile-only too).

## Folder layout

```
docs/mockup/
├── index.html         ← open this one; fully self-contained, runnable
├── styles.css          ← plain CSS used only by index.html
└── components/         ← porting reference for the real Next.js app
    ├── Home.jsx
    ├── Calculator.jsx
    ├── Portfolio.jsx
    ├── ServiceCard.jsx
    ├── CallbackModal.jsx
    └── pricing.js
```

`index.html` + `styles.css` are a zero-setup demo you can open right now —
they use plain CSS, not Tailwind, so there's nothing to install.

`components/*.jsx` are a **separate, cleaner reference** for when real
implementation starts in `app/`: same screens and logic, written with
`"use client"`, Tailwind classes, and the actual design tokens already wired
into `app/globals.css` (`bg-brand`, `text-ink`, `bg-surface`, etc.), so they
can be copied into real routes with minimal changes. They are not imported or
built by anything today — Next.js only compiles what's under `app/`.

## Known gaps (carried over from the PRD's open questions)

- Which homepage direction (А, Б, or a hybrid) actually ships, and what the
  desktop layout looks like.
- The real pricing formula/price list for every calculator combination.
- Whether the "Макет" (upload print file) button from the original mockup is
  in v1 scope.
- The exact backend contract for submitting a lead.
