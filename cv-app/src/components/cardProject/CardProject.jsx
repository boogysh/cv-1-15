import React, { useMemo, useState } from "react";
import Slider from "../Slider";
import { UseFetch_filtered } from "../../hooks/useFetch_filtered";
import MoreInfo from "./_cardProject/MoreInfo";
import { useSelector } from "react-redux";
import LikeAndCommentCard from "./_cardProject/LikeAndCommentCard";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import AllComments from "./_cardProject/AllComments";
import Technos from "./_cardProject/Technos";
import { Link } from "react-router-dom";

function CardProjectNew({
  images,
  title,
  info,
  id,
  urlProject,
  urlExistent,
  technos,
}) {
  const [uri, setUri] = useState();
  const [showComments, setShowComments] = useState(false);
  const [statePage, setStatePage] = useState(0);
  const [moreInfo, setMoreInfo] = useState(false);

  const { t } = useSelector((state) => state.langReducer);

  useMemo(() => {
    const hrefArch = window.location.href.includes(t.archNav);
    const hrefBat = window.location.href.includes(t.batNav);
    const hrefDev = window.location.href.includes(t.devNav);
    hrefArch && setUri(t.archNav);
    hrefBat && setUri(t.batNav);
    hrefDev && setUri(t.devNav);
  }, [t.archNav, t.batNav, t.devNav]);
  //----
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  //---------------------FETCH---------------------------------
  const { filteredData, isLoading } = UseFetch_filtered(
    // `https://cv-back-git-main-boogysh.vercel.app/api/comments`,
    `${process.env.REACT_APP_URL}/api/comments`,
    id,
    statePage
  );

  //------------------
  return (
    <div className="relative w-[98vw] max-w-[600px] xs:w-[95vw]  h-auto rounded-[10px] mx-0 sm:mx-[20px]  mb-[20px] xs:mb-[30px]  s:mb-[40px] overflow-hidden shadow">
      <div className="w-full h-auto flex" id={id}>
        <div className="w-full h-auto flex flex-col">
          {/* TITLE */}
          <div className="flex items-center w-full h-auto p-2  bg-[#f1f1f1] z-10 ">
            <h2 className="flex w-full lg:min-h-[3rem] items-center pl-1 text-lg  leading-4 s:text-2xl s:leading-6 font-dancing font-semibold hover:text-blue-600 ">
              {/* LINK TO ONE-PROJECT-ID  --- only architecture & building*/}
              {(uri === t.archNav || uri === t.batNav) && (
                <Link className="text-center" to={`/${t.locale}/${uri}/${id}`}>
                  <GiClick className="inline-block mr-5 w-5 h-5" />
                  {truncateString(title, 72)}
                </Link>
              )}
              {/* LINK TO PROJECT URL --- only development */}
              {(uri !== t.ArchNav || t.batNav) && (
                <a className="text-center" href={urlProject} target="blank">
                  <GiClick className="inline-block mr-5 w-5 h-5" />
                  {truncateString(title, 72)}
                </a>
              )}
            </h2>
            <button
              onClick={() => setMoreInfo(!moreInfo)}
              className="btn-icon px-[6px] border-gray-300"
            >
              {!moreInfo && <FaArrowDown className="w-5  h-5 s:w-6 s:h-6" />}
              {moreInfo && <FaArrowUp className="w-5  h-5 s:w-6 s:h-6" />}
            </button>
          </div>
          <div className="flex relative w-full h-auto border-[1px] border-y-black">
            {/* SLIDER && INFO */}
            <div className="flex  w-full h-ratio overflow-hidden">
              <Slider slides={images} />
            </div>
            {/* TECHNOS */}
            <div className="w-7 xs:w-8 s:w-10 h-auto flex flex-col justify-center items-center py-3 pr-[6px] bg-[#ebdede] z-10">
              <Technos technos={technos} />
            </div>
            {/* INFO */}
            <MoreInfo
              title={title}
              info={info}
              id={id}
              urlProject={urlProject}
              urlExistent={urlExistent}
              moreInfo={moreInfo}
            />
          </div>
          {/* FOOTER --- LIKES & COMMENTS */}
          <LikeAndCommentCard
            id={id}
            showComments={showComments}
            setShowComments={setShowComments}
            commentsQty={filteredData.length}
          />
        </div>
      </div>
      {/*------------------- COMMENTS ----------------------------*/}
      <div className="flex flex-col ">
        {showComments && (
          <AllComments
            setShowComments={setShowComments}
            comments={filteredData}
            isLoading={isLoading}
            statePage={statePage}
            setStatePage={setStatePage}
            title={title}
            id={id}
          />
        )}
      </div>
    </div>
  );
}
export default CardProjectNew;
