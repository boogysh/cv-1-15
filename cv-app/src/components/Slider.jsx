import React, { useState, useRef, useEffect } from "react";
import arrowPrev from "../assets/arrowPreview4.png";
import arrowNext from "../assets/arrowNext4.png";
import LoaderSlider from "./loader/LoaderSlider";

export default function Slider({ slides = [] }) {
  // const [mainImage, setMainImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const translate = useRef(0);
  const dragging = useRef(false);
  // const threshold = 50;
  const threshold = (containerRef.current?.offsetWidth || 300) * 0.15; // need to swipe 15% of slide width

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
    // const time = e.timeStamp - e.nativeEvent.timeStamp;
    // const velocity = Math.abs(dx / time);
    // if (velocity > 0.5) {
    //   if (dx < 0) goNext();
    //   else goPrev();
    //   return;
    // }
    // //
    if (dx < -threshold) goNext();
    else if (dx > threshold) goPrev();
    else
      trackRef.current.style.transform = `translateX(${translate.current}px)`;
  };
  //

  //Charger uniquement la première image dès le départ
  useEffect(() => {
    setLoaded(false);

    const first = slides[0];

    const img = new Image();
    img.onload = () => {
      // setMainImage(first);
      setLoaded(true);
    };
    img.src = first;

    if (img.complete && img.naturalWidth !== 0) {
      setLoaded(true);
    }

    return () => {
      img.onload = null;
      img.onerror = null;
      setLoaded(true);
    };
  }, [slides]);

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
            {!loaded ? (
              <div className="flex  w-full h-ratio   overflow-hidden">
                <LoaderSlider />
              </div>
            ) : (
              loaded && (
                <img
                  src={src}
                  // src={mainImage}
                  alt={`slide-${i}`}
                  // className="w-full h-full object-cover select-none"
                  className={`w-full h-full object-cover select-none transition-opacity duration-500 `}
                  draggable={false}
                  // loading="eager" // 👈 important : charge en priorité
                  loading="lazy"
                />
              )
            )}
          </div>
        ))}
        {/* Image courante */}
      </div>

      {/* Erreur */}
      {/* {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-red-600 text-sm font-medium bg-gray-50 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M5.5 19h13a2 2 0 002-2V7a2 2 0 00-2-2h-13A2 2 0 003.5 7v10a2 2 0 002 2z"
            />
          </svg>
          Image indisponible
        </div>
      )} */}

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

// //Charger uniquement la première image dès le départ
//   useEffect(() => {
//     if (!slides || slides.length === 0) {
//       setError(true);
//       return;
//     }

//     let cancelled = false;
//     setLoaded(false);
//     setError(false);

//     // 1️⃣ Définir et charger la première image
//     const first = slides[0];

//     const img = new Image();
//     img.onload = () => {
//       if (!cancelled) {
//         // 2️⃣ Lancer ensuite le préchargement séquentiel des autres images
//         // setMainImage(currentImage);
//         setMainImage(first);
//         setLoaded(true);
//       }
//     };

//     img.onerror = () => {
//       if (!cancelled) setError(true);
//     };
//     img.src = first;
//     // // img.src = currentImage;

//     // 3️⃣ Si déjà en cache
//     if (img.complete && img.naturalWidth !== 0) {
//       if (!cancelled) {
//         setLoaded(true);
//       }
//     }

//     return () => {
//       cancelled = true;
//       img.onload = null;
//       img.onerror = null;
//     };
//   }, [slides]);
