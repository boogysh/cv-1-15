import React, { useState, useRef, useEffect } from "react";
import arrowPrev from "../assets/arrowPreview4.png";
import arrowNext from "../assets/arrowNext4.png";

export default function Slider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const translate = useRef(0);
  const dragging = useRef(false);
  const threshold = 50;

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    // const w = containerRef.current?.clientWidth || 0;
    const w = containerRef.current?.offsetWidth || 0;
    translate.current = -index * w;
    trackRef.current.style.transition = "transform 0.35s ease";
    trackRef.current.style.transform = `translateX(${translate.current}px)`;
  }, [index]);

  const onDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX;
    trackRef.current.style.transition = "none";
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    const dx = x - startX.current;
    trackRef.current.style.transform = `translateX(${
      translate.current + dx
    }px)`;
  };
  const onUp = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    const x = e.clientX || e.changedTouches?.[0]?.clientX;
    const dx = x - startX.current;
    //  swipe fluide
    const time = e.timeStamp - e.nativeEvent.timeStamp;
    const velocity = Math.abs(dx / time);
    if (velocity > 0.3) {
      if (dx < 0) goNext();
      else goPrev();
      return;
    }
    //
    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();
    else
      trackRef.current.style.transform = `translateX(${translate.current}px)`;
  };

  if (!slides.length) return <div>Aucune image</div>;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden "
      style={{ touchAction: "pan-y" }}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          // width: `${slides.length * 100}%`,  aprox---slide-n20  on the left side rest visible the prev slide
          width: `${slides.length * 99.978}%`,
          transition: "transform 0.35s ease",
        }}
      >
        {slides.map((src, i) => (
          <div key={i} className="w-full h-full relative">
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* flèches */}
      {slides.length > 1 && (
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button onClick={goPrev} className="bg-transparent border-none">
            <img
              className="w-10 h-10 s:w-14 s:h-14"
              src={arrowPrev}
              alt="prev"
            />
          </button>
          <button onClick={goNext} className="bg-transparent border-none">
            <img
              className="w-10 h-10 s:w-14 s:h-14"
              src={arrowNext}
              alt="next"
            />
          </button>
        </div>
      )}

      {/* compteur */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-semibold text-[20px] text-shadow2">
        {index + 1}/{slides.length}
      </div>
    </div>
  );
}
