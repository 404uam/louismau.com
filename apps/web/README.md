This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local Development

**Next.js dev server (no Cloudflare simulation):**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

**Cloudflare Workers local preview (includes KV):**

```bash
pnpm preview
```

This runs the `preview` Wrangler environment with local KV storage. Test maintenance mode:

```bash
# Enable maintenance mode (local preview storage)
pnpm wrangler kv key put --binding=SITE_CONFIG --env preview --local maintenance_mode true

# Disable (only an explicit false opens the site)
pnpm wrangler kv key put --binding=SITE_CONFIG --env preview --local maintenance_mode false
```

Open [http://localhost:8787](http://localhost:8787) (or the port shown in console).

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

## Maintenance mode

The site reads a `maintenance_mode` key from the `SITE_CONFIG` Cloudflare KV namespace. Maintenance mode is enabled by default: only the exact string `false` opens the site. Missing or invalid values, a missing binding, and configuration lookup errors all fall back to maintenance mode. Without a Cloudflare context, the plain Next.js dev server also defaults to maintenance mode.

While enabled, Edge Middleware rewrites matching page requests to `/maintenance` and responds with HTTP 503, `Cache-Control: no-store`, and `Retry-After: 300`. The maintenance route and static assets bypass the check so the page can render. The standalone maintenance UI lives in `src/components/maintenance-page.tsx`. Use the `middleware.ts` convention here: the installed OpenNext Cloudflare adapter does not support the Node.js runtime used by Next.js 16's `proxy.ts`.

Toggling does not require a redeploy. KV changes can take 60 seconds or more to propagate globally. Configure real namespace IDs in `wrangler.jsonc` before deployment.

Enable (production):

```bash
pnpm wrangler kv key put --binding=SITE_CONFIG --remote maintenance_mode true
```

Disable (production):

```bash
pnpm wrangler kv key put --binding=SITE_CONFIG --remote maintenance_mode false
```

For the local `pnpm preview` server, use `--env preview --local` as shown above. To change the deployed preview namespace, use `--env preview --remote`.

## Cloudflare preview deployments

`wrangler.jsonc` defines `env.preview` with a separate `SITE_CONFIG` namespace and `ENVIRONMENT=preview`. It clears the production routes and enables a workers.dev URL for `louismaudotcom-preview`.

```bash
pnpm deploy:preview
```

This builds and deploys with `--env preview` on both OpenNext commands. `pnpm deploy` continues to build and deploy production.

For CI with separate build and deploy steps, use `pnpm cloudflare-build:preview` followed by `pnpm exec opennextjs-cloudflare deploy --env preview`. Configure those commands on the preview Worker's build settings; default production commands do not select the preview environment.
