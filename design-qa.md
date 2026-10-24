# DefectTrail design QA

Original composition review: passed; superseded for motion by the revision below.

Reviewed 24 October 2026. This passes the local concept frontend handoff. It does not validate a production service, brand/domain ownership, legal notices, connected forms/authentication, integrations or buyer demand.

## Source and rendered evidence

Source visual truth: the five selected full-homepage images, preserved in `design-assets/references/`. Original source folder: `/Users/prajaktagaikwad/Documents/Codex/2026-10-23/https-actclarity-com-https-actclarity-com-3/outputs/defecttrail-homepage-design/`.

| Source | Original pixels |
| --- | --- |
| 01-opening-and-source-trace.png | 992 × 1586 |
| 02-five-modules-and-platform.png | 1015 × 1550 |
| 03-evidence-and-human-review.png | 992 × 1586 |
| 04-team-evaluation-and-pricing.png | 955 × 1647 |
| 05-faq-evaluation-and-footer.png | 936 × 1681 |

Implementation: actual React/Vite production bundle at `http://127.0.0.1:4590/`. Desktop browser viewport 1440 × 1024 CSS px; screenshots 1440 × 1024 pixels, 1× density. `qa/desktop-full-final.png` is 1440 × 13519 pixels. Mobile viewport and screenshots: 390 × 844 CSS/pixel dimensions, 1× density. Tablet was also checked at 768 × 1024.

State for composition comparisons: homepage, first walkthrough step, first FAQ open, blank form, complete content, reduced motion to prevent incomplete reveal states. Actual motion was separately tested and captured at full motion in `qa/desktop-scroll-story.png`.

The source and actual capture were combined in the SAME input for each comparison, not reviewed from filenames or memory. `qa/comparison-chapter-1-final.png` through `qa/comparison-chapter-5-final.png` put the source on the left and the corresponding rendered chapters on the right. Sources and implementation regions are normalized to 992 px width without stretching their height. Neutral padding represents differing page lengths. Region coordinates are in `qa/desktop-regions-final.json`.

Focused paired comparisons: `qa/comparison-typography-final.png` and `qa/comparison-workbench-focused.png`. The latter pairs the original source workbench with a crop of the actual 1440px pinned frame; both are normalized to 930px width. The separate 1× screenshots were inspected for actual small-text readability. `qa/mobile-source-final.png` verifies readable reference, locator and three distinct timestamps at 390px.

## Findings and comparison history

The first comparison was blocked. The following issues were corrected and compared again:

| Finding | Severity | Fix and post-fix evidence |
| --- | --- | --- |
| Hero supporting copy and controls were too small relative to the selected opening. | P2 | Increased desktop hero type and control scale; preserved three headline lines. See initial `qa/comparison-opening-initial.png` and final chapter 1 / focused typography comparisons. |
| Opaque illustration backgrounds produced visible rectangles across the continuous paper surface. | P1 | Generated actual alpha-background edits, then encoded WebP. No substitute CSS/SVG illustrations. Final chapters 1–5 show artwork integrated with the page. Original and edited assets retained. |
| Product/editorial type and evidence text were under-scaled for the selected wide design. | P2 | Increased product names, section headings, body copy, table text, review text, form controls and footer. Removed the unnecessary forced break in the offer heading. Final chapters 2–5 were reopened together with their source images. |
| The original pinned stage was taller than the viewport. | P1 | Pin only the walkthrough controls and evidence visual, measure fit, and use a responsive GSAP media query. Final stage is 855px at 1440 × 1024 and fits below the header; lower viewports use the ordinary reading flow. `qa/desktop-scroll-story.png`. |
| Mobile scorecard expanded the whole page to 486px. | P1 | Set the grid child minimum width to zero and contain the wide table in a focusable horizontal scroll region, with a visible hint. The final 42-route mobile audit reports page width 390px throughout. |
| Mobile navigation trigger was hidden with desktop actions. | P1 | Kept the action wrapper visible and hid only desktop links. Native dialog opening, Escape, product navigation and route closing were verified. |
| Reset did not restore reviewer form values; empty-search reset could preserve the filter. | P1 | Added an explicit reset version for reviewer inputs and a filter-reset callback. Re-tested empty view, selection, saved review, exported rationale and restored seed values. |
| Small mobile demo labels and source metadata needed stronger readability. | P2 | Increased their font sizes and changed the case queue to full-width labeled rows. `qa/mobile-case-queue.png` and `qa/mobile-source-final.png`. |

One intermediate full-page capture painted the sticky header during a moving anchor scroll. It was rejected as capture-state evidence. The final capture uses a settled top position (`scrollY = 0`, header top = 0) and focused brand link; the final chapter 1 comparison shows the header in the correct position. This was a screenshot-state issue, not a page layout change.

No actionable P0/P1/P2 findings remain for the local concept scope.

## Required fidelity surfaces

- **Typography:** self-hosted Fraunces display and Manrope UI fonts load correctly; browser computed families were inspected. The image-generated lettering has no exact font file, so these are the implementation families. Headline wrapping, optical weights, labels, timestamps, table text and footer were checked at normal size. Desktop type was refined after comparison; mobile retains a deliberate smaller, readable scale.
- **Spacing/layout:** centered factory opening, two-column assembly chapter, five editorial offer rows, shared-case illustration/legend, three-pane evidence preview, dark review boundary, role workflows, pilot scorecard, pricing, FAQ, inquiry form and full footer follow the selected sequence. Live content and consent explanations add vertical space. Desktop, tablet and mobile have no page-level horizontal overflow in the verified routes.
- **Colors/tokens:** continuous `#F7F4ED` paper, `#22232A` ink, restrained plum, apricot and sage, and `#3E2028` review section. Semantic colors are supported by text/icons, not color alone. Focus outlines are visible. Body/source text was visually checked on the corresponding surfaces; this is not a certified accessibility audit.
- **Images:** six original graphite/wax-pencil subjects retain coherent industrial detail and true transparency. Optimized WebP files, intrinsic dimensions, self-hosted fonts and actual standard Phosphor icons are used. No custom SVG/CSS artwork substitutes for the illustrations. No competitor screenshots, proprietary records or customer marks are used as product proof.
- **Copy/content:** five distinct offers and exact billing units retained; all prices remain hypotheses. Buyer, operator, data owner, three-case comparator and paid ask are explicit. Gaps, counterexamples and human authority remain visible. Demo and exports carry synthetic labels. No invented diagnosis, production status, customers, booked revenue, certification or control execution.

## Intentional implementation choices

The generated reference includes decorative handwritten page contents, additional lot names and unlabeled time-series marks. Those are replaced by accessible HTML using only the canonical synthetic case model. Unprovided lot relationships and station time-series measurements are not introduced as if they were source evidence. Both DT-103 counterexamples are retained, so its exception pane has an additional card. The illustrated case folder remains an original generated asset; its live legend supplies readable labels rather than baking product UI into an image.

Mobile is a functional adaptation because no complete mobile source design was supplied: vertically stacked source/exception panels, readable provenance, full-width queue items and persistent labels at the relevant records. The full illustrated factory is cropped to emphasize the assembly on narrow screens; its source labels remain available.

These are explicit content/accessibility adaptations, not claims of pixel-identical reconstruction. The Dawn site was used for pacing inspiration, not copied visuals or UI.

## Functional verification

Browser checks on the rendered build:

- Desktop dropdown, Escape and navigation; mobile modal, Escape and product link; branded 404.
- Full-motion pin progression to the counterexample step, manual step selection, arrow-key tabs, no pin at tablet/mobile, and reduced-motion complete-content mode.
- FAQ expansion; interactive source context and six shared-case selections.
- Three cases; search/no-result/reset; blocked supplier mapping; source dialog and provenance timestamps; native dialog Escape.
- Manual suspect selection and required counterevidence acknowledgment; save local rationale; packet reflects the current review; reset clears selection and restores the seed.
- Real browser JSON and HTML downloads. A captured HTML export is included at `sample/DEMO-DT-103-evidence-packet.html`. Synthetic labels, alternatives, source times, reviewer and no-control boundary are retained.
- Evaluation form progression, separate consent choices, local-only confirmation, editing with readiness values preserved. Work-email format presentation confirms no account or email delivery.
- 42 known routes at 1440px and 390px: one main heading each, no unexpected 404 and no page overflow. See `qa/route-audit-production.json` and `qa/route-audit-mobile-final.json`.
- Fresh production-tab console: no errors or warnings; saved as `qa/console-production.json`. A development hot-reload context error during editing is not present after a clean production load.

Automated verification: six meaningful data/export tests and four packaging/worker tests pass. Production build passes with separate React, routing, icons and motion chunks. Tests cover amounts/billing units, observation chronology and source identity, unknown genealogy, retained labels/counterevidence, escaped reviewer text and reset isolation. Build output preserves the supplied Sites runtime files.

## Residual scope and polish

No backend/authentication, lead delivery, live analytics service, production connector, legal approval, domain verification or deployment has been performed. Browser print/PDF is offered but no multipage PDF export-layout certification is claimed. Cross-browser/real-device certification and live service tests remain launch work. Additional handwritten annotation density would be optional art-direction polish, provided it remains tied to the canonical evidence.

## Implementation checklist

- [x] Original brand mark, type/color system, favicons and complete navigation.
- [x] Five distinct offers and hypothesis prices preserved.
- [x] Actual responsive synthetic demo, local review, reset and export.
- [x] Separate consent choices and honest unconnected form/auth states.
- [x] Source + render comparisons, focused crops, desktop/mobile browser checks.
- [x] Production build, six data tests and four runtime/packaging tests.
- [ ] Future public launch: verified entity/domain, reviewed notices, connected services and live end-to-end QA.

Motion v2 result: passed

## Motion revision — 24 October 2026

The user's recording and feedback supersede the prior restrained motion direction. The supplied 58.3-second recording was inspected as twelve extracted frames, including its sustained conversation and wearable scenes. DefectTrail keeps the approved identity, original illustrations and canonical synthetic records; its motion composition is now intentionally larger and more sustained than the static five-chapter mock.

- Implemented Lenis with one GSAP ticker owner and ScrollTrigger synchronization; native touch/keyboard and dialog/nested-scroll boundaries remain available. Route changes destroy the previous transport and scene contexts.
- Four actual pins verified at **1280×720 and 1024×720**: factory camera, source-aware assembly, five-offer vertical sequence and four-stage evidence investigation. Hero middle at scrollY 576 kept its stage at top 84px while the camera matrix changed; scroll reversal and later reveal were inspected.
- Direct offer selection checked for Proof and Report, with the final Report scene fully readable. Evidence steps were checked through inspection, station/lot context, contradictions/missingness and human decision. Original source dialog opened R07 with provenance and closed with Escape.
- Button wipe/magnetic response was observed with actual native pointer movement and captured in `button-hover.png`. Cards/artifacts respond without making essential text hover-only.
- **390×844**: no pins, all five offers and four evidence panels in normal flow, direct offer/evidence links work, document width equals viewport width. Actual mobile offer and contradiction frames were inspected.
- Reduced motion at **1280×720**: `data-motion=reduce`, no Lenis class, zero pins, five visible offers and four visible evidence panels, no horizontal overflow. Full motion was restored afterward.
- Manual evidence reading exposes all four panels and can return to the pinned sequence. Pricing/product navigation removes homepage pins. Browser console: no errors or warnings in the observed session.
- Found and fixed during this review: child layout timing initially skipped hero choreography; switched its setup to an effect after root attachment. Clipped assembly slices produced duplicated edges; replaced with the intact original exploded artwork and a source-driven tilt. Split-pane station/serial labels overlapped; placed them apart. Offscreen packet entrance caused document overflow; constrained its owning chapter. Retested 1024px and 390px document widths.

Actual captures are in `qa/motion-v2/`. `comparison-opening.png` and `comparison-offer.png` combine the selected source and new render in the same image; both were opened and inspected. The hero keeps its three-line thesis, editorial type, graphite factory and ivory palette. The five editorial offer rows intentionally become five full-size scroll scenes under the user's revised motion request; exact scopes, hypothesis prices and artifact distinctions remain. These comparisons verify continuity of the visual system, not pixel-identical composition after the authorized redesign.

Validation: production build passed; six data/export tests and four packaging/worker tests passed. No production integrations, collection service, authentication or deployment were added. The existing full-route QA remains the earlier route-coverage baseline; this revision rechecked the affected homepage plus product/pricing navigation, mobile and reduced-motion states rather than claiming a new exhaustive 42-route audit.

Motion v2 result: passed

## Site-wide extension and overlap fix — 24 October 2026

User approved the homepage motion and supplied two actual screenshots showing the assembly image/label crossing the closing statement. The pin now ends against `.assembly-ending`, rather than the enclosing section bottom. At 1440×900, actual browser geometry at the exit measured assembly wrapper bottom 164px and statement top 182.15px, leaving 18.15px clearance. The actual frame is `qa/motion-v3/homepage-boundary-fixed.png`. `comparison-boundary.png` combines the user screenshot and corrected browser frame in the same input; it was opened and reviewed for overlap, not pixel matching between different scroll positions.

Motion now covers every non-home route with a shared scoped controller. The products overview reuses the five-offer pinned sequence. All five detail routes have a pinned illustration with four vertically progressing workflow steps. Platform/shared-case pages hold the source folder beside the six evidence layers. Hero artwork, dark decision gates, editorial chapters, resource items and pricing rows use scroll-specific transitions. Forms, reports, access and demo workbench remain task-safe and unpinned; no simulated record changes or task actions are triggered by animation.

Verification on the final build:

- 42/42 desktop routes at 1280×720: rendered headings, correct motion scope and no document horizontal overflow. Saved in `routes-desktop.json`.
- 42/42 mobile routes at 390×844: no horizontal overflow and zero pins. Saved in `routes-mobile.json`.
- 42/42 reduced-motion desktop routes: no Lenis, no pins, no hidden scene panels or document overflow. Saved in `routes-reduced.json`. Full motion restored afterward.
- Actual product workflow pin at top 110px with visible step progression; workflow exit clears the output section. Product overview direct navigation to Proof works. Platform folder pin and mobile product content captured and inspected.
- SPA navigation from a pinned product to Pricing leaves zero pins. Invalid evaluation-form submission focuses the email field and retains validation. Browser console returned no errors/warnings in the verified session.
- Production build and all ten existing data/export and worker/packaging tests passed.

Captures and audit JSON are in `qa/motion-v3/`. These are concept frontend checks, not proof of demand, production integration, connected submission or operating service.

Prior review result: passed

## Opening film — approved second-set option 2

Implemented the selected porcelain/optical-disc direction as a nine-second, 60 fps Remotion composition above the existing hero. The plate, porcelain surface and true-alpha lens were generated with the built-in ImageGen tool from the selected board; exact prompts and original PNGs are saved under `design-assets/intro/`, optimized production images under `public/assets/intro/`. Lens and camera animate independently. The final scene fades to ivory and Lenis moves to the hero; its entrance animation is now triggered when it comes into view. No MP4 was exported; the website plays the frame-accurate Remotion composition directly.

The selected board and actual paused website frame were combined in `qa/intro-film/comparison-selected-direction.png`, opened and compared together. The original material, palette, optical subject, left-aligned two-line thesis and calm spatial composition are retained. The lens is independently positioned for animation; its scale/crop vary across the film. Portrait uses separate placement so text and optical detail remain legible.

Browser evidence:

- Desktop 1280×720 actual film frame 270 inspected and saved (`desktop-film-final.png`); document width 1280, four existing homepage pins retained.
- Playback resumed and reached final frame 539. Automatic progression ended with hero stage at top 84px and scrollY 623. Saved hero completion frame.
- Replay from the hero returned to scrollY 0 before playback resumed (observed frame 4, playing=true). Pause and keyboard range scrubbing to frame 270 verified.
- Mobile 390×844 film frame 270 inspected; no horizontal overflow. Native skip tested.
- Reduced motion: no Player mounted, no pins, static poster and explicit Continue; no autoplay or forced advance. Full motion restored afterward.
- Product SPA navigation removes the intro completely and leaves its own single workflow pin. Browser console has no errors; the Player emits its standard Remotion licensing information notice.
- Build, six data/export tests, four worker/packaging tests and Remotion ESLint/TypeScript all passed.

Production service, connected forms, buyer claims and control boundaries are unchanged.

final result: passed


## Final QA — 24 October 2026

Fresh audit of the local production preview at http://127.0.0.1:4590, after the approved opening film. Browser evidence for this pass is in `qa/final-qa/`; earlier captures are not counted as fresh evidence.

### Findings resolved

- The inquiry review showed an internal module slug (`defect-desk`). It now shows the buyer-facing name **Defect Desk**. Rebuilt and verified through the walkthrough form; the three-step evaluation form also retained entered values when edited.
- A delayed film mount on an explicit `#intro` entry could reposition someone who had already begun scrolling. Initial repositioning now respects the manual-scroll cancellation flag. Offscreen scrolling paused the final film at frame 419; it remained paused without a completion jump.
- Opening-film buttons had 35.5px height in the mobile layout. Film and replay controls now have a 44px minimum height; measured 44px on the final build.
- Hardened image loading: reduced motion skips film-asset preloading; an asset-load failure keeps the still and offers Continue with an unavailable message. The real reduced-motion path was exercised; network-failure simulation was not performed.

### Verified

- **42/42 desktop routes**, 1280×720: one main H1, no document horizontal overflow or broken loaded images. All internal route destinations resolve to the canonical route list.
- **42/42 mobile routes**, 390×844: no document horizontal overflow; no pinned scenes.
- **42/42 reduced-motion routes**, 1280×720: no pinned scenes, no film Player, no document horizontal overflow. The intro presents a still and explicit Continue; Continue placed the mobile hero at 70px and focused its primary CTA.
- Additional checks of home, products, platform, case DT-103 and evaluation inquiry at **320px, 768px and 1024px**: no document horizontal overflow.
- Final desktop film: paused and keyboard-seeked to frame 270; resumed through frame 539; hero reached 84px below the viewport top and the primary CTA received focus. Replay returned to the beginning. Manual scrolling stopped offscreen playback and cancelled automatic advance.
- Former assembly overlap: actual art-wrapper bottom 171.5px, closing heading top 222.65px in the inspected exit frame. The statement is unobstructed; see `assembly-exit.png`.
- Desktop Products menu opens and dismisses with Escape, retaining trigger focus. Mobile navigation opens as a dialog, closes with Escape and restores focus to Open navigation.
- Evaluation: blank submission stayed invalid; completed three steps using fictional QA context; consent remained separate; local review explicitly said nothing was sent. Editing restored values. Rechecked readable module name in the rebuilt compact walkthrough summary.
- Demo DT-103: source R08 dialog showed event, recorded and import times; Escape closed it and returned focus. Saved a manual review and candidate lot; report reflected v2 and the local rationale. Actual HTML download retained DEMO labels, sources, contradictions and the no-control boundary. Reset restored seed rationale and unchecked selections. Unmatched search showed an empty state and reset option.
- Final route label scan: no buttons without text/label references, no images missing alt attributes, and no captured browser console errors. This is a basic semantics check, not a complete accessibility certification.
- Production build, **six data/export tests**, **four worker/packaging tests**, and Remotion ESLint/TypeScript all passed after fixes.

### Scope limits

This passes QA as a local concept website and isolated synthetic demo. Forms and sign-in remain explicitly unconnected previews. No real browser/device matrix, throttled-network performance benchmark, external-link health audit, production integration, deployment or domain verification is implied. The Remotion Player's standard licensing information notice remains present; no license acknowledgement was fabricated.

Final result: passed for local concept-preview scope.
