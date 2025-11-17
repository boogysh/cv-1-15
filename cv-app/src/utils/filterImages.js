export default function filterImages(images = []) {
  if (!Array.isArray(images)) return [];

  const priority = [
    "cv-api-omega.vercel.app", // priorité absolue
    "boogysh.github.io",
  ];

  const formatPriority = ["webp", "jpg", "png"];

  const groups = {};

  images.forEach((url) => {
    if (typeof url !== "string") return;

    // Extraire ID unique d'image
    // ex : pr3-stade-1
    const fileName = url.split("/").pop().split(".")[0];

    if (!groups[fileName]) groups[fileName] = [];
    groups[fileName].push(url);
  });

  const result = [];

  Object.values(groups).forEach((urls) => {
    // Trier par priorités
    urls.sort((a, b) => {
      const hostA = priority.findIndex((p) => a.includes(p));
      const hostB = priority.findIndex((p) => b.includes(p));

      if (hostA !== hostB) return hostA - hostB;

      const extA = a.split(".").pop();
      const extB = b.split(".").pop();

      return formatPriority.indexOf(extA) - formatPriority.indexOf(extB);
    });

    // Garder SEULEMENT la meilleure URL
    result.push(urls[0]);
  });

  return result;
}

// export default function filterImages(images) {
//   const map = new Map();

//   images.forEach((url) => {
//     const clean = url.replace(/\.(jpg|jpeg|png|webp)$/i, "");
//     const ext = url.split(".").pop().toLowerCase();

//     // Si pas encore dans la map → ajouter
//     if (!map.has(clean)) {
//       map.set(clean, { webp: null, jpg: null, png: null, jpeg: null });
//     }

//     // Ranger dans le bon format
//     const obj = map.get(clean);
//     if (ext === "webp") obj.webp = url;
//     else if (ext === "jpg") obj.jpg = url;
//     else if (ext === "jpeg") obj.jpeg = url;
//     else if (ext === "png") obj.png = url;
//   });

//   // Sélection finale dans l’ordre webp > jpg > png > jpeg
//   const result = [];

//   map.forEach((formats) => {
//     result.push(
//       formats.webp ||
//       formats.jpg ||
//       formats.png ||
//       formats.jpeg ||
//       null
//     );
//   });

//   return result.filter(Boolean); // enlever les null
// }
