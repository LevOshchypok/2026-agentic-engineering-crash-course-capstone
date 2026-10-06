<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# docs/

- `docs/PRD.md` — Product requirements doc for this site: the overall goal (a lightweight, mobile-first marketing/lead-gen site for Levada, a print house), target users, scope, and non-goals. Read this first for *why* the site exists and what v1 should/shouldn't do.
- `docs/design-system.md` — Shared source of truth for visual design (colors, typography, spacing, tokens) extracted from the Claude Design mockup. Code-level tokens matching this doc live in `app/globals.css`. Consult this before styling any page/component.
