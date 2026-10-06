# PRD — Levada Minimal Site (levada-minimal-site)

**Status:** Draft v0.1
**Owner:** Lev Oshchypok
**Last updated:** 2026-09-17

## 1. Summary

`levada-minimal-site` is a new, standalone, mobile-first marketing and lead-generation website for **Левада** (Levada), a book/magazine printing house with 18 years of experience. It is **not** a replacement for `LelekaStore` (the full storefront with catalog/basket/checkout) — it is a lighter, faster site whose only jobs are: build trust quickly, give visitors an instant price estimate, and capture a lead (callback request) that staff finish by phone. No online payment, no customer accounts, no shopping cart.

Design reference: Claude Design mockup — *"Левада - мокапи сайту"* (project: "Publishing service website mockups"), file `Левада - мокапи сайту.dc.html`.
URL: https://claude.ai/design/p/ce431d73-896c-4750-9efc-eed50d08e105

Repo location: `LelekaStore/levada-minimal-site/` (Next.js 16 / React 19 / TypeScript / Tailwind v4 — already scaffolded).

## 2. Problem / Opportunity

Levada currently has no lightweight public site of its own for driving new print-order leads. Prospective customers (self-publishing authors, small publishers, university staff) have no fast way to see indicative pricing or request a callback without going through the full internal CRM/storefront flow. A focused, fast-loading site that leads with price and experience, and converts visitors into phone leads, fills this gap and feeds the existing Leleka CRM pipeline.

## 3. Goals

- Communicate credibility fast: years of experience, minimum print run of 1 copy, short turnaround.
- Let a visitor get an instant, indicative price for a book/magazine print job before ever talking to staff.
- Convert visitors into leads via two clear calls to action, with zero account creation and zero online payment.
- Route every submitted lead into the existing Leleka backend/CRM so staff can follow up and take the order to completion there.

### Non-goals (explicitly out of scope for v1)

- Shopping cart, multi-item basket, or online checkout (that is `LelekaStore`'s job).
- Online payment processing.
- Customer accounts / login.
- Browsing a full service catalog (this site covers books/magazines/short-run only, not the whole Leleka catalog).
- Real portfolio photography — v1 ships with placeholder images (explicit decision from the design brief: "поставте заглушки").
- Multi-language support — Ukrainian only.

## 4. Target Users

1. **Self-publishing author** — wants to print a small run (1–500 copies) of a book, price-sensitive, wants a ballpark number before calling.
2. **Small publisher / imprint** — recurring orders, cares about consistent binding/cover quality, may need custom pricing for larger runs.
3. **University / academic staff** — need short-run course packs or training materials, often one-off, more likely to submit an on-request inquiry ("за запитом") than use the calculator.

## 5. Brand & Content Direction

(Captured from the design brief chat.)

- Name shown on site: **ЛЕВАДА**
- Language: Ukrainian only.
- Tone: "fast & practical" — restrained typography, lots of white space, black text.
- Accent color: `#2f5d3a` (dark green), used for primary CTAs and highlighted prices.
- Platform priority: mobile-first. Desktop layout was not designed yet (see Open Questions).
- Services offered on this site: book printing, magazine printing, ISBN & distribution, short-run / print-on-demand.
- Pricing model: fixed packages with quantity breakpoints, not per-quote-only.

## 6. Information Architecture / Pages

### 6.1 Homepage

The design explored three directions; a final direction (or hybrid) still needs to be chosen — see Open Questions.

- **Direction A — typographic, price visible immediately:** headline "Друкуємо книги та журнали", subheadline listing cover/binding/format flexibility, primary CTA `Замовити дзвінок` + secondary CTA `Розрахувати вартість`, a 3-stat trust bar (years of experience / minimum print run / turnaround days), a pricing snapshot table, a "Що друкуємо" (What we print) card grid, a testimonial block, and a closing CTA band ("Надішліть макет — порахуємо сьогодні").
- **Direction B — bold hero, large "cover" image block:** dark hero section with a large placeholder image area standing in for a book cover, same two CTAs, followed by the same "Що друкуємо" cards.
- **Interactive variant — embedded mini price teaser:** a 3-step chooser directly on the homepage (edition type → cover → binding) that shows an indicative price and links into the full calculator for an exact number, plus a "Чому Левада" (Why Levada) proof-points block (years of experience, minimum print run, average review rating).

Common homepage building blocks regardless of chosen direction:
- Trust bar / proof points (3 stats — exact set to confirm, see Open Questions).
- "Що друкуємо" (What we print) cards: Книги (від 160 грн/прим.), Журнали (від 180 грн/прим.), ISBN і розповсюдження (за запитом), Малий наклад і друк на вимогу (мін. наклад — 1 прим.).
- Pricing snapshot (flagship packages, see §7).
- Testimonial block (placeholder copy for v1).
- Two primary CTAs repeated at top and bottom: `Замовити дзвінок` (primary) and `Розрахувати вартість` (secondary).

### 6.2 Calculator page ("Розрахувати вартість")

A dedicated screen with every pricing input and a price pinned to the bottom of the viewport while scrolling.

Fields:
| Field | Type | Options |
|---|---|---|
| Тип видання | toggle | Книга / Журнал |
| Наклад | slider + numeric | 1 – 500+ |
| Формат | dropdown | a4, … (full list TBD) |
| Сторінок | number input | free entry |
| Обкладинка | toggle | М'яка / Тверда |
| Кріплення | toggle group | Біндер / Шиття / Пружина |
| Папір | toggle group | Офсет 80 / Офсет 100 / Крейда 130 |
| Колірність | toggle | Ч/б / Колір |
| Ламінація / оздоблення | toggle group | Без / Матова / Глянець / Фольга |

Behavior:
- Price recalculates live as fields change and is shown as unit price × quantity = total (e.g. "200 грн × 150 прим. = 30 000 грн").
- Sticky bottom bar holds the computed price plus the primary CTA `Замовити дзвінок`, which carries the selected configuration into the lead submission.
- The mockup also shows a secondary `Макет` (upload layout file) button next to the CTA — treated as a **possible v2 feature**, not committed for v1 (see Open Questions).
- Full pricing logic for every field combination is not yet defined by the business — only two flagship configurations have confirmed prices today (§7). This must be resolved before the calculator can ship with real numbers.

### 6.3 Lead capture / "Замовити дзвінок"

Triggered from the homepage, the calculator, or the closing CTA band. Not a full account/order flow — a lightweight callback request.

- Fields: name, phone number, optional free-text note.
- When triggered from the calculator, the selected configuration (edition type, quantity, format, pages, cover, binding, paper, color, finishing) is attached to the submission automatically.
- On submit: creates a lead in the existing Leleka backend for staff to call back and finalize price/order manually. No payment is collected here or anywhere on this site.
- This matches the "request/quote" model decided for this PRD (see §9) rather than a self-serve checkout.

### 6.4 Portfolio ("Наші роботи")

- List of past work items, grouped by client job; each item shows a real photo gallery for that job (hero photo + tappable thumbnail strip), a short description, and spec tags (cover, binding, format, pages), e.g. "А5 · скоби · 150 крейда + 80 офсет (Pantone) · обкладинка 300 крейда".
- Ships with real photography for 4 completed jobs (see `openspec/changes/add-portfolio-photography`); the corner badge shows price per copy, or "за запитом" where the client's price isn't disclosed, instead of a print-run count.

### 6.5 Service card component

Three visual treatments were explored for reuse in the "Що друкуємо" grid and elsewhere:
1. Price-row — name + price inline, minimal.
2. Tag card — name, price, and attribute tags (e.g. "шиття", "а4", "100 с.", "ламінація") with a starting price for a larger quantity.
3. Image card — placeholder photo, description, price, and a `Розрахувати` CTA.

One treatment should be chosen for consistency, or treatments can be mixed intentionally by context (compact list vs. featured grid) — to confirm during implementation.

## 7. Pricing (confirmed so far)

| Package | Cover | Binding | Format | Pages | Up to 100 copies | 100+ copies |
|---|---|---|---|---|---|---|
| Soft cover book | М'яка | Біндер | A4 | 100 | 180 грн/прим. | 160 грн/прим. |
| Hard cover book | Тверда | Шиття | A4 | 100 | 220 грн/прим. | ~200 грн/прим. *(unconfirmed — value was truncated in source chat, needs verification)* |

Homepage "Що друкуємо" starting prices:
- Книги — від 160 грн/прим.
- Журнали — від 180 грн/прим.
- ISBN і розповсюдження — за запитом (on request)
- Малий наклад і друк на вимогу — мін. наклад 1 прим., за запитом
- Individual / academic training materials — за запитом (on request)

Everything outside these two flagship packages (paper type, lamination/finishing, spiral binding, other formats/page counts, quantities above 500) has no confirmed price yet and is required input from the business before the calculator can compute real numbers (see Open Questions).

## 8. Non-functional Requirements

- **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 — matches the existing scaffold in `LelekaStore/levada-minimal-site/`.
- **Mobile-first, responsive:** design was produced mobile-only; a desktop layout still needs design work before desktop launch.
- **Performance:** should load fast enough to serve as a paid-traffic landing page (good Core Web Vitals); prefer static/SSR rendering over heavy client bundles.
- **Accessibility:** sufficient color contrast (especially green-on-white CTAs), tap targets ≥44px, semantic HTML/landmarks.
- **SEO:** basic on-page SEO (titles, meta descriptions, heading structure) since this is a public marketing surface.
- **Localization:** Ukrainian only for v1; no i18n framework required.
- **Analytics:** CTA clicks, calculator starts/completions, and lead submissions should be trackable (tool TBD).

## 9. Technical Approach / Backend Integration

- This site does **not** get its own database or order pipeline. Leads/callback requests should be sent to the existing Leleka backend (`LelekaWEBApiV1`) so they land in the same CRM staff already use.
- The repo already has an OpenSpec capability, `storefront-customer-requests`, that matches this need closely: it creates a customer request from a category-led inquiry without a specific service selection, with optional file attachments, reviewable by CRM users. **Recommendation:** extend/reuse this capability (e.g. a dedicated category/source for `levada-minimal-site`) rather than building a parallel lead pipeline, keeping the calculator's selected configuration in the free-text/notes payload until a more structured field set is agreed.
- No basket/checkout integration is needed (explicitly out of scope), so `storefront-direct-order` / `storefront-basket` capabilities are not relevant to this site.
- Per repo convention, backend-touching work should go through an OpenSpec proposal (`openspec/changes/...`) before implementation, consistent with how other storefront capabilities were added.

## 10. Success Metrics (draft — to validate with business)

- Number of callback/quote requests submitted per week.
- Calculator start-to-submit completion rate.
- Traffic-to-lead conversion rate, especially from paid campaigns if run.

## 11. Open Questions / Decisions Needed

1. Which homepage direction (A, B, the interactive mini-calculator variant, or a hybrid) should actually be built, and what should the desktop layout look like (not yet designed)?
2. What is the complete price list (or pricing formula) covering every calculator field combination — paper type, lamination/finishing, spiral binding, other formats/page counts, and quantities above 500? Only two flagship packages are priced today.
3. Confirm the hard-cover 100+ copies price (truncated/unconfirmed in the source design brief — shown as "~200 грн" above).
4. Is the `Макет` (upload print-ready file) button in the calculator part of v1, or a later addition?
5. Exact technical contract for lead submission: extend `storefront-customer-requests`, or a new endpoint — and which CRM queue/category new leads should land in.
6. Where "average rating" (4.9) proof-point data would come from if used. (Placeholder portfolio imagery has been replaced with real photography — see §6.4.)
7. Footer/legal content: company registration details, phone number(s), business hours, and any privacy notice needed for the lead form.
8. Analytics/tracking stack and any campaign-tagging requirements.
9. Hosting/deployment target and domain for this site (same Docker infra as other services, or elsewhere).
10. Which 3rd trust-bar stat to lead with — the design shows two different candidates ("5 днів на тираж" vs. "4,9 середня оцінка") — and whether both should appear in different places.
