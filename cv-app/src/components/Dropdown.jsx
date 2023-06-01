import React, { useState } from "react";
// import DropDownTitle from "../dropDownTitle/dropDownTitle";
import arrowBottom from "../assets/down.png";


function DropDown({ title, content }) {
  // TOGGLE
  const [isOpen, setIsOpen] = useState(false);
  const [topArrow, setTopArrow] = useState(false);
  const toggleContent = () => {
    setIsOpen(!isOpen);
    setTopArrow(!topArrow);
  };

  return (
    <div className="mt-[15px] sm:mt-[30px] flex flex-col w-full h-auto ">
      {/* TITLE */}
      <h3 className="title-DD">{title}</h3>
      <button className="btn-icon mx-auto" onClick={toggleContent}>
        <img
          className={topArrow ? "w-8 h-8 rotate-180" : "w-8 h-8"}
          src={arrowBottom}
          alt="arrow dropdown"
        />
      </button>
      {/* CONTENT */}
      {isOpen && (
        <div
          className={
            "w-fit h-full px-3 py-5  mx-auto"
          }
        >
          <ul className="flex flex-col flew-wrap list-disc p-3 pt-0 m-0 text-left">
            {content.map((item, index) => (
              <li
                key={index}
                className="w-auto h-auto text-xs sm:text-base leading-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
DropDown.defaultProps = {
  content: "Content is not available",
};
export default DropDown;
