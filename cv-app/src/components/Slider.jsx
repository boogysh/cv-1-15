import React, { useState, useRef, useEffect, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoaderSlider from "./loader/LoaderSlider";

import { loadImageWithFallback } from "../utils/loadImageWithFallback";
import filterImages from "../utils/filterImages";

export default function Slider({ slides = [] }) {
  // 🔹 Filtrer + trier + enlever doublons
  // 🔹 Filtrer + trier + enlever doublons
  // 🔹 Filtrer + trier + enlever doublons
  //
  const filteredSlides = useMemo(() => filterImages(slides), [slides]);
  //
  //

  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(null);

  const containerRef = useRef(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const goTo = (i) =>
    setIndex((i + filteredSlides.length) % filteredSlides.length);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (!filteredSlides.length) return;

    setLoaded(false);
    let cancelled = false;

    const loadCurrent = async () => {
      const src = await loadImageWithFallback(filteredSlides[index]);
      if (!cancelled) {
        setCurrentSrc(src);
        setLoaded(true);
      }
    };

    loadCurrent();

    // Précharger la prochaine image
    const next = filteredSlides[(index + 1) % filteredSlides.length];
    if (next) loadImageWithFallback(next);

    return () => {
      cancelled = true;
    };
  }, [index, filteredSlides]);

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
      {!loaded ? (
        <LoaderSlider />
      ) : (
        <img
          key={index}
          src={currentSrc}
          alt={`slide-${index}`}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
          draggable={false}
        />
      )}

      {filteredSlides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2"
          >
            <IoIosArrowBack className="text-[--bg_body] w-7 h-7" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2"
          >
            <IoIosArrowForward className="text-[--bg_body] w-7 h-7" />
          </button>
        </>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-[--bg_body] px-3 py-1 rounded-full text-sm font-medium">
        {index + 1}/{filteredSlides.length}
      </div>
    </div>
  );
}
