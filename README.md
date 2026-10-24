# DefectTrail

A responsive concept website and isolated, read-only synthetic quality-investigation demo. This is a working frontend, not production factory software. No operational records, live integrations, authenticated review, real customer pipeline, payment, email delivery or achieved outcomes are represented.

## Preview

The reviewed local production preview is running at http://127.0.0.1:4590/ . The revised homepage uses Lenis synchronized with GSAP/ScrollTrigger: a pinned factory camera move, source-aware assembly tilt, five vertically advancing offer scenes, a four-stage evidence investigation and a reversible human-review reveal. Buttons have directional wipes, animated arrows and pointer response; source cards and artifact panels have depth feedback. Mobile and reduced-motion layouts keep the content in a vertical flow.

## Included

- 42 concrete routes: homepage; five product pages; platform; buyer and industry workflows; evaluation and hypothesis pricing; resources; company/contact; draft privacy/terms; accessibility; polished access presentation; and synthetic demo case/report routes.
- Three fictional incidents, fourteen timestamped evidence items, passed-unit and alternate-station counterexamples, missing genealogy, a named next action and an illustrative evaluation workspace.
- Source dialogs expose reference, locator, version, event, recorded and import timestamps.
- Manual draft suspect-lot selection, explicit counterevidence acknowledgment, local reviewer rationale, reset, and labeled HTML/JSON packet export. No containment execution.
- Qualification forms with separate follow-up and optional marketing choices. They validate and create a local review summary. Nothing is submitted. The access screen validates format only; no authentication or email occurs.
- Self-hosted Fraunces and Manrope, a custom brand mark, favicons, responsive navigation, keyboard focus and motion preferences.

## Run and verify

Node.js 20+ is recommended. Dependencies are pinned by `package-lock.json`.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4589 --strictPort
npm run test:unit
npm run build
npm run test:sites
npm run preview -- --host 127.0.0.1 --port 4590 --strictPort
```

`npm run build` writes the static frontend to `dist/client`, Sites worker to `dist/server/index.js`, and hosting metadata to `dist/.openai/hosting.json`. `vercel.json` supplies the static output and SPA fallback. The source is published on `main`; the generated `hostinger` branch contains only the static files for ordinary Hostinger PHP/HTML hosting. Domain connection and live Hostinger deployment are performed separately in hPanel.

## Project map

`src/data/content.js` holds offers, prices, copy, sources and the route manifest. `src/data/demo.js` holds the deterministic fictional records and portable packet serializer. `src/components/Workbench.jsx` manages memory-only review state. `src/components/Forms.jsx` handles local form review. Page layouts live in `src/pages`. CSS is split into foundations, homepage, supporting pages and responsive rules.

The generated artwork originals and alpha variants live in `design-assets/source`; the site serves optimized WebP files from `public/assets`. Regenerate encodings/favicons/fonts with `node scripts/prepare-assets.mjs` after installing dependencies. The originals are included for future design work, not sent as page assets.

## Claims and launch status

The five prices are interview test hypotheses: $2,500/case; $700/month/line; $1,200/month/line; $1,000/case; $800/month/site. They are separately scoped, with no active checkout, accepted current offer or savings guarantee.

A real pilot requires a quality lead, operator and data owner; appropriate procurement/legal approval for anonymized exports; three closed cases versus a pre-agreed human baseline; quality-lead grading of time to accepted evidence and false leads; failure on invented causal claims or missed contradictions; and a signed supervised paid scope. Production connectors remain future work.

Before any public data collection: verify brand/domain/legal entity, approve notices and actual retention/deletion processes, connect a consented lead service and delivery, and re-test end to end. Keep the synthetic demo isolated. No Notion activity has been performed.

## Analytics

The accessibility page offers optional memory-only diagnostics, off by default. No third-party tracking is installed and no form values are logged. Implemented preview diagnostics include route views, offer views, form starts and hero pilot-CTA intent. A local summary is not a submitted lead or booked meeting. The complete future seven-event, UTM, deduplication and consent plan, plus ad variants and pilot scorecard, is in the accompanying IA blueprint. Actual `form_submit` and `meeting_booked` events must await real confirmed service outcomes.

## Design and verification

See `design-qa.md` and `qa/` for actual browser captures, same-input source comparisons, route audits, interaction checks and residual launch boundaries. The screenshots show rendered HTML/CSS/React, not generated evidence of a working integration.

## Assets and attribution

Original concept illustrations and brand mark were generated with OpenAI ImageGen and edited for genuine transparency. Standard UI icons: Phosphor (MIT, included license). Fraunces and Manrope are self-hosted under SIL Open Font License; license files are in `public/fonts`. The Crunchbase service mark comes from the Simple Icons registry and indicates an unpublished profile, not a partnership. LinkedIn is likewise marked unpublished. No customer or vendor logo is used as proof of traction. Vendor workflow sources are linked and attributed on the research page without endorsement.

## Motion revision verification

`MOTION-DIRECTION.md` describes each scene. `qa/motion-v2/` contains actual browser captures at 1280×720, 1024×720 and 390×844, including hover and reduced-motion evidence. Full motion has four pin spacers at ordinary laptop dimensions; reduced motion and mobile have none. Native source dialogs, direct scene selection, reverse scroll, skip links and route cleanup were checked. The demo remains deterministic and disconnected.

## Site-wide motion extension

All 42 routes now share motion through `src/components/InnerPageMotion.jsx`, with sustained pins reserved for marketing workflows and source chapters. Products overview uses the same vertical offer component as the homepage. Form/demo/report/access pages keep task controls in normal flow. The homepage assembly pin has a separate exit boundary before the closing statement. Latest actual browser captures and three complete route audits are in `qa/motion-v3/`.

## Opening film

The homepage now starts with the approved porcelain/optical-disc intro above the hero. It plays for nine seconds, fades to ivory and moves smoothly into the existing hero. Pause, seeking, skip, replay, responsive portrait framing and reduced-motion poster are included. See `intro-film/README.md` for source, assets, exact prompts and the editable Studio. `qa/intro-film/` contains actual browser captures and the selected-board comparison.


## Hostinger static hosting (no Web App slot or PHP code)

Repository: https://github.com/PrajaktaAdlytica/DefectTrail

- `main`: editable React/Vite source, shared Remotion composition, assets and QA documentation.
- `hostinger`: generated HTML/CSS/JavaScript and assets, with `index.html` and `.htaccess` at its root. Connect **this branch**, not `main`, to standard Hostinger Git deployment.
- `.github/workflows/hostinger-static.yml`: on a push to `main`, GitHub Actions installs dependencies, tests/builds and replaces the generated branch. Do not edit generated files directly. Node runs at build time on GitHub, not on Hostinger.
- The intro and all current interactive frontend behavior run in the visitor's browser. No PHP files, database, environment variables or start command are required.

### First connection in hPanel

1. Have an active web/cloud hosting plan with a free regular website slot. A purchased domain alone does not include hosting; this method avoids a Web App slot but still uses a regular website slot and hosting resources.
2. Open Websites, choose the hosting plan, then Create website / Add website → Custom PHP/HTML → Empty website. Assign your purchased domain (or use a temporary domain first). Do not choose Deploy Web App or Website Builder. Labels can vary by account.
3. Back up any existing destination files before replacing them. For a new site, remove only its default placeholder page so `public_html` is empty for the initial Git deployment.
4. Open the site's Dashboard → Advanced → Git → Connect with GitHub. Authorize the Hostinger GitHub app for the DefectTrail repository only.
5. Select `PrajaktaAdlytica/DefectTrail`, branch **hostinger**, deploy directory **public_html**, and Deploy. No build command or output-folder setting is required in this standard Git screen: this branch is already built.
6. Enable automatic deployments. Future pushes to `main` build on GitHub; when the workflow updates `hostinger`, Hostinger pulls those compiled files. Verify the first automatic update in hPanel logs. If it does not trigger, use Redeploy after the GitHub workflow succeeds.
7. Check that `public_html/index.html`, `public_html/.htaccess` and `public_html/assets/` exist. Keep `.htaccess`: it lets direct visits and refreshes on `/products`, `/demo/cases/DT-103`, etc. work.
8. Ensure the purchased domain is assigned to this website. If it already uses Hostinger nameservers, Hostinger normally configures pointing during assignment. If DNS is managed elsewhere, use the exact records shown in hPanel; preserve email MX/TXT records. Allow up to 24 hours for DNS propagation.
9. In the site's SSL settings, check that the certificate is active, then enable HTTPS redirect if it is not already enabled. Test the apex domain and `www` after DNS resolves.
10. Verify the intro → hero transition, navigation, direct nested URLs, mobile layout, reduced motion and labeled demo export on the live domain. Forms and sign-in remain local previews; publishing does not connect them.

### Alternative: upload the prepared static ZIP

Upload the contents of `DefectTrail-Hostinger-Static.zip` into `public_html` using File Manager and extract there. The ZIP opens directly to `index.html`, `.htaccess`, `assets/`, etc.; do not add an extra parent folder. Back up existing files first. Use this alternative if your plan does not expose Git integration. It requires manual updates and does not bypass the regular website limit.

### Official Hostinger references

- https://www.hostinger.com/support/1583214-how-to-add-a-website-in-hostinger/
- https://docs.hostinger.com/websites/git
- https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/


## SVG brand kit

`public/assets/brand/` contains twelve genuine vector SVGs: primary/ink/reverse symbols, primary/ink/reverse horizontal logos, primary/ink/reverse stacked logos, and light/dark/automatic favicons. Wordmarks are outlined Fraunces paths and require no external font. The site uses the primary/reverse SVG symbol; the browser uses `public/favicon.svg`. PNG favicon sizes 16/32/180/192/512 and a 16+32 ICO are regenerated with `node scripts/prepare-brand.mjs`. The film uses the matching SVG-derived WebP for canvas compatibility. Fraunces attribution/license is included.
