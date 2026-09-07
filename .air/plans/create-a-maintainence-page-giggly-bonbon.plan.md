# Maintenance Page with Dynamic Cloudflare KV Toggle

## Context

`louismau.com` is a Next.js 16 (App Router) site deployed to Cloudflare Workers via `@opennextjs/cloudflare`. Louis wants a maintenance page he can flip on/off **without redeploying** while he iterates. When on, visitors see a minimal page with his name centered, a short blurb, and square icon buttons linking to LinkedIn and GitHub.

The toggle uses **Cloudflare KV** — a small key-value store readable from the Worker at edge with built-in ~60s cache. The flag is read in Next.js middleware which rewrites every non-excluded request to `/maintenance` when enabled. Toggling is a single `wrangler kv key put` command (or one click in the Cloudflare dashboard); no redeploy required.

## Approach

1. Create a `SITE_CONFIG` KV namespace bound to the Worker.
2. Add `src/middleware.ts` that reads `maintenance_mode` from KV via `getCloudflareContext`. If `"on"`, rewrite to `/maintenance` (except for `/maintenance`, Next internals, and static assets).
3. Add `src/app/maintenance/page.tsx` — a self-contained route with the name, blurb, and square LinkedIn/GitHub buttons. Uses existing shadcn primitives + Phosphor `GithubLogo`/`LinkedinLogo`.
4. Document the toggle commands in a short README section.

Why this over an env var: a KV flag flips in seconds without any deploy, matching the goal. Implementation cost is small (~3 new files + 1 binding line) — not a "big feature".

## File Changes

### Create
- **`apps/web/src/middleware.ts`** — Reads `maintenance_mode` from the `SITE_CONFIG` KV binding via `getCloudflareContext({ async: true })`. Rewrites to `/maintenance` when value is `"on"`. `config.matcher` excludes `_next`, static files, `favicon`, and `/maintenance` itself.
- **`apps/web/src/app/maintenance/page.tsx`** — Server component. Full-height centered layout: "Louis Mau" headline, blurb ("This site is currently under development. Please check back soon."), and two 40×40 bordered square icon buttons linking to GitHub (`https://github.com/404uam`) and LinkedIn (`https://www.linkedin.com/in/louis-mau`). Uses Phosphor `GithubLogo` and `LinkedinLogo`.
- **`apps/web/cloudflare-env.d.ts`** — Extend `CloudflareEnv` with `SITE_CONFIG: KVNamespace` for honest types in middleware.

### Modify
- **`apps/web/wrangler.jsonc`** — Add:
  ```jsonc
  "kv_namespaces": [
    { "binding": "SITE_CONFIG", "id": "<id-from-wrangler-create>" }
  ]
  ```
- **`apps/web/README.md`** *(create if missing)* — Append "Maintenance mode" section:
  - Enable: `pnpm wrangler kv key put --binding=SITE_CONFIG --remote maintenance_mode on`
  - Disable: `pnpm wrangler kv key delete --binding=SITE_CONFIG --remote maintenance_mode`

## Implementation Steps

### Task 1 — Provision KV
1. From `apps/web/`: `pnpm wrangler kv namespace create SITE_CONFIG`.
2. Copy the returned `id` into `wrangler.jsonc` under a new `kv_namespaces` array.
3. Also create the `--preview` namespace for local `wrangler dev`.

### Task 2 — Maintenance page
1. Create `apps/web/src/app/maintenance/page.tsx`.
2. Layout: `min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center`.
3. Headline `<h1>` "Louis Mau" using existing font setup from `apps/web/src/app/layout.tsx`.
4. Muted-slate blurb `<p>`.
5. Two square `<a>` buttons (`h-10 w-10 rounded-md border border-slate-300 inline-flex items-center justify-center hover:bg-slate-100`) wrapping `GithubLogo` and `LinkedinLogo` from `@phosphor-icons/react`. URLs match `apps/web/src/app/components/Footer.tsx` lines 11 and 17.
6. `aria-label` on each link.

### Task 3 — Middleware
1. Create `apps/web/src/middleware.ts`.
2. Body:
   ```ts
   const { env } = await getCloudflareContext({ async: true });
   const flag = await env.SITE_CONFIG.get("maintenance_mode");
   if (flag === "on") {
     const url = request.nextUrl.clone();
     url.pathname = "/maintenance";
     return NextResponse.rewrite(url);
   }
   return NextResponse.next();
   ```
3. Export `config.matcher` excluding `/(_next/.*|maintenance|favicon.ico|.*\\..*)`.
4. Add `cloudflare-env.d.ts` typing for the KV binding.

### Task 4 — Document & verify
1. Add README section with toggle commands.
2. Local verify with `pnpm wrangler dev` (or project's dev script) using the preview KV namespace.
3. Deploy once: `pnpm wrangler deploy`. Future toggles are pure KV writes — no redeploy.

## Acceptance Criteria

- `/maintenance` directly always renders the page (name centered, blurb visible, both icon buttons clickable with correct URLs and `aria-label`s).
- With `maintenance_mode=on`, requesting `/`, `/admin`, or any app route shows the maintenance page (rewrite — URL stays the same).
- With the key absent or any other value, the site renders normally.
- `_next/*` assets, favicon, and `/maintenance` are not rewritten (no loop, no broken styles).
- Toggling on/off requires no rebuild and no `wrangler deploy` — only `wrangler kv key put/delete`. Propagates within ~60s.
- Icon buttons are visually square, keyboard-focusable, and have `aria-label`s.

## Verification

1. `cd apps/web && pnpm wrangler dev`.
2. `pnpm wrangler kv key put --binding=SITE_CONFIG --preview maintenance_mode on`.
3. Visit `/` and `/admin` → both show the maintenance page.
4. Visit `/maintenance` directly → renders; social links open in new tab.
5. `pnpm wrangler kv key delete --binding=SITE_CONFIG --preview maintenance_mode` → reload, normal site returns.
6. `pnpm build` and `pnpm lint` pass with no new warnings/errors.

## Risks & Mitigations

- **KV read latency on every request (~5–20ms at edge after first cache hit).** Acceptable for a portfolio; KV has automatic edge caching, and the matcher excludes static asset paths so the read only fires on HTML routes.
- **Forgetting to also delete the preview-namespace key when testing.** Mitigated by documenting both `--remote` and `--preview` variants in the README.
- **Rewrite loop if matcher is wrong.** Mitigated by explicitly excluding `/maintenance` from the matcher and unit-testing the matcher pattern locally before deploy.

## Critical Files

- New: `apps/web/src/middleware.ts`
- New: `apps/web/src/app/maintenance/page.tsx`
- New: `apps/web/cloudflare-env.d.ts`
- Modified: `apps/web/wrangler.jsonc`, `apps/web/README.md`
- Reference: `apps/web/src/app/components/Footer.tsx` (social URLs), `apps/web/src/app/layout.tsx` (fonts)
- Reused: `@phosphor-icons/react` (`GithubLogo`, `LinkedinLogo`)