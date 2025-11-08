import React, { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import StarSparkle from "./StarSparkle";

export default function StarRating({
  totalStars = 5,
  rating,
  setRating,
  handlePost,
  onChange,
}) {
  const [hover, setHover] = useState(null);
  const [animateIndex, setAnimateIndex] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleClick = (value) => {
    setRating(value);
    if (onChange) onChange(value);

    // 🟢 on passe directement la valeur à handlePost
    handlePost(value);

    setAnimateIndex(value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAnimateIndex(null), 1500);
  };

  return (
    <div className="flex items-center space-x-1 relative">
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1;
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
                className={`w-6 h-6 transition-transform duration-150 ${
                  active ? "text-yellow-400" : "text-gray-300"
                } ${animateIndex === value ? "pop-star" : ""}`}
              />
            </button>

            {animateIndex === value && <StarSparkle color="sparkle-gold" />}
          </div>
        );
      })}
    </div>
  );
}



// import React, { useState, useRef, useEffect } from "react";
// import { FaStar } from "react-icons/fa";
// import "./StarSparkle.css";
// import StarSparkle from "./StarSparkle";

// export default function StarRating({
//   totalStars = 5,
//   initialRating = 0,
//   rating,
//   setRating,
//   handlePost,
// }) {
//   // const [rating, setRating] = useState(initialRating);
//   const [hover, setHover] = useState(null);
//   const [animateIndex, setAnimateIndex] = useState(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const handleClick = (value) => {
//     setRating(value);
//     handlePost();

//     setAnimateIndex(value);
//     clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => setAnimateIndex(null), 1500);
//   };

//   return (
//     <div className="flex items-center space-x-1 relative">
//       {[...Array(totalStars)].map((_, index) => {
//         const value = index + 1;
//         const active = value <= (hover || rating);

//         return (
//           <div key={value} className="relative inline-block">
//             <button
//               type="button"
//               onClick={() => handleClick(value)}
//               onMouseEnter={() => setHover(value)}
//               onMouseLeave={() => setHover(null)}
//               className="flex items-center focus:outline-none "
//             >
//               <FaStar
//                 className={`w-6 h-6 transition-transform duration-150 ${
//                   active ? "text-yellow-400" : "text-gray-300"
//                 } ${animateIndex === value ? "pop-star" : ""}`}
//               />
//             </button>
//             {animateIndex === value && <StarSparkle color={"sparkle-gold"} />}
//           </div>
//         );
//       })}
//       {/* <span className="pl-1 text-base text-gray-600 tracking-[-1.5px]">
//         {rating} / {totalStars}
//       </span> */}
//     </div>
//   );
// }

