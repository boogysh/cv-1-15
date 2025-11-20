import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import StarSparkle from "./StarSparkle";

export default function StarRating({
  totalStars = 5,
  rating,
  handlePost,
  onChange,
}) {
  const [hover, setHover] = useState(null);
  const [flyingStar, setFlyingStar] = useState(null);
  const [sparkIndex, setSparkIndex] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = (value) => {
    handlePost(value);

    // lance l'animation de l'étoile
    setFlyingStar(value);

    // explosion
    setTimeout(() => {
      setSparkIndex(value);
      // }, 850);
    }, 600);

    // reset
    timeoutRef.current = setTimeout(() => {
      setSparkIndex(null);
    }, 2000);
    timeoutRef.current = setTimeout(() => {
      setFlyingStar(null);
      // }, 1280);
    }, 1000);
  };

  return (
    <div className="flex items-center space-x-1 relative">
      {[...Array(totalStars)].map((_, idx) => {
        const value = idx + 1;
        const active = value <= (hover || rating);

        return (
          <div key={value} className="relative inline-block">
            <button
              type="button"
              onClick={() => handleClick(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(null)}
              className="flex items-center focus:outline-none"
            >
              <FaStar
                className={`
                  w-6 h-6 z-10 hover:scale-125 transition-transform linear
                  ${active ? "text-yellow-400" : "text-gray-300"}
                  ${flyingStar === value ? "star-fly" : ""}
                `}
              />
            </button>

            {sparkIndex === value && <StarSparkle color="sparkle-gold" />}
          </div>
        );
      })}
    </div>
  );
}
