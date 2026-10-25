Performance changes
===================

- Original artwork is preserved in `public/artwork`. The site uses generated WebP files and their real dimensions from `src/lib/artwork-images.json`.
- After replacing an original image, run `npm run images:optimize`, then rebuild. Output filenames contain a content hash so revised images cannot reuse stale optimized responses.
- Hero content and navigation render immediately. Scroll reveals use the browser animation API and remain visible without JavaScript.
- Star glows are cached, drawing is capped at 30fps, and animation stops when offscreen, in a hidden tab, or when reduced motion is requested. Scrolling uses native browser behavior.
- Fonts use variable weights; the grain texture is rasterized once and omitted on small screens.

Validation
----------

Run `npm run build`, then `npx tsc --noEmit --incremental false` (sequentially, because Next regenerates types during its build).

Run `node --test tests/performance.test.cjs` to verify image metadata and starfield lifecycle behavior.

For realistic loading performance, use `npm run build` followed by `npm start`. The development server also spends time compiling pages on demand.

Asset-size reductions refer to files on disk, not measured browser transfer savings: Next Image additionally resizes and optimizes images for each device.
