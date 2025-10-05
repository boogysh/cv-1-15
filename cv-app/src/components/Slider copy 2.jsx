import React, { useState, useRef, useEffect } from "react";
import arrowPreview from "../assets/arrowPreview4.png";
import arrowNext from "../assets/arrowNext4.png";

export default function Slider({ slides = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const threshold = 50;

  //Aller à la slide précédente / suivante
  const goToPrevious = () =>
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const goToNext = () =>
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  //----------- FIRST VERSION---------
  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };
  // const goToNext = () => {
  //   const isLastSlide = currentIndex === slides.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

  // Mettre à jour le translate quand currentIndex change
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    currentTranslate.current = -currentIndex * containerWidth;
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.35s ease";
      trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  }, [currentIndex]);

  // Ajuster le slider au resize
  useEffect(() => {
    const handleResize = () => {
      // const containerWidth = containerRef.current?.offsetWidth || 0;
      const containerWidth = containerRef.current?.clientWidth || 0;
      currentTranslate.current = -currentIndex * containerWidth;
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  // Pointeur (souris + tactile)
  const onPointerDown = (e) => {
    if (!trackRef.current || !containerRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    prevTranslate.current = currentTranslate.current;
    trackRef.current.style.transition = "none";
  };

  const onPointerMove = (e) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    const position = prevTranslate.current + dx;
    trackRef.current.style.transform = `translateX(${position}px)`;
  };

  const onPointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = e.clientX - startX.current;
    //  swipe fluide
    const time = e.timeStamp - e.nativeEvent.timeStamp;
    const velocity = Math.abs(dx / time);
    if (velocity > 0.3) {
      if (dx < 0) goToNext();
      else goToPrevious();
      return;
    }
    //
    if (dx < -threshold) goToNext();
    else if (dx > threshold) goToPrevious();
    else {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      trackRef.current.style.transition = "transform 0.35s ease";
      trackRef.current.style.transform = `translateX(${
        -currentIndex * containerWidth
      }px)`;
    }
  };

  if (!slides.length) return <div>Aucune image</div>;

  return (
    <div
      ref={containerRef}
      className="relative w-full  h-auto overflow-hidden"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        ref={trackRef}
        className="flex w-full  h-full overflow-hidden"
        style={{
          width: `${slides.length * 99.975}%`,
          // width: `${slides.length * 100}%`,
          transition: "transform 0.35s ease",
        }}
      >
        {slides.map((src, i) => (
          <div key={i} className="h-full  relative w-full ">
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
          <button onClick={goToPrevious} className="bg-transparent border-none">
            <img
              className="w-10 h-10 s:w-14 s:h-14"
              src={arrowPreview}
              alt="prev"
            />
          </button>
          <button onClick={goToNext} className="bg-transparent border-none">
            <img
              className="w-10 h-10 s:w-14 s:h-14"
              src={arrowNext}
              alt="next"
            />
          </button>
        </div>
      )}

      {/* compteur */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-semibold text-base s:text-[20px] text-shadow2">  
        {currentIndex + 1}/{slides.length}
      </div>
    </div>
  );
}


//drop-shadow
