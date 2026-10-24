# DefectTrail — Beneath the Surface

Approved visual: **option 2 of the second visual-direction set**, `outputs/defecttrail-intro-directions-round-2/02-beneath-the-surface.png`. This is the porcelain/optical-disc direction, not the first set's factory illustration.

Nine-second silent Remotion composition, 60 fps / 540 frames. Shared source: `src/Film.jsx`. Studio compositions: `BeneathSurface` (1920×1080) and `BeneathSurfacePortrait` (1080×1700). The website Player adapts composition height to the viewport. The editable Studio is running at http://localhost:4601/BeneathSurface.

The film uses a generated porcelain background and a separate true-alpha optical-disc asset. The camera and disc have independent deterministic transforms; the two text lines enter in sequence; the scene and closing wordmark fade to the site's ivory. The website then uses Lenis to move to the existing hero. The hero entrance begins as it comes into view. This is an interactive Remotion film embedded in the website; an MP4 was not exported.

The intro is a normal section above the hero. It has pause/play, keyboard-accessible seeking, skip and replay. Automatic progression is canceled by manual scrolling; hidden/offscreen playback pauses. No scroll lock. Reduced motion uses a static poster and an explicit Continue control. Completion is remembered in `sessionStorage` under `dt-intro-seen` so returning visits can land at the hero. The `#intro` link explicitly opens the film.

Production assets: `../public/assets/intro/{surface,lens,poster}.webp`; editable PNG sources: `../design-assets/intro/`. Exact built-in ImageGen prompts are saved in `../design-assets/intro/Generation-Prompts.txt`. The bitmap sources are original concept artwork, not operational evidence.

Official implementation references: [Remotion Player](https://www.remotion.dev/docs/player/player), [Player best practices](https://www.remotion.dev/docs/player/best-practices).

Validation: Studio preview inspected; lint and TypeScript passed; website production build and ten existing data/export/packaging tests passed. Browser captures and visual comparison are in `../qa/intro-film/`.
