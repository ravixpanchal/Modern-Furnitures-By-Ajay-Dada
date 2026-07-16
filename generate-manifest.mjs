/**
 * generate-manifest.mjs
 * ---------------------------------------------------------------
 * Scans the `furnitures/` folder (all 86 photos) and the
 * `furnitures_class/` folder (Bedroom, Customs, Kitchens,
 * "Living rooms", Wardrobe) and writes `manifest.json`, which the
 * website reads to build the hero slider, showcase strip,
 * categories and gallery — WITHOUT you having to type filenames
 * by hand.
 *
 * Usage:
 *   1. Put your 86 photos inside  ./furnitures/
 *   2. Put category photos inside ./furnitures_class/Bedroom/, etc.
 *   3. Run:  node generate-manifest.mjs
 *   4. Re-run it any time you add/remove photos.
 *
 * Requires Node.js 18+ (no extra packages needed).
 */

import { readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|svg)$/i;
const ROOT = process.cwd();

const CLASS_DIR = "furnitures_class";

function listImages(relDir) {
  const abs = join(ROOT, relDir);
  try {
    return readdirSync(abs)
      .filter((f) => IMAGE_EXT.test(f) && statSync(join(abs, f)).isFile())
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `${relDir}/${f}`.replace(/\\/g, "/"));
  } catch (err) {
    console.warn(`⚠️  Could not read "${relDir}" (${err.code}). Skipping.`);
    return [];
  }
}

const all = listImages("furnitures");
const bg_images = listImages("bg_images");

// Scan furnitures_class subfolders dynamically
let categoryFolders = [];
try {
  categoryFolders = readdirSync(join(ROOT, CLASS_DIR))
    .filter((f) => statSync(join(ROOT, CLASS_DIR, f)).isDirectory())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
} catch (err) {
  console.warn(`⚠️  Could not read "${CLASS_DIR}" directory:`, err);
}

const categories = {};
for (const folder of categoryFolders) {
  categories[folder] = listImages(`${CLASS_DIR}/${folder}`);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  totalFurnitureImages: all.length,
  all,
  categories,
  bg_images,
};

writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log("✅ manifest.json written");
console.log(`   furnitures/            ${all.length} images`);
console.log(`   bg_images/             ${bg_images.length} images`);
for (const [label, imgs] of Object.entries(categories)) {
  console.log(`   furnitures_class/${label.padEnd(25)} ${imgs.length} images`);
}
if (all.length === 0) {
  console.log("\n⚠️  No images found in furnitures/. Add your 86 photos there and re-run this script.");
}
