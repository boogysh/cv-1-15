// optimize-images.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const INPUT_DIR = "./assets/";
const OUTPUT_DIR = "./assets/assets_optimized/";
const MAX_WIDTH = 700;      // largeur max
const QUALITY = 70;          // qualité JPEG / WebP
 
// 🔧 Vérifie que le dossier output existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// 🔎 Récupère tous les fichiers du dossier
function getAllImages(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      results.push(filePath);
    }
  });
  return results;
}

// 🚀 Optimisation principale
async function optimizeImage(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const outputBase = path.join(OUTPUT_DIR, fileName);

  console.log("Optimizing:", filePath);

  try {
    const img = sharp(filePath).resize({ width: MAX_WIDTH });

    // // // 🎯 Génère une version JPEG optimisée
    // await img
    //   .jpeg({ quality: QUALITY })
    //   .toFile(`${outputBase}.jpg`);

    //🎯 Génère une version WebP ultra compressée
    await img
      .webp({ quality: QUALITY })
      .toFile(`${outputBase}.webp`);

//     console.log("✔ Done:", fileName);
  } catch (err) {
    console.error("❌ Error optimizing", filePath, err);
  } 
}

// 🚀 Script principal
async function run() {
  const images = getAllImages(INPUT_DIR);
  console.log(`🔍 Found ${images.length} images.`);

  for (const img of images) {
    await optimizeImage(img);
  }

  console.log("✨ ALL IMAGES OPTIMIZED!");
}

run();
