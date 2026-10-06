# Proposal

## Why

Levada (a print house, part of the Leleka business) has no lightweight public site of its own for generating print-order leads: prospective customers have no fast way to see indicative pricing or request a callback without going through the full internal CRM/storefront flow. `LelekaStore/levada-minimal-site` is already scaffolded (Next.js 16, design tokens wired) but contains no real pages — this change builds the actual mobile-first marketing/lead-gen site defined in `docs/PRD.md`, so it can start feeding leads into the existing Leleka CRM pipeline.

## What Changes

- Build the homepage (Direction A — typographic, price-first): headline, two CTAs (`Замовити дзвінок` / `Розрахувати вартість`), a 3-stat trust bar (18 років досвіду / 1 мін. наклад / від 160 грн — price-led, not the turnaround-time stat from the original mockup), a pricing snapshot table, "Що друкуємо" service cards, a placeholder testimonial, and a closing CTA band.
- Build the calculator page: all 9 fields from the design brief (тип видання, наклад, формат, сторінок, обкладинка, кріплення, папір, колірність, оздоблення) with a live-updating price pinned to the bottom of the viewport. Pricing uses a real formula for priced options (pages × per-page rate + cover + binding, with a volume discount past 100 copies) and shows "за запитом" for options with no confirmed price (шиття, пружина binding; офсет 100, крейда 130 paper; all lamination/finish options) instead of a guessed number. The "Макет" (upload print file) button from the original mockup is explicitly **out of scope** for this change.
- Build the portfolio page ("Наші роботи"): placeholder photo blocks with spec tags, per the PRD's explicit "заглушки" decision.
- Build the `Замовити дзвінок` lead-capture flow (name, phone, optional note), reachable from the homepage, the calculator (carrying the selected configuration as attached text), and the closing CTA band. Submits to the existing public `POST api/client/customer-request` endpoint with no file attachments.
- **Modify `storefront-customer-requests`**: add a CRM-facing requirement that staff can configure a service category's storefront landing key from the category edit UI, and implement it as a new field in `service_app_v3`'s category create/edit form (today the backend DTO/endpoint already accept `StorefrontLandingKey`, but no UI exists to set it — see `openspec/changes/archive/2026-06-03-storefront-books-landing-request/design.md`). This is needed so CRM staff can create the `levada`-keyed category this site submits leads against, without a manual DB edit.
- Add `levada-minimal-site` as a new service in the shared production Docker Compose stack (`docker-compose.production.yml`), alongside the other Leleka services.
- Document, but do not implement, the v1 follow-ups already flagged during planning: real pricing for шиття/пружина binding and non-default paper/lamination options, analytics/tracking integration, real portfolio photography, and finalized footer contact/legal content (email, social links, business hours).

## Capabilities

### New Capabilities
- `levada-site/homepage`: the Levada marketing homepage — hero, trust stats, pricing snapshot, service cards, testimonial, closing CTA, and the two primary CTAs.
- `levada-site/calculator`: the price calculator screen — all configurable print-job fields, live price computation with a documented formula and volume discount, and "за запитом" handling for unpriced options.
- `levada-site/portfolio`: the portfolio/"Наші роботи" listing of past work with placeholder imagery and spec tags.
- `levada-site/lead-capture`: the `Замовити дзвінок` callback-request flow, including how a calculator configuration is carried into a submission, and its integration with the existing storefront customer-request endpoint.

### Modified Capabilities
- `storefront-customer-requests`: add a requirement that CRM users can configure a service category's storefront landing key via the category edit UI (currently only settable out-of-band, with no UI path).

## Impact

- **`LelekaStore/levada-minimal-site`** (new code): all real pages/components under `app/`, replacing the current `create-next-app` boilerplate; ports and adapts the reference logic in `docs/mockup/components/*` (pricing formula will be replaced with the real one, not the placeholder in `pricing.js`).
- **`LelekaStore/service_app_v3`**: one new field + wiring in `src/pages/serviceCategory/sercatCreateOrEdit.js` (category create/edit form) to set `StorefrontLandingKey`.
- **`LelekaWEBApiV1`**: no code changes expected — the existing `POST api/client/customer-request` endpoint, DTOs, and CORS policy already support this use case. A new `ServiceCategory` row (landing key `levada` or similar) is a data/config change, created via the CRM once the form field exists.
- **Deployment**: `docker-compose.production.yml` gains a new service entry for `levada-minimal-site`.
- No changes to `storefront-basket`, `storefront-direct-order`, or any LelekaStore checkout/catalog capability — this site has no basket/checkout/account surface.
