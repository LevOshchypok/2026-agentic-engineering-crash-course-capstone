# Post-launch follow-ups

Deferred out of `levada-minimal-site-launch` v1 on purpose (per `proposal.md` and
`design.md`'s Open Questions). Tracked here so they aren't lost once that change
is archived — this file lives with the app, not under `openspec/changes/`.

- **Real pricing for шиття/пружина binding, and for офсет 100 / крейда 130 paper
  and all lamination/finish options.** The calculator shows "за запитом" for
  these today (`lib/pricing.ts`); the owner explicitly declined a
  web-researched market-rate estimate for v1. Needs real per-unit costs from
  the business before these can become computed prices.
- **Analytics/tracking integration** (CTA clicks, calculator starts/completions,
  lead submissions) — tool choice not yet made (PRD §8, §11.8).
- **Finalized footer content**: complete email address, Telegram/Instagram/
  Facebook links, business hours, any registration/privacy text — `Footer.tsx`
  ships with placeholder slots for these (PRD §11.7).
- **A genuine desktop-specific design.** v1 scales the mobile-first layout to a
  centered max-width column on wider viewports rather than a bespoke desktop
  design, since none exists yet (design.md Risks/Trade-offs).
