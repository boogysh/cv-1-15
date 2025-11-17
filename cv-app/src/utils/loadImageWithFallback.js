// utils/loadImageWithFallback.js

export const loadImageWithFallback = (path) => {
  return new Promise((resolve) => {
    const base = path.replace(/\.(jpg|jpeg|png|webp)$/i, "");

    const webp = `${base}.webp`;
    const jpg = `${base}.jpg`;
    const png = `${base}.png`;
    const jpeg = `${base}.jpeg`;

    const img = new Image();

    img.onload = () => resolve(img.src);
    img.onerror = () => {
      const img2 = new Image();
      img2.onload = () => resolve(img2.src);
      img2.onerror = () => {
        const img3 = new Image();
        img3.onload = () => resolve(img3.src);
        img3.onerror = () => {
          const img4 = new Image();
          img4.onload = () => resolve(img4.src);
          img4.onerror = () => resolve(null);
          img4.src = jpeg;
        };
        img3.src = png;
      };
      img2.src = jpg;
    };

    img.src = webp;
  });
};
