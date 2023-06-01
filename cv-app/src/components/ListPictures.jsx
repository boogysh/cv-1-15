import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function ListPictures(props) {
  return (
    <ul className="w-auto h-auto flex flex-wrap justify-center">
      {props.pictures.map((item) => {
        return (
          <li
            className="w-[90%] sm:w-[600px] h-auto p-0 m-[10px] rounded-[5px] shadow overflow-hidden "
            key={uuidv4()}
          >
            <img
              className="object-cover w-full h-full "
              src={item}
              alt="project details"
            />
          </li>
        );
      })}
    </ul>
  );
}
