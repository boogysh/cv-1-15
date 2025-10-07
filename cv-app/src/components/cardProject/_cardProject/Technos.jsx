import React from "react";
import { v4 as uuidv4 } from "uuid";

import { FaAws, FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { TbApi, TbBrandJavascript } from "react-icons/tb";
import {
  SiMongodb,
  SiRedux,
  SiTailwindcss,
  SiThemoviedatabase,
} from "react-icons/si";
import { IoLogoSass } from "react-icons/io";
import { ImYoutube2 } from "react-icons/im";

const iconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  sass: IoLogoSass,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  js: TbBrandJavascript,
  react: FaReact,
  node: FaNodeJs,
  mongoDB: SiMongodb,
  aws: FaAws,
};

const Technos = ({ technos = [] }) => {
  return (
    <div className="ml-[8px] flex flex-wrap  items-center">
      {technos.map((tech) => {
        // ✅ Handle special combined icons
        if (tech === "themoviedb") {
          return (
            <div key={uuidv4()} className="flex flex-col items-center relative">
              <TbApi className="icon-technos mb-0" />
              <SiThemoviedatabase className="icon-technos relative bottom-2 mb-0" />
            </div>
          );
        }

        if (tech === "youtube") {
          return (
            <div key={uuidv4()} className="flex flex-col items-center relative">
              <TbApi className="icon-technos mb-0" />
              <ImYoutube2 className="icon-technos relative bottom-[10px] s:bottom-[14px] mb-0" />
            </div>
          );
        }

        // ✅ Normal icons
        const Icon = iconMap[tech];
        return Icon ? (
          <Icon
            key={uuidv4()}
            className="icon-technos w-5 h-5 s:w-6 s:h-6 lg:h-7 lg:w-7"
          />
        ) : null;
      })}
    </div>
  );
};

export default Technos;

// import React from "react";

// import { v4 as uuidv4 } from "uuid";
// import { FaAws, FaCss3Alt, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
// import { TbApi, TbBrandJavascript } from "react-icons/tb";
// import {
//   SiMongodb,
//   SiRedux,
//   SiTailwindcss,
//   SiThemoviedatabase,
// } from "react-icons/si";
// import { IoLogoSass } from "react-icons/io";
// import { ImYoutube2 } from "react-icons/im";

// const Technos = ({ technos }) => {
//   return (
//     <div>
//       {technos?.map(
//         (el) =>
//           (el === "html" && (
//             <FaHtml5 key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "css" && (
//             <FaCss3Alt key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "sass" && (
//             <IoLogoSass key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "tailwind" && (
//             <SiTailwindcss key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "redux" && (
//             <SiRedux
//               key={uuidv4()}
//               className="icon-technos w-5 h-5 s:w-6 s:h-6"
//             />
//           )) ||
//           (el === "js" && (
//             <TbBrandJavascript key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "react" && (
//             <FaReact key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "node" && (
//             <FaNodeJs key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "mongoDB" && (
//             <SiMongodb key={uuidv4()} className="icon-technos" />
//           )) ||
//           (el === "aws" && <FaAws key={uuidv4()} className="icon-technos" />) ||
//           (el === "themoviedb" && (
//             <div>
//               <TbApi key={uuidv4()} className="icon-technos mb-0" />
//               <SiThemoviedatabase
//                 key={uuidv4()}
//                 className="icon-technos relative bottom-2 mb-0"
//               />
//             </div>
//           )) ||
//           (el === "youtube" && (
//             <div>
//               <TbApi key={uuidv4()} className="icon-technos mb-0" />
//               <ImYoutube2
//                 key={uuidv4()}
//                 className="icon-technos relative bottom-[10px] s:bottom-[14px] mb-0"
//               />
//             </div>
//           ))
//       )}
//     </div>
//   );
// };

// export default Technos;
