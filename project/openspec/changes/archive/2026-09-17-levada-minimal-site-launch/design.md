# Design

## Context

`LelekaStore/levada-minimal-site` is scaffolded (Next.js 16, React 19, Tailwind v4) with design tokens already wired into `app/globals.css`, but `app/` still contains only the default `create-next-app` boilerplate. `docs/mockup/components/*.jsx` is a porting reference (Home, Calculator, Portfolio, ServiceCard, CallbackModal, `pricing.js`) that mirrors a runnable HTML prototype — none of it is imported by the app today, and its pricing logic is explicitly an invented placeholder.

The backend side already has everything this site needs except a UI to configure it: `POST api/client/customer-request` (`LelekaWEBApiV1/Controllers/ExternalApp/CustomerRequestController.cs`) is public, unauthenticated, accepts `multipart/form-data` (`CategoryId`, `Name`, `Phone`, `RequestText`, `Files[]`), and CORS is open (`WithOrigins("*")`, no credentials). It only accepts requests for a `ServiceCategory` that has a `StorefrontLandingKey` set, and today the only such category is `"books"` — the field is set out-of-band (no CRM UI exists), per the `storefront-books-landing-request` change's design (`design.md:25-34`), which deliberately chose a plain string key over a hardcoded enum specifically so other categories could reuse it later. This change is that reuse.

See `proposal.md` for motivation and scope; see `specs/` for the behavior contract this design implements.

## Goals / Non-Goals

**Goals:**
- Land a real, working v1 of the four screens, ported from the mockup reference components but with the real pricing formula.
- Wire the lead-capture flow end-to-end to the existing CRM pipeline with no new backend endpoint.
- Make the small CRM addition (landing-key field) the only backend-adjacent code change required.

**Non-Goals:**
- No changes to `LelekaWEBApiV1` controllers, DTOs, or CORS policy — the existing endpoint already covers this use case.
- No basket/checkout/account work (explicitly out of scope per the PRD).
- No bespoke desktop-specific design — mobile-first layout scaled gracefully, not redesigned, for wider viewports.
- No analytics integration, real photography, or non-default pricing (шиття/пружина binding, non-offset-80 paper, lamination/finish) — all explicitly deferred (see Open Questions).

## Decisions

**Call the existing endpoint directly from the browser, no Next.js API route proxy.**
CORS is already open (`*`, no credentials) and the endpoint needs no auth token, so a server-side proxy route in `levada-minimal-site` would add a hop without adding security. The lead-capture flow submits `multipart/form-data` straight to `LelekaWEBApiV1`'s public endpoint, matching how the endpoint already works for the "books" landing page.
*Alternative considered*: a Next.js API route (`app/api/lead/route.ts`) forwarding to the backend. Rejected for v1 — no auth/secret needs hiding, and it would just be a pass-through; can be added later if request shaping or rate-limiting is needed.

**The Levada category's numeric `CategoryId` is a per-environment config value, not hardcoded.**
`ServiceCategory` IDs are database-assigned and differ across environments (dev/staging/prod). The site reads the ID from an environment variable (e.g. `NEXT_PUBLIC_LEVADA_CATEGORY_ID`) set once CRM staff create the category in each environment. The value is not sensitive (it's an implementation detail of a public form), so a public env var is fine.
*Alternative considered*: resolve the category by its landing key via an API lookup at request time. Rejected — adds a network round-trip and a new read pattern for a value that changes only when the category is (re)provisioned, which is rare.

**Port the mockup's structure and Tailwind classes; replace `pricing.js` entirely.**
`docs/mockup/components/*.jsx` already use the real design tokens (`bg-brand`, `text-ink`, etc.) and match the confirmed screens, so their JSX/structure is reused as a starting point in `app/`. `pricing.js`'s formula is fully replaced with the real one: `(pages × per-page rate) + cover cost + binding cost`, with a flat ~10% reduction applied when quantity exceeds 100 copies, and an explicit "за запитом" state (not a number) for any option without a confirmed price — see the calculator spec's requirements for the exact behavior contract.

**Homepage ships Direction A only; Direction B and the interactive mini-calculator variant are not built.**
The mockup's variant switcher (A/Б) was a comparison tool for the design discussion, not a feature — the real homepage renders Direction A's structure unconditionally, with no runtime switcher.

**CRM landing-key field is a small, additive form change, not a new admin capability.**
`service_app_v3/src/pages/serviceCategory/sercatCreateOrEdit.js` gets one new text input wired into the category's existing PUT/POST payload (`ServiceCategoryDto.StorefrontLandingKey` already exists and is already bound by the controller — see `LelekaWEBApiV1/Controllers/ServiceCategoryController.cs:54-103`). No new endpoint, no schema change.

## Risks / Trade-offs

- **[Risk]** The `levada` category may not exist yet in a given environment when the frontend is deployed, so real end-to-end lead submission can't be tested until CRM staff create it. → **Mitigation**: sequence tasks so the CRM field change lands and the category is created before this is exercised end-to-end in that environment; the frontend itself doesn't need the category to exist to be built and code-reviewed, only to be tested live.
- **[Risk]** The public submission endpoint has no rate limiting or spam protection beyond file-count/size checks, and CORS is wide open. → **Mitigation**: pre-existing backend exposure (same as today's "books" landing page), not introduced by this change; out of scope here, worth flagging separately to whoever owns backend security.
- **[Risk]** "за запитом" states in the calculator could read as broken to a visitor expecting a number for every option. → **Mitigation**: the spec treats "за запитом" as a first-class, clearly-labeled state (not an error or a hidden default), consistent with how the two flagship prices are already presented as fixed real numbers.
- **[Risk]** Mobile-first layout stretched to a centered max-width column may look sparse on very wide desktop screens, since no real desktop design exists yet. → **Mitigation**: accepted trade-off for v1, per the desktop-layout decision made during planning; revisit once a real desktop design exists.

## Migration Plan

No data migration and no changes to existing behavior for the `"books"` category. Rollout is: (1) ship the `StorefrontLandingKey` field in `service_app_v3`, (2) CRM staff create a `levada`-keyed `ServiceCategory` in each environment, (3) deploy `levada-minimal-site` as a new service in `docker-compose.production.yml` with its `CategoryId` env var pointing at that category. Rollback is independent per piece: the CRM field addition and the new site are both purely additive and can be reverted or held back without affecting any other capability.

## Open Questions

These are deferrable — they don't change the specs, the approach, or the task breakdown, only specific values to fill in later:
- Real prices for шиття and пружина binding, and for офсет 100 / крейда 130 paper and lamination/finish options (business to supply; calculator already handles their absence via "за запитом").
- Final footer contact/legal content: complete email address, Telegram/Instagram/Facebook links, business hours, any registration/privacy text.
- Analytics/tracking tool choice (explicitly deferred per proposal; to be added without changing this design).
- Timeline for replacing placeholder portfolio photography with real photos.
