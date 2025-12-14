import { useMemo, useState, memo } from "react";

import Slider from "../Slider";
import MoreInfo from "./_cardProject/MoreInfo";
import { useSelector } from "react-redux";
import LikeCommentRateShareBtns from "./_cardProject/LikeCommentRateShareBtns";
import { FaArrowDown, FaArrowUp, FaStar } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import Technos from "./_cardProject/Technos";
import { Link } from "react-router-dom";

// 🔹 Composant CardProject avec memo
const CardProject = ({
  images,
  title,
  info,
  id,
  urlProject,
  urlExistent,
  technos,
}) => {
  // console.count(`cardProject`);

  const [uri, setUri] = useState();

  const [moreInfo, setMoreInfo] = useState(false);
  const { t } = useSelector((state) => state.langReducer);
  const hrefDev = window.location.href.includes(t.devNav);

  //------------------------
  // ✅ Valeurs spécifiques à cette carte
  const ratingAverage = useSelector(
    (state) => state.projectReducer.ratings[id] || 0
  );
  // ✅ Valeurs globales partagées (utilisées par plusieurs cartes)
  const { ip } = useSelector((state) => state.projectReducer);
  //------------------------

  useMemo(() => {
    const hrefArch = window.location.href.includes(t.archNav);
    const hrefBat = window.location.href.includes(t.batNav);
    const hrefServ = window.location.href.includes(t.servicesNav);
    const hrefDev = window.location.href.includes(t.devNav);
    hrefArch && setUri(t.archNav);
    hrefBat && setUri(t.batNav);
    hrefServ && setUri(t.servicesNav);
    hrefDev && setUri(t.devNav);
  }, [t.archNav, t.batNav, t.servicesNav, t.devNav]);

  const truncateString = (str, num) =>
    str?.length > num ? str.slice(0, num) + "..." : str;

  return (
    <div className="relative w-[98vw] max-w-[600px] xs:w-[95vw]  h-auto rounded-[10px] mx-0 sm:mx-[20px]  mb-[20px] xs:mb-[30px]  s:mb-[40px] overflow-hidden shadow transition-all duration-300 ease-in-out">
      <div className="w-full h-auto flex" id={id}>
        <div className="w-full h-auto flex flex-col">
          {/* TITLE */}
          <div className="flex items-center w-full h-auto p-2 bg-[#f1f1f1] z-10 ">
            <h2 className="flex w-full lg:min-h-[3rem] items-center pl-1 text-[20px] leading-4 s:text-2xl s:leading-6 font-dancing font-semibold hover:text-blue-600 ">
              {(uri === t.archNav ||
                uri === t.batNav ||
                uri === t.servicesNav) && (
                <Link className="text-center" to={`/${t.locale}/${uri}/${id}`}>
                  <GiClick className="inline-block mr-5 w-5 h-5" />
                  {truncateString(title, 72)}
                </Link>
              )}
              {uri !== t.archNav &&
                uri !== t.batNav &&
                uri !== t.servicesNav && (
                  <a className="text-center" href={urlProject} target="blank">
                    <GiClick className="inline-block mr-5 w-5 h-5" />
                    {truncateString(title, 72)}
                  </a>
                )}
            </h2>
            <button
              onClick={() => setMoreInfo(!moreInfo)}
              className="btn-icon px-[6px] border-orange-300"
            >
              {!moreInfo ? (
                <FaArrowDown className="w-5 services_title_color-3 h-5 s:w-6 s:h-6" />
              ) : (
                <FaArrowUp className="w-5 services_title_color-3 h-5 s:w-6 s:h-6" />
              )}
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex relative w-full h-auto border-[1px] border-y-black">
            <div className="flex w-full h-ratio bg-[#ebdede] overflow-hidden relative">
              <div className="flex items-center pl-[6px] pr-2 py-[2px] rounded-[20px] absolute z-10 top-[10px] right-[10px] bg-[#f7f7f7]">
                <FaStar className="w-5 h-5 text-yellow-400 " />
                <span className="pl-1 pt-[1px] text-[14px] text-gray-700 tracking-[-1px]">
                  {ratingAverage}
                </span>
              </div>
              <Slider slides={images} />
            </div>

            {hrefDev && (
              <div className="w-7 xs:w-8 s:w-10 h-auto flex flex-col justify-center items-center py-3 pr-[6px] bg-[#ebdede] z-10">
                <Technos technos={technos} />
              </div>
            )}

            <MoreInfo
              title={title}
              info={info}
              id={id}
              urlProject={urlProject}
              urlExistent={urlExistent}
              moreInfo={moreInfo}
            />
          </div>

          {/* FOOTER */}
          <LikeCommentRateShareBtns id={id} ip={ip} />
        </div>
      </div>
    </div>
  );
};

// 🔹 Memoisé avec comparaison personnalisée
export default memo(CardProject, (prevProps, nextProps) => {
  return (
    prevProps.rating === nextProps.rating &&
    prevProps.count === nextProps.count &&
    prevProps.id === nextProps.id
  );
});

// import React, { useMemo, useState } from "react";
// import Slider from "../Slider";
// import MoreInfo from "./_cardProject/MoreInfo";
// import { useSelector } from "react-redux";
// import LikeCommentRateShareBtns from "./_cardProject/LikeCommentRateShareBtns";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";
// import { GiClick } from "react-icons/gi";
// // import AllComments from "./_cardProject/AllComments";
// import Technos from "./_cardProject/Technos";
// import { Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import { memo } from "react";

// // import LoaderSlider from "../loader/LoaderSlider";

// // Attention export en bas avec memo !!!
// function CardProjectNew({
//   images,
//   title,
//   info,
//   id,
//   urlProject,
//   urlExistent,
//   technos,
// }) {
//   const [uri, setUri] = useState();
//   const [moreInfo, setMoreInfo] = useState(false);
//   const { t } = useSelector((state) => state.langReducer);
//   const hrefDev = window.location.href.includes(t.devNav);

//   // const { ratingAverages } = useSelector((state) => state.ratingReducer);
//   // const ratingAverage = ratingAverages[id] || 0;
//   const { ratings } = useSelector((state) => state.ratingReducer || {});

//   console.log("cardPROJECT++++++++++");

//   // Récupère la moyenne du projet courant
//   const ratingAverage = ratings[id] || 0;
//   // console.log("ratingAverage------------------", ratingAverage);
//   useMemo(() => {
//     const hrefArch = window.location.href.includes(t.archNav);
//     const hrefBat = window.location.href.includes(t.batNav);
//     const hrefServ = window.location.href.includes(t.servicesNav);
//     const hrefDev = window.location.href.includes(t.devNav);
//     hrefArch && setUri(t.archNav);
//     hrefBat && setUri(t.batNav);
//     hrefServ && setUri(t.servicesNav);
//     hrefDev && setUri(t.devNav);
//   }, [t.archNav, t.batNav, t.servicesNav, t.devNav]);
//   //----
//   const truncateString = (str, num) => {
//     if (str?.length > num) {
//       return str.slice(0, num) + "...";
//     } else {
//       return str;
//     }
//   };

//   //------------------
//   return (
//     <div className="relative w-[98vw] max-w-[600px] xs:w-[95vw]  h-auto rounded-[10px] mx-0 sm:mx-[20px]  mb-[20px] xs:mb-[30px]  s:mb-[40px] overflow-hidden shadow">
//       <div className="w-full h-auto flex" id={id}>
//         <div className="w-full h-auto flex flex-col">
//           {/* TITLE */}
//           <div className="flex items-center w-full h-auto p-2  bg-[#f1f1f1] z-10 ">
//             <h2 className="flex w-full lg:min-h-[3rem] items-center pl-1 text-[20px]  leading-4 s:text-2xl s:leading-6 font-dancing font-semibold hover:text-blue-600 ">
//               {/* LINK TO ONE-PROJECT-ID  --- only architecture & building*/}
//               {(uri === t.archNav ||
//                 uri === t.batNav ||
//                 uri === t.servicesNav) && (
//                 <Link className="text-center" to={`/${t.locale}/${uri}/${id}`}>
//                   <GiClick className="inline-block mr-5 w-5 h-5" />
//                   {truncateString(title, 72)}
//                 </Link>
//               )}
//               {/* LINK TO PROJECT URL --- only development */}
//               {uri !== t.archNav &&
//                 uri !== t.batNav &&
//                 uri !== t.servicesNav && (
//                   <a className="text-center" href={urlProject} target="blank">
//                     <GiClick className="inline-block mr-5 w-5 h-5" />
//                     {truncateString(title, 72)}
//                   </a>
//                 )}
//             </h2>
//             <button
//               onClick={() => setMoreInfo(!moreInfo)}
//               className="btn-icon px-[6px]  border-orange-300"
//               // className="btn-icon px-[6px] border-[0.75px]  border_services_title_color-2"
//             >
//               {!moreInfo && (
//                 <FaArrowDown className="w-5 services_title_color-3 h-5 s:w-6 s:h-6" />
//               )}
//               {moreInfo && (
//                 <FaArrowUp className="w-5 services_title_color-3 h-5 s:w-6 s:h-6" />
//               )}
//             </button>
//           </div>
//           <div className="flex relative w-full h-auto border-[1px] border-y-black">
//             <div className="flex w-full h-ratio bg-[#ebdede]  overflow-hidden relative">
//               <div className="flex items-center pl-[6px] pr-2 py-[2px] rounded-[20px] absolute z-10 top-[10px] right-[10px] bg-[#f7f7f7]">
//                 {/* #fff7f7 */}
//                 <FaStar className="w-5 h-5 text-yellow-400 " />
//                 <span className="pl-1 pt-[1px] text-[14px]  text-gray-700  tracking-[-1px]">
//                   {ratingAverage}
//                 </span>
//               </div>
//               <Slider slides={images} />
//             </div>
//             {/* TECHNOS */}
//             {hrefDev && (
//               <div className="w-7 xs:w-8 s:w-10 h-auto flex flex-col justify-center items-center py-3 pr-[6px] bg-[#ebdede] z-10">
//                 <Technos technos={technos} />
//               </div>
//             )}
//             {/* INFO */}
//             <MoreInfo
//               title={title}
//               info={info}
//               id={id}
//               urlProject={urlProject}
//               urlExistent={urlExistent}
//               moreInfo={moreInfo}
//             />
//           </div>
//           {/* FOOTER --- LIKES & COMMENTS */}
//           <LikeCommentRateShareBtns id={id} />
//         </div>
//       </div>
//     </div>
//   );
// }
// // export default CardProjectNew;
// export default memo(CardProjectNew, (prevProps, nextProps) => {
//   return (
//     prevProps.rating === nextProps.rating &&
//     prevProps.count === nextProps.count &&
//     prevProps.id === nextProps.id
//   );
// });
