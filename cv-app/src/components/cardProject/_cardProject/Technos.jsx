import React from "react";

import { v4 as uuidv4 } from "uuid";
import { FaAws, FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { TbApi, TbBrandJavascript } from "react-icons/tb";
import { SiMongodb, SiRedux, SiTailwindcss, SiThemoviedatabase } from "react-icons/si";
import { IoLogoSass } from "react-icons/io";
import { ImYoutube2 } from "react-icons/im";

const Technos = ({ technos }) => {
  return (
    <div>
      {technos?.map(
        (el) =>
          (el === "html" && (
            <FaHtml5 key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "css" && (
            <FaCss3Alt className="icon-technos" />
          )) ||
          (el === "sass" && (
            <IoLogoSass key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "tailwind" && (
            <SiTailwindcss
              key={uuidv4()}
              className="icon-technos"
            />
          )) ||
          (el === "redux" && (
            <SiRedux
              key={uuidv4()}
              className="icon-technos w-5 h-5 s:w-6 s:h-6"
            />
          )) ||
          (el === "js" && (
            <TbBrandJavascript
              key={uuidv4()}
              className="icon-technos"
            />
          )) ||
          (el === "react" && (
            <FaReact key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "node" && (
            <FaNodeJs key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "mongoDB" && (
            <SiMongodb key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "aws" && (
            <FaAws key={uuidv4()} className="icon-technos" />
          )) ||
          (el === "themoviedb" && (
            <div>
              <TbApi key={uuidv4()} className="icon-technos mb-0"/>
              <SiThemoviedatabase
                key={uuidv4()}
                className="icon-technos relative bottom-2 mb-0"
              />
            </div>
          ))||
          (el === "youtube" && (
            <div>
              <TbApi key={uuidv4()} className="icon-technos mb-0"/>
              <ImYoutube2
                key={uuidv4()}
                className="icon-technos relative bottom-[10px] s:bottom-[14px] mb-0"
              />
            </div>
          )) 
      )}
    </div>
  );
};

export default Technos;
