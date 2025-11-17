// scripts/generateImagesFiles.mjs
import fs from "fs";
import path from "path";
import { fr } from "./fr.js"; // Import original
import { en } from "./en.js";
import { ro } from "./ro.js";

const outputDir = path.resolve("./");

// 🔹 Fonction utilitaire pour créer un fichier JS
const writeJSFile = (filename, content) => {
  fs.writeFileSync(path.join(outputDir, filename), content, "utf-8");
  console.log(`✅ ${filename} généré`);
};

// 🔹 Créer la liste des images avec fallback Vercel + GitHub
const createPicturesArray = (originalUrl) => {
  const base = originalUrl.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return [
    `${base}.webp`.replace(
      "https://boogysh.github.io/cv-api/images",
      "https://cv-api-omega.vercel.app"
    ), // Vercel WebP
    `${base}.webp`, // GitHub WebP
    `${base}.jpg`.replace(
      "https://boogysh.github.io/cv-api/images",
      "https://cv-api-omega.vercel.app"
    ), // Vercel JPG
    `${base}.jpg`, // GitHub JPG
  ];
};

// 🔹 Extraire les images d’un tableau de cartes et dédupliquer
const extractImages = (cardsArray) => {
  const obj = {};
  cardsArray.forEach((card) => {
    const uniquePics = [
      ...new Set(card.pictures.flatMap((pic) => createPicturesArray(pic))),
    ];
    obj[card.id] = {
      id: card.id,
      cover: card.cover.replace(
        "https://boogysh.github.io/cv-api/images",
        "https://cv-api-omega.vercel.app"
      ),
      pictures: uniquePics,
    };
  });
  return obj;
};

// 🔹 Générer les fichiers images
const generateImagesFile = (cardsArray, filename) => {
  if (!cardsArray || !cardsArray.length) return {};
  const imagesObj = extractImages(cardsArray);
  const content = `export const ${path.basename(
    filename,
    ".js"
  )} = ${JSON.stringify(imagesObj, null, 2)};\n`;
  writeJSFile(filename, content);
  return imagesObj;
};

// 🔹 Générer imagesArch, imagesBat, imagesDev, imagesServices
const imagesArch = generateImagesFile(fr.cardArch, "imagesArch.js");
const imagesBat = generateImagesFile(fr.cardBat, "imagesBat.js");
const imagesDev = generateImagesFile(fr.cardDev, "imagesDev.js");
const imagesServices = generateImagesFile(fr.cardServices, "imagesServices.js");

// 🔹 Utilitaire pour mapper les cartes avec références dynamiques
const mapCardsWithImages = (cardsArray, imagesObjName) => {
  return `[${cardsArray
    .map(
      (card) => `{
  id: "${card.id}",
  title: ${JSON.stringify(card.title)},
  description: ${JSON.stringify(card.description)},
  info: ${JSON.stringify(card.info)},
  technos: ${JSON.stringify(card.technos)},
  cover: ${imagesObjName}["${card.id}"].cover,
  pictures: ${imagesObjName}["${card.id}"].pictures
}`
    )
    .join(",\n")}]`;
};

// 🔹 Fonction pour générer un fichier corrected pour une langue donnée
const generateCorrectedFile = (langData, langCode) => {
  const content = `
import { imagesArch } from "./imagesArch.${langCode}.js";
import { imagesBat } from "./imagesBat.${langCode}.js";
import { imagesDev } from "./imagesDev.${langCode}.js";
import { imagesServices } from "./imagesServices.${langCode}.js";

export const ${langCode} = {
  cardArch: ${mapCardsWithImages(langData.cardArch, "imagesArch")},
  cardBat: ${mapCardsWithImages(langData.cardBat, "imagesBat")},
  cardDev: ${mapCardsWithImages(langData.cardDev, "imagesDev")},
  cardServices: ${mapCardsWithImages(langData.cardServices, "imagesServices")}
};
`;
  writeJSFile(`${langCode}.corrected.js`, content);
};

// 🔹 Générer les trois fichiers
generateCorrectedFile(fr, "fr");
generateCorrectedFile(en, "en");
generateCorrectedFile(ro, "ro");

console.log("✅ fr.corrected.js, en.corrected.js et ro.corrected.js générés avec références aux objets images");

