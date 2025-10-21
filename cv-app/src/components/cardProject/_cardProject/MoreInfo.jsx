import React from "react";
import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";

export default function LinkToProjectDevNew(props) {
  // const { t } = useSelector((state) => state.langReducer);

  return (
    <div
      className={`absolute top-0 left-0 translate-y-100-percents ${
        props.moreInfo && "translate-y-0-percents"
      } transition-transform ease-in-out duration-300 w-full h-full flex flex-col justify-center items-center  bg-[#ebdede]`}
    >
      <div className="relative h-auto  flex flex-wrap p-3 justify-center overflow-hidden">
        <ul className=" pr-2 h-[100%]  p-5 pt-0  overflow-scroll  sm:overflow-auto">
          {props.info.map((item) => (
            <li className="list-disc" key={uuidv4()}>
              <p className="text-[11px] font-sans w-auto  xxs:text-[12px] xs:text-[13px]  s:leading-4  s:text-[14px] mb-[0px]  s:mb-[5px] ">
                
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
