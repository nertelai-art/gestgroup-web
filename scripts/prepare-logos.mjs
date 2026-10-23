// Prepara els logos de clients (descarregats de gestgroup.es a _source/logos) per a la cinta del web:
// treu el fons blanc (passa a transparent, amb vora suau) i retalla el marge buit. Així es poden pintar
// en gris sobre fons clar o en blanc sobre fons fosc amb un simple `filter`, sense mescles de color.
//
//   node scripts/prepare-logos.mjs
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const from = path.resolve("_source/logos");
const to = path.resolve("public/clients");
// Blancor (el canal més baix) a partir de la qual un píxel comença a ser fons, i on ja ho és del tot.
const SOFT = 215;
const HARD = 248;

for (const file of (await readdir(from)).filter((name) => name.endsWith(".png"))) {
  const { data, info } = await sharp(path.join(from, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const whiteness = Math.min(data[i], data[i + 1], data[i + 2]);
    const keep = 1 - Math.min(1, Math.max(0, (whiteness - SOFT) / (HARD - SOFT)));
    data[i + 3] = Math.round(data[i + 3] * keep);
  }
  await sharp(data, { raw: info })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(to, file));
  console.log("✓", file);
}
