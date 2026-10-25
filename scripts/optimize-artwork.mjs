import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Preserve original artwork. Run again after replacing an image.
const names = ["hero", "artist-portrait-1", ...Array.from({ length: 7 }, (_, i) => `painting-${i + 1}`), ...Array.from({ length: 3 }, (_, i) => `event-${i + 1}`)];
await mkdir("public/artwork/optimized", { recursive: true });
// Bake the existing SVG texture once instead of filtering a full-screen layer.
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`)).png().toFile("public/grain.png");
const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
for (const name of names) {
  const input = await readFile(`public/artwork/${name}.png`);
  const { data, info } = await sharp(input).rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: name === "hero" ? 78 : 84, effort: 5 }).toBuffer({ resolveWithObject: true });
  const hash = createHash("sha256").update(data).digest("hex").slice(0, 12);
  const src = `/artwork/optimized/${name}-${hash}.webp`;
  await writeFile(`public${src}`, data);
  manifest[name] = { src, w: info.width, h: info.height };
  originalBytes += input.length;
  optimizedBytes += data.length;
}
await writeFile("src/lib/artwork-images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ originalBytes, optimizedBytes, reduction: `${(100 * (1 - optimizedBytes / originalBytes)).toFixed(1)}%` }));
