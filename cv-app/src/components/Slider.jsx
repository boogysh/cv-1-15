import React, { useState } from "react";
import arrowPreview from "../assets/arrowPreview4.png";
import arrowNext from "../assets/arrowNext4.png";

function Slider({ slides }) {
  const [currentIndex, setcurrentIndex] = useState(0);
  const slidesNbs = slides.length;
  const currentSlide = currentIndex + 1;
  const arrow = slidesNbs > 1;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
  };
  return (
    <div className="w-full h-auto relative bg-[#ebdede] border-[8px] border-solid border-[#ebdede]">
      <img
        className="w-full h-full absolute top-0 rounded-[10px] object-cover "
        src={slides[currentIndex]}
        alt="project details"
      />
      <div className="w-full h-full flex justify-between items-center absolute">
        <button
          onClick={goToPrevious}
          className="w-auto h-auto bg-transparent border-none"
        >
          {arrow && (
            <img
              className="w-8 h-8 s:w-12 s:h-12"
              src={arrowPreview}
              alt="preview button"
            />
          )}
        </button>
        <button
          onClick={goToNext}
          className="w-auto h-auto bg-transparent border-none"
        >
          {arrow && (
            <img
              className="w-8 h-8 s:w-12 s:h-12"
              src={arrowNext}
              alt="next button"
            />
          )}
        </button>
      </div>
      <div className="font-semibold text:base s:text-lg text-white text-shadow absolute bottom-8 left-[46%] z-1000">
        {currentSlide}/{slidesNbs}
      </div>
    </div>
  );
}

export default Slider;
