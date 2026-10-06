This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Production deployment

The `levada` service in the root `docker-compose.production.yml` runs the standalone
Node server on `127.0.0.1:3002`. Nginx routes `https://print.rev.com.ua` to it and
routes the allowed `/api/` endpoints to the existing backend on port 5000.

Build-time environment for this deployment:

- `LEVADA_API_BASE_URL=/api`
- `LEVADA_CATEGORY_ID=2002` (the production category «Левада», landing key `levada`)

These values are embedded in browser JavaScript; rebuild the image after changing
them. Other environments must use their own category ID with a nonempty landing key.
The build downloads Geist fonts from Google Fonts and requires network access.

Image optimization is disabled because the production VM cannot run sharp's SIMD
backend. Portfolio images are served directly. Docker excludes local dependencies,
build output, environment files, and design mockups from its build context.

Deployment and recovery details are maintained locally in
`DeployInProcess/nginx/README.md` and `DeployInProcess/progress.md`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
