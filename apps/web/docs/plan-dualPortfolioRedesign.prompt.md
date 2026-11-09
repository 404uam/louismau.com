# Plan: Dual Portfolio Redesign

Replace the current single-page portfolio with a centered entry page and separate Software and Photography overview pages. Launch with empty project and collection data, the real resume, and existing social/contact destinations. Adding work later means editing typed data and redeploying.

## Confirmed scope and design source

- Visual reference: [Untitled.pdf](./Untitled.pdf), reviewed in full. Page 1 defines entry composition; page 2 defines Software; page 3 defines Photography. Use the palette below when it differs from the PDF.
- Photography is **display-only**: no image links, lightbox, filtering, or photo detail pages.
- Software's resume opens in a **modal dialog**, reusing the current resume content.
- “Resume only on Software” applies to portfolio routes. Omit the PDF's Photography resume button; preserve the existing maintenance resume.
- Illustrative projects, generated photographs, sample counts, and sample-content disclaimers in the PDF are not production content. Start with intentional empty states.
- Keep R2 setup, a CMS/upload interface, downloadable resume files, and deployment out of scope.

## Routes and layout

| URL | Result when maintenance is off |
| --- | --- |
| `/` | Entry page, social/email icons, Software and Photography links, footer. No sidebar or resume. |
| `/software` | Shared sidebar, introduction, projects or empty state, View resume controls. |
| `/photography` | Shared sidebar, introduction, collections or empty state. No resume. |
| `/maintenance` | Existing standalone page, including Haku, social/email links, and expandable resume. |
| `/admin` | Normal 404; keep the removed admin route and its links absent. |

- Retain the root layout's document/font setup. Put the three portfolio routes in a `(portfolio)` route group with a scoped theme wrapper. A nested layout shared by Software and Photography owns the sidebar; entry uses only the theme wrapper. Keep maintenance outside these layouts. Moving the root page must not leave duplicate pages resolving to `/`.
- Sidebar order: Louis Mau, Back to entry, Software and Photography navigation, applicable nested content links, Software-only View resume button, email/social links, copyright.
- Generate nested links and sections from the same data. Render project links only on Software and collection links only on Photography. Empty data produces no nested links.
- Use stable lowercase kebab-case IDs, prefixed with `project-` and `collection-` for section anchors; never derive IDs from mutable titles or array indices. Use framework links for route changes and real fragment links for section jumps.
- Mark the current discipline with `aria-current="page"`. Collection/project links are ordinary fragment links; scroll tracking is out of scope. The PDF's “All photographs” link goes to the Photography overview heading; collection links jump within the page. Render this collection index only when collections exist.
- Replace old internal `#photos`, `#software`, `#contact`, and admin links. Legacy external homepage fragments are not migrated in this version; fragments do not reach middleware, so do not add server redirects for them.
- Add distinct Software/Photography titles, descriptions, and social metadata, following the root metadata conventions. Preserve maintenance metadata.

## Visual and responsive specification

Follow the PDF's spacious composition, fine borders, flat controls, oversized headings, mono labels, and restrained footer. Reuse the loaded Instrument Sans for portfolio headings/body and Source Code Pro for labels. Use `Georgia, "Times New Roman", serif` for collection headings to reflect page 3 without adding a font dependency.

- **Entry, PDF page 1:** top labels at opposite edges, centered large Louis Mau wordmark, social icons beneath, then Software (dark filled) and Photography (outlined) navigation links. Add email to the icon row. Footer has copyright on the left and “Two ways of seeing. Choose a direction.” on the right. Stack controls/footer below 640px, scale/wrap the wordmark to fit, and allow scrolling on short viewports.
- **Desktop, at least 1024px:** fixed sidebar approximately 15rem wide, with independent vertical overflow and social links/copyright near the bottom. Offset main content by the sidebar width, cap its content width at 72rem, and use generous responsive padding. Keep the PDF's page heading/introduction arrangement where space permits.
- **Below 1024px:** an in-flow header with an initially closed collapsible menu replaces the sidebar. Opening it pushes content down. Use a button with `aria-expanded`/`aria-controls`; closed links must not be focusable. Close on navigation or Escape, returning focus to the toggle for Escape. Resizing must not leave navigation hidden on desktop.
- **Software, PDF page 2:** heading, introduction, header View resume button, divider, then the project section. First project is featured once, with preview and text side by side at desktop widths and stacked below 1024px. Remaining projects form a two-column grid from 768px and one column below. With one project, show only the feature; with none, show the empty state and retain resume access. Omit sample counts and categories unless supplied by real data.
- **Photography, PDF page 3:** heading/introduction, collection index, collection headings/descriptions, varied image layouts, captions, and dividers. Support an explicit featured collection layout: first image large on the left, next two stacked on the right, approximately 3:2 column widths, from 768px upward. Additional photos use the regular grid. Fall back to the regular grid when fewer than three photos exist. The regular grid uses two equal columns from 640px and one below; featured layouts also stack below 768px. Keep image order in the DOM and visual reading order aligned.
- Regular-grid images preserve source aspect ratios. Featured slots may crop with `object-fit: cover` and an optional data-defined focal position; never stretch images. Render captions beneath their images. Display-only photos have no button semantics or misleading interactive hover treatment.
- Use editable default copy: Software introduction “Selected software engineering work and professional experience.”; Photography introduction “Photographs by Louis Mau.”; software empty state “Projects will appear here as they are added.”; photography empty state “Collections will appear here as they are added.”
- Do not render empty grids, fictitious content counts, empty collection headings, filters, or upload prompts. Footer/copyright remains present without fabricated work.

### Palette and accessibility

| Use | Color |
| --- | --- |
| Primary text, active navigation, filled controls | `#20211F` |
| Secondary text and muted labels | `#6E6F67` for normal text; reference gray `#777870` for large text/non-text accents |
| Portfolio background and text on dark controls | `#F5F3EE` |
| Decorative borders and dividers | `#D4D3CB` |

- Scope theme variables and font overrides to the portfolio wrapper, including the semantic tokens used by shared UI primitives. Do not change global root tokens, root font mappings, shared UI defaults, or maintenance styling to implement the palette.
- Dialog portals must receive the portfolio theme too: mount within the themed subtree or explicitly apply the same scoped theme to the portal content/overlay.
- Meet 4.5:1 contrast for normal text and 3:1 for large text. Against `#F5F3EE`, reference gray `#777870` is approximately 4.02:1; the normal-text variant `#6E6F67` is approximately 4.58:1. Decorative dividers can retain the supplied border color; control boundaries/focus indicators need accessible contrast and a visible outline.
- Provide one main landmark and one h1 per page, a portfolio skip link, meaningful alt text, accessible icon-link names, logical keyboard order, and controls with approximately 44px minimum targets.
- Verify 320px widths, short viewports, and 200% zoom without horizontal page overflow or obscured controls. Offset anchors below any persistent header. Respect reduced motion for portfolio scrolling/transitions without changing maintenance behavior.

## Typed data and empty/populated behavior

Create portfolio types and project/collection data modules alongside the existing resume data; do not add a fetching layer or database. Keep resume data unchanged.

- `PortfolioImage`: `src`, meaningful `alt`, positive intrinsic `width` and `height`.
- `Project`: stable `id`, `name`, `description`, `year`, ordered `technologies`, optional `preview: PortfolioImage`, optional `github`, optional `live`. Array order defines sidebar order and display order; the first project is featured and excluded from the remaining grid. Omit absent links/previews and keep a complete text layout when no preview is supplied.
- `Photo`: stable `id`, image fields above, optional `caption`, optional CSS `objectPosition` for featured crops. Alt text describes the image; captions are visible supporting text.
- `PhotoCollection`: stable `id`, `title`, optional `description`, `layout: "featured" | "grid"`, and ordered `photos`. Collection and photo array order control page/sidebar order. Use this collection model rather than a fixed category union.
- Start with empty project and collection arrays. Omit collections with no photos from both the page and navigation; show the page-level photography empty state when none remain. Keep fabricated projects, example links, and Unsplash photos out of production data.
- Accept typed data as renderer props so populated behavior can be checked with temporary fixtures without publishing them as Louis's work.
- Reuse `GITHUB_URL`, `LINKEDIN_URL`, `PHOTOGRAPHY_INSTAGRAM_URL`, and `EMAIL_URL`. Use the same destinations on entry/sidebar, with accessible labels and safe external-link attributes. Provide email links; no contact form, Contact route, or sending backend.

## Resume dialog and component boundaries

- Use the installed Radix dialog primitives through a small reusable UI wrapper if needed; no new dialog dependency. Reuse `ResumeCard` and resume data, rather than mounting `MaintenanceResume`, which owns a maintenance-specific main landmark, layout, and actions.
- Header and sidebar View resume buttons open the same dialog state. Keep it closed initially and load resume content on demand, retaining loading feedback.
- Include a visible dialog title associated through the dialog primitive, an overlay, an explicit Close button available during loading, and modal semantics. Initially focus Close; trap focus, make background content inert to interaction, lock background scrolling, close on Escape/Close/overlay click, and return focus to the actual button that opened it. If opened from the mobile menu, close that menu and return focus to its toggle when the dialog closes.
- On desktop, center the dialog with a maximum width around 56rem and height at most 90dvh; scroll the resume content while keeping Close available. On mobile, fit within viewport margins and safe areas without nested page overflow.
- Avoid duplicate IDs/headings when the resume card is placed in the dialog. If its existing h2 can serve as the dialog title, associate it instead of adding a redundant title.
- Make any shared resume palette/sizing changes opt-in for the portfolio; retain the existing maintenance presentation by default.
- Keep entry/overview pages and project/gallery rendering as Server Components. Limit client code to navigation state and the resume dialog, passing only the required data to client components. Reuse existing UI primitives and SSR icon imports; do not add gallery or animation dependencies.

## Maintenance contract

Preserve the existing middleware, matcher, `SITE_CONFIG` binding, and `maintenance_mode` key. This redesign does not migrate middleware to `proxy.ts` or change adapters.

- Only the exact string `"false"` opens matching routes. `"true"`, missing/empty/invalid values, different casing, a missing binding, and context/lookup failures keep maintenance enabled.
- Matching requests while closed internally rewrite to `/maintenance`, retain the requested browser URL, and return **503**, `Cache-Control: no-store`, and `Retry-After: 300`. This includes the removed admin URL while maintenance is on.
- Preserve the direct maintenance route and static-asset bypass behavior. Direct `/maintenance` is a normal page response, distinct from the middleware's 503 rewrite.
- Keep maintenance appearance/interactions intact, including Haku, links, and the expandable resume. Do not introduce development bypasses, application-level flag caching, or production KV changes.
- Plain Next.js development lacks Cloudflare context and defaults to maintenance. Verify open portfolio pages through a local Worker preview with local KV set to `false`.

## Images and deferred R2 work

- Use `next/image` with intrinsic dimensions and responsive `sizes` accounting for sidebar width, columns, and maximum content width. Reserve image space, lazy-load below-the-fold images, and handle failed images without collapsing their reserved space or losing captions.
- Empty launch data must not require R2, credentials, a remote hostname, or runtime bucket-list requests. Do not add remote image allowlist entries until real image hosts are supplied.
- When real photos are ready, configure R2/public image delivery, allowlist the actual HTTPS hostname, select and verify an image optimization strategy supported by the deployed Worker, populate typed data, and redeploy. These delivery choices are deferred together; merely adding an R2 URL does not complete production image setup.

## Existing integration points

- Entry/layout: [page.tsx](../src/app/page.tsx), [layout.tsx](../src/app/layout.tsx), and [globals.css](../src/app/globals.css). Replace the temporary homepage when building the entry route.
- Create new navigation, project/gallery renderers, and portfolio data/type modules according to the contracts above.
- Resume/maintenance: [resume-card.tsx](../src/components/resume-card.tsx), [maintenance-resume.tsx](../src/components/maintenance-resume.tsx), [maintenance-page.tsx](../src/components/maintenance-page.tsx), and [middleware.ts](../src/middleware.ts).
- Contact/image configuration: [consts.tsx](../src/consts.tsx) and [next.config.ts](../next.config.ts).
- Reusable UI: [button.tsx](../src/components/ui/button.tsx), [card.tsx](../src/components/ui/card.tsx), and [utils.ts](../src/lib/utils.ts). Use the acceptance checks below as the verification checklist.

## Implementation sequence

1. Create typed models and empty production data; preserve real resume/contact/social content.
2. Add portfolio route groups/theme wrapper, entry/overview pages, sidebar/mobile menu, metadata, and shared navigation derived from data.
3. Build project feature/grid/empty states and the resume dialog; build photography featured/grid/empty states and collection anchors.
4. Apply scoped styles, responsive layouts, keyboard/focus behavior, and reduced-motion handling. Check maintenance after every shared component change.
5. Keep obsolete admin/contact/sample implementations out of the new pages; retain shared primitives still in use and use the acceptance checks below for verification.
6. Complete verification below and report results. Preserve unrelated user changes, local state, and generated artifacts.

## Verification and acceptance

Use the web app's existing pnpm manifest/lockfile and run commands from that app directory. Editing this plan alone does not require a build.

- Run `pnpm exec biome check` on the actual changed source/config files, `pnpm exec tsc --noEmit`, and `pnpm build`. Record pre-existing failures separately; do not scan generated output or reformat unrelated code.
- Run `pnpm preview` to build through OpenNext and verify the Worker locally. Read its actual port/persistence location; seed `SITE_CONFIG` using Wrangler's local KV options and the same persistence store. Do not assume the README's `--preview` examples seed local state. Never use `--remote` for these checks.
- With local KV set to `false`, verify direct requests, reload, client navigation, cross-discipline links, fragments, Back/Forward, and metadata for all three portfolio routes. Confirm `/admin` returns 404 and no admin controls, contact form, fabricated work, or sample-image requests remain.
- With local KV `true`, missing, and invalid, request all three portfolio routes directly and assert maintenance content, 503, exact cache/retry headers, and retained browser URL. Cover missing-binding and context/lookup errors with a focused mocked test or repeatable harness; no production bypass. Confirm direct maintenance/static assets retain existing response behavior. Restore local test state afterwards.
- Verify zero/one/multiple projects, missing project preview/links, zero/one/multiple collections, empty collections, featured collections with fewer than three photos, portrait/landscape photos, captions, long titles, and failed image requests. Check ordering, no duplicated feature, and every section link. Keep verification fixtures out of production data.
- Review at 320px, 390px, 768px, 1024px, and 1440px, plus a short viewport and 200% zoom. Compare populated fixtures with the corresponding PDF pages; assess empty layouts on their own. Check sidebar overflow, menu open/close/navigation/resize, and no overlap or horizontal overflow.
- Check keyboard-only access, skip links, focus indicators, contrast, reduced motion, email/social links, and display-only photo semantics. For the resume dialog, verify both openers, loading, initial focus, focus trap, background scrolling/inertness, Escape/Close/overlay dismissal, focus return, and mobile menu handoff.
- Compare maintenance before/after on desktop/mobile with its resume closed and open; verify Haku and existing interactions. Report commands, results, manual coverage, and anything unverified. Deployment and production KV changes require a separate task.
