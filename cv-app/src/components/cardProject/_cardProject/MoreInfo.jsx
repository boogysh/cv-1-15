import React from "react";
import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";

export default function LinkToProjectDevNew(props) {
  // const { t } = useSelector((state) => state.langReducer);

  return (
    <div
      className={`absolute top-0 left-0 translate-y-100-percents ${
        props.moreInfo && "translate-y-0-percents"
      } transition-transform ease-in-out duration-300 w-full h-full flex flex-col justify-center items-center cursor-pointer bg-[#ebdede]`}
    >
      <div className="flex flex-wrap p-3 pr-10  justify-center">
        <ul className="pr-2  s:p-5 pt-0">
          {props.info.map((item) => (
            <li className="list-disc" key={uuidv4()}>
              <p className="text-[11px] font-sans leading-[12px] s:leading-4  s:text-[14px] mb-[5px]">
                {" "}
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
