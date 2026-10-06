# Tasks

## 1. CRM: storefront landing key configuration

- [x] 1.1 Add a "Storefront landing key" text input to the category edit form (`LelekaStore/service_app_v3/src/pages/serviceCategory/sercatCreateOrEdit.js`), wired into the existing create/update payload sent to `ServiceCategoryController`, and verify `StorefrontLandingKey` round-trips: set a value, save, reopen the form, and see it persisted.
- [ ] 1.2 In a dev/staging environment, create a `ServiceCategory` with landing key `levada` via the updated CRM form, and verify `POST api/client/customer-request` with that category's id succeeds (per `storefront-customer-requests` spec) instead of returning "Selected category is not configured for storefront requests."

## 2. Site foundation

- [x] 2.1 Set `app/layout.tsx` metadata (`title`, `description`) to real Levada copy and set `lang="uk"` (already set) with an `<html>`/`<body>` structure ready to host the four routes; verify `npm run build` succeeds with no default-boilerplate strings remaining.
- [x] 2.2 Replace `app/page.tsx`'s `create-next-app` boilerplate with the real homepage route (see §3), and add `app/calculator/page.tsx`, `app/portfolio/page.tsx` as new routes; verify all three routes render via `npm run dev`.
- [x] 2.3 Implement the pricing module (replacing `docs/mockup/components/pricing.js`'s placeholder formula) implementing: `(pages × per-page rate: 1 UAH bw / 3.5 UAH color) + cover cost (М'яка 20 / Тверда 100) + binding cost (Біндер 30; Шиття and Пружина return "за запитом")`, with a ~10% reduction applied when quantity > 100, and "за запитом" returned instead of a number whenever paper is not Офсет 80 or any lamination/finish other than "Без" is selected. Verify with unit tests covering: the two confirmed flagship prices (soft/binder/100pg/bw ≈ 150-180 range and hard/шиття/100pg/bw ≈ 200 range per the confirmed anchors), the >100-copy discount, and each за-запитом-triggering option.

## 3. Homepage

- [x] 3.1 Port `docs/mockup/components/Home.jsx`'s Direction A structure (drop the A/Б switcher and Direction B markup entirely) into the homepage route: headline, subhead, two CTAs, trust bar, pricing snapshot, "Що друкуємо" cards, testimonial, closing CTA band. Verify against `specs/levada-site/homepage/spec.md`'s scenarios manually in the browser.
- [x] 3.2 Set the trust bar's third stat to the price-forward value ("від 160 грн/прим.") instead of "5 днів на тираж", and verify it renders correctly at mobile and desktop widths.
- [x] 3.3 Wire "Замовити дзвінок" (top and closing band) to open the lead-capture flow with no configuration attached, and "Розрахувати вартість" to navigate to `/calculator`; verify both interactions manually.
- [x] 3.4 Verify the homepage renders as a centered, max-width single column at a desktop viewport (e.g. 1280px) with no layout break, per the homepage spec's responsive requirement.

## 4. Calculator

- [x] 4.1 Port `docs/mockup/components/Calculator.jsx`'s field set and layout (тип видання, наклад, формат, сторінок, обкладинка, кріплення, папір, колірність, оздоблення) into `/calculator`, wired to the real pricing module from §2.3 instead of the mockup's `pricing.js`. Verify each field change recomputes the displayed price immediately.
- [x] 4.2 Implement the "за запитом" display state (replacing any numeric price) for шиття, пружина, офсет 100, крейда 130, and any lamination/finish other than "Без"; verify by selecting each and confirming no invented number is shown.
- [x] 4.3 Keep the sticky bottom bar showing unit price × quantity = total (or "за запитом") plus the "Замовити дзвінок" action while scrolling; verify by scrolling the field list on a mobile-width viewport.
- [x] 4.4 Remove the mockup's "Макет" upload button entirely (not part of v1); verify it is absent from the rendered page.
- [x] 4.5 Wire "Замовити дзвінок" from the calculator to open the lead-capture flow with the full selected configuration and computed price/за-запитом state attached; verify the attached summary matches the currently selected fields.
- [x] 4.6 Verify the calculator renders as a centered, max-width single column at a desktop viewport with the sticky price bar still functioning.

## 5. Portfolio

- [x] 5.1 Port `docs/mockup/components/Portfolio.jsx` into `/portfolio`, keeping placeholder image blocks and spec tags (cover, binding, format, pages, quantity); verify against `specs/levada-site/portfolio/spec.md`.
- [x] 5.2 Verify the portfolio page renders as a centered, max-width single column at a desktop viewport.

## 6. Lead capture

- [x] 6.1 Port `docs/mockup/components/CallbackModal.jsx` into a shared lead-capture component usable from the homepage, calculator, and portfolio (if entered), with name/phone (required) and an optional note field; verify client-side validation blocks submission when name or phone is empty, per the lead-capture spec.
- [ ] 6.2 Implement submission as a direct `multipart/form-data` `POST` to the existing `LelekaWEBApiV1` endpoint `api/client/customer-request` with `CategoryId` (from the `NEXT_PUBLIC_LEVADA_CATEGORY_ID` env var), `Name`, `Phone`, `RequestText` (including the calculator configuration summary when present), and an empty `Files` list. Verify a real submission from a dev/staging build creates a request visible via the CRM's `GET api/storefront-customer-request` list.
- [x] 6.3 Show a confirmation state on successful submission (matching `CallbackModal.jsx`'s `sent` state) with no payment step anywhere in the flow; verify manually.
- [x] 6.4 Handle and surface a submission failure (e.g. network error, category not configured) with a visible error state instead of a silent failure; verify by pointing the env var at an invalid category id and confirming the UI shows an error rather than a false confirmation.

## 7. Footer and content

- [x] 7.1 Add a footer with the confirmed phone number (`+380630681215`) and placeholder slots for email and Telegram/Instagram/Facebook links, clearly structured so real values can be dropped in later without a code change beyond the config values themselves; verify it renders on all four routes.

## 8. Deployment

- [x] 8.1 Add a `Dockerfile` for `levada-minimal-site` (modeled on `LelekaStore/leleka_store/Dockerfile`) and a new `levada-minimal-site` service entry in `docker-compose.production.yml`, with `NEXT_PUBLIC_API_BASE_URL` pointing at the public API origin (not the internal-only `api:5000` host, since this site calls the API directly from the browser) and `NEXT_PUBLIC_LEVADA_CATEGORY_ID` as a required env var; verify `docker compose -f docker-compose.production.yml config` validates the new service.
- [x] 8.2 Verify the built container serves the homepage successfully via its healthcheck, matching the pattern of the existing `storefront` service's healthcheck.

## 9. Follow-ups to document (not implement in this change)

- [x] 9.1 Add each deferred v1 item as a tracked follow-up (real pricing for шиття/пружина/paper types/lamination, analytics/tracking integration, real portfolio photography, finalized footer email/social links, a genuine desktop-specific design) to wherever the team tracks post-launch work, so they aren't lost after this change is archived.
