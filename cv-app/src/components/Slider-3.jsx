import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoaderSlider from "./loader/LoaderSlider";

export default function Slider({ slides = [] }) {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(null);

  const containerRef = useRef(null);
  const startX = useRef(0);
  // const translate = useRef(0);
  const dragging = useRef(false);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  // 🔁 Charger l’image courante et précharger la suivante
  useEffect(() => {
    if (!slides.length) return;

    setLoaded(false);
    const current = slides[index];
    const next = slides[(index + 1) % slides.length];

    const img = new Image();
    img.onload = () => {
      setCurrentSrc(current);
      setLoaded(true);
    };
    img.src = current;

    // Précharger la suivante pour éviter le flash
    if (next) {
      const preload = new Image();
      preload.src = next;
    }

    return () => {
      img.onload = null;
    };
  }, [index, slides]);

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
    const threshold = w * 0.15; // swipe min 15% to the next slide

    const img = containerRef.current.querySelector("img");
    if (img) img.style.transition = "transform 0.35s ease";

    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();
    else if (img) img.style.transform = "translateX(0)";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-neutral-100 "
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
        {!loaded ? (
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
            />
          )
        )}
      </div>

      {/* Flèches */}
      {slides.length > 1 && (
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            onClick={goPrev}
            className="bg-black/40 hover:bg-black/60 rounded-full p-[3px] pl-[2px] pr-[4px] transition"
          >
            <IoIosArrowBack className="text-[--bg_body] w-7 h-7 md:w-9 md:h-9 " />
          </button>
          <button
            onClick={goNext}
            className="bg-black/40 hover:bg-black/60 rounded-full p-[3px] pl-[4px] pr-[2px]  transition"
          >
            <IoIosArrowForward className="text-[--bg_body] w-7 h-7 md:w-9 md:h-9 " />
          </button>
        </div>
      )}

      {/* Compteur */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-[--bg_body] px-3 py-1 rounded-full text-sm font-medium ">
        {index + 1}/{slides.length}
      </div>
    </div>
  );
}
