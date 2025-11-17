//slider 4 + first image en parametres
//slider 4 + first image en parametres
//slider 4 + first image en parametres
//slider 4 + first image en parametres + architecture + useEffect

import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoaderSlider from "./loader/LoaderSlider";

export default function Slider({ slides = [], firstImage = null }) {
  const [currentSrc, setCurrentSrc] = useState(firstImage || null);
  const [loaded, setLoaded] = useState(Boolean(firstImage));
  const [index, setIndex] = useState(0);

  const containerRef = useRef(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  // 🔁 Charger l'image courante et précharger la suivante
 useEffect(() => {
  // 1️⃣ Affiche firstImage si on a un placeholder et que currentSrc n'est pas défini
  if (firstImage && !currentSrc) {
    setCurrentSrc(firstImage);
    setLoaded(true);
  }

  // 2️⃣ Si pas de slides, on sort (on garde firstImage affichée)
  if (!slides.length) return;

  const currentSlide = slides[index];
  const nextSlide = slides[(index + 1) % slides.length];

  // ⚡ Charger la vraie image du slide courant si c'est différent de currentSrc
  if (currentSrc !== currentSlide) setLoaded(false);

  const img = new Image();
  img.onload = () => {
    setCurrentSrc(currentSlide);
    setLoaded(true);
  };
  img.src = currentSlide;

  // Précharger la suivante
  if (nextSlide) {
    const preload = new Image();
    preload.src = nextSlide;
  }

  return () => {
    img.onload = null;
  };
}, [index, slides, firstImage, currentSrc]);



  // 🔧 Gestion du swipe
  const onDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const dx = x - startX.current;
    const img = containerRef.current.querySelector("img");
    if (img) img.style.transform = `translateX(${dx}px)`;
  };

  const onUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;

    const x = e.clientX || e.changedTouches?.[0]?.clientX;
    const dx = x - startX.current;
    const w = containerRef.current.offsetWidth;
    const threshold = w * 0.15;

    const img = containerRef.current.querySelector("img");
    if (img) img.style.transition = "transform 0.35s ease";

    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();
    else if (img) img.style.transform = "translateX(0)";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-neutral-100"
      style={{ touchAction: "pan-y" }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      {/* Image courante */}
      <div className="absolute inset-0 flex items-center justify-center">
        {!loaded && !currentSrc ? (
          <LoaderSlider />
        ) : (
          currentSrc && (
            <img
              key={index}
              src={currentSrc}
              alt={`slide-${index}`}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              style={{ transform: "translateX(0)" }}
              draggable={false}
              loading="lazy"
            />
          )
        )}
      </div>

      {/* Flèches de navigation */}
      {slides.length > 1 && (
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={goPrev}
            className="bg-black/40 hover:bg-black/60 rounded-full p-[3px] pl-[2px] pr-[4px] transition"
          >
            <IoIosArrowBack className="text-[--bg_body] w-7 h-7 md:w-9 md:h-9" />
          </button>
          <button
            onClick={goNext}
            className="bg-black/40 hover:bg-black/60 rounded-full p-[3px] pl-[4px] pr-[2px] transition"
          >
            <IoIosArrowForward className="text-[--bg_body] w-7 h-7 md:w-9 md:h-9" />
          </button>
        </div>
      )}

      {/* Compteur */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-[--bg_body] px-3 py-1 rounded-full text-sm font-medium">
        {index + 1}/{slides.length}
      </div>
    </div>
  );
}
