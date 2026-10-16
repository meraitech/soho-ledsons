# soho-ledsons verification (sebelumnya template Sparkdesign)

Reviewed on September 6, 2026, including the expanded landing page, sans-serif typography, revised motion, and subsequent refinement against the Isomeet reference.

## Build checks

The final source passes `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`. Next.js generated the landing page and metadata routes successfully. No dependencies were added.

## Browser review

The initial template was reviewed in native Google Chrome at 320px, 390px, 768px, 1024px, desktop, and 2560px widths, across light and dark themes. The expansion received an additional review at 320px, 390px, 768px, and desktop widths. The final refinement was checked again at 320px, 768px, and desktop widths, in both themes: large workflow compositions, photographic project cards, preview dialogs, the editorial collaboration layout, and compact pricing rows.

Verified hero arrow-key navigation, feature audience tabs, canvas selection, access toggle, comment resolution, version selection and approval, FAQ expansion, both signup previews, and workspace creation/reset. The new workflow supports keyboard step selection. Project filters update the visible set; project dialogs contain keyboard focus, close with Escape, and return focus to their trigger. Their workspace action closes the dialog and focuses the workspace heading. Plan selection updates the local solo/team option and clears a previous preview result.

Checked manual animation pause and Chrome's `prefers-reduced-motion: reduce` emulation. The preference updates the pause control and renders static audience rows. The revised hero uses an ordinary image with a 350ms opacity transition. Desktop closing photos respond to the mouse and return to rest when it leaves; mobile and reduced-motion states remain static. A fresh production load with the manual pause preference confirmed that section content remains visible.

The four added sections were refined to remove miniature app chrome, repeated labels, long numbered principles, and generic pricing-card details. Their new order follows Features with Workflow, Collaboration, Project Library, and Plans. Desktop section padding is generally 64px per edge, falling to 44px on mobile, with tighter spacing before the workspace.

The workflow uses one large photograph and one supporting detail per state. Its stage is 520px on desktop and 420px on mobile; artwork labels remain at least 14px. The presentation scrim provides a conservative contrast bound of 5.61:1 in its protected caption area. Common Ground's gallery title has a conservative contrast bound of 4.78:1. The collaboration photo has an explicit responsive width, avoiding the earlier aspect-ratio overflow. Mobile pricing actions fit beside their prices. The production console showed no application errors during this review.

## Production HTTP checks

The production server returned 200 for the homepage, robots, sitemap, and manifest, and 404 for a missing route. All twelve local anchor targets exist, with one H1, one main landmark, and no duplicate IDs.

All 128 checked resources in the final refinement build returned 200 on the first pass: 106 photograph candidates, ten JavaScript files, two stylesheets, two font files, five PNGs, and one each of ICO, SVG, and manifest. Photographs still depend on Unsplash availability as documented in the README.

The WebSite and six-question FAQ structured data parse correctly. Metadata, bundled icon dimensions, social preview, all seven source credits, and README paths agree with the implementation. Served font faces contain only Instrument Sans and its fallback; no serif or monospace font remains in the application source.

## Tailwind v4 migration

Component styling was migrated from all thirteen CSS Modules and shared CSS classes to Tailwind v4 utilities. The remaining `globals.css` contains theme tokens, Tailwind configuration, layered base/accessibility rules, and reduced-motion safeguards. There are no component stylesheets or `@apply` substitutes. The only JSX style values are live Motion transforms and the currently selected hero image URL.

A second source review checked the original selectors, responsive breakpoints, cascade precedence, inherited line heights, hover/selected states, backdrop blur, and transition timing. All 1,502 concrete styling utilities compile with the installed Tailwind v4 design system. Typecheck, lint, formatting, and the production build pass after that review.

During migration, native Chrome checks covered the desktop hero and feature grid in both themes, the 390px dark hero and mobile menu, keyboard workflow tabs, compact plan rows, plan-to-form selection, and FAQ expansion. Browser controls became intermittent during the remaining catalog checks. The user accepted the current work and requested wrap-up, so browser review ended at that scope. Earlier browser results above describe the pre-migration design and are not a substitute for additional post-migration coverage. The final Tailwind production build passed a fresh HTTP check of 129 resources, including image candidates, compiled assets, manifest icons, and the social preview. It has one H1, one main landmark, no duplicate IDs, and no missing local anchor targets.

## Scope

Forms and product controls are local demonstrations. The canonical domain is a documented placeholder. This review does not constitute an accessibility certification, a performance benchmark, or testing on every browser and device. Replace the brand/domain and connect any intended services before a real launch.
