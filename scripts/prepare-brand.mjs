import sharp from "sharp";
import fs from "node:fs/promises";
const base = "public/assets/brand/";
await sharp(base + "defecttrail-mark-primary.svg")
  .resize(256, 256)
  .webp({ lossless: true })
  .toFile("public/assets/brand-mark.webp");
await fs.copyFile(
  "public/assets/brand-mark.webp",
  "intro-film/public/assets/brand-mark.webp",
);
for (const size of [16, 32, 180, 192, 512]) {
  await sharp(base + "defecttrail-favicon-light.svg")
    .resize(size, size)
    .png()
    .toFile(`public/favicon-${size}.png`);
}
const images = await Promise.all(
  [16, 32].map((size) => fs.readFile(`public/favicon-${size}.png`)),
);
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
for (let i = 0; i < images.length; i++) {
  const start = 6 + i * 16,
    size = [16, 32][i];
  header[start] = size;
  header[start + 1] = size;
  header.writeUInt16LE(1, start + 4);
  header.writeUInt16LE(32, start + 6);
  header.writeUInt32LE(images[i].length, start + 8);
  header.writeUInt32LE(offset, start + 12);
  offset += images[i].length;
}
await fs.writeFile("public/favicon.ico", Buffer.concat([header, ...images]));
console.log("SVG-derived mark, PNG favicons and multi-size ICO prepared.");
