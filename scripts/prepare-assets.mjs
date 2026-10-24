import sharp from "sharp";
import fs from "node:fs/promises";
const names = [
  "factory-panorama",
  "exploded-assembly",
  "evidence-folder",
  "review-packet",
  "inspection-board",
  "station-fixture",
];
for (const name of names) {
  await sharp(`design-assets/source/${name}-transparent.png`)
    .webp({ quality: 88, effort: 6 })
    .toFile(`public/assets/${name}.webp`);
}
await import("./prepare-brand.mjs");
for (const [pkg, file] of [
  ["fraunces", "fraunces-latin-full-normal.woff2"],
  ["manrope", "manrope-latin-wght-normal.woff2"],
]) {
  await fs.copyFile(
    `node_modules/@fontsource-variable/${pkg}/files/${file}`,
    `public/fonts/${file}`,
  );
  await fs.copyFile(
    `node_modules/@fontsource-variable/${pkg}/LICENSE`,
    `public/fonts/${pkg}-LICENSE.txt`,
  );
}
await fs.writeFile(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "DefectTrail · Concept preview",
      short_name: "DefectTrail",
      start_url: "/",
      display: "browser",
      background_color: "#f7f4ed",
      theme_color: "#f7f4ed",
      icons: [
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ),
);
console.log(
  "Six illustrated WebP assets, brand mark, favicons and local font licenses prepared.",
);
