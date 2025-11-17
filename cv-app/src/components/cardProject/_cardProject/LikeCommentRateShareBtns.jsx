import React, { useState } from "react";
import shareIcon from "../../../assets/share.png";
import ShareList from "./ShareList";
import LikeBtn from "./LikeBtn";
import CommentsBtn from "./CommentsBtn";
import RateBtn from "./RateBtn";

export default function LikeCommentRateShareBtns(props) {
  const [showComments, setShowComments] = useState(false);
  // const [statePageRating, setStatePageRating] = useState(0);

  const [showShareMenu, setShowShareMenu] = useState(false);

  //------------------------------------
  return (
    <div className="w-full h-auto flex flex-col bg-[#f1f1f1] justify-between items-center p-[9px] ">
      <div className="w-full h-auto flex  items-center">
        
        {/* LIKES*/}
        <LikeBtn ip={props.ip} id={props.id} />
        {/* -----COMMENTS------ */}
        <CommentsBtn
          id={props.id}
          ip={props.ip}
          showComments={showComments}
          setShowComments={setShowComments}
        />

        {/* --------------- */}
        {/* RATING  */}
        <RateBtn id={props.id} />

        {/* ---SHARE MENU------- */}
        <div
          className={`flex border-[1px] border-gray-300  h-auto rounded-full ml-auto relative`}
        >
          {showShareMenu && (
            <>
              <ShareList
                url={`${window.location.href}#${props.id}`}
                description={props.title}
                isOpen={showShareMenu} // ← contrôle depuis ton état
              />
            </>
          )}

          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="btn-icon ml-auto relative z-20" // z-index plus haut que les étoiles
          >
            <img
              src={shareIcon}
              className="w-3 h-3 xxs:w-4 xxs:h-4"
              alt="share icon"
            />
          </button>
        </div>
        {/* --------------- */}
        {/* -----RATE MODAL------ */}
        {/* {showRateModal && (
          <Modal
            setShowModal={setShowRateModal}
            title={"Évaluez ce projet !"}
            content={<StarRating totalStars={5} initialRating={0} />}
            btnTitle={"Évaluez"}
            btnFunc={handleRateModal}
          />
        )} */}
        {/* ------CONFIRM RATE MODAL---- */}

        {/* {showRateConfirmModal && (
          <Modal
            setShowModal={setShowRateConfirmModal}
            title={"Merci pour votre évaluation !"}
            btnTitle={"Laissez un commentaire"}
            btnFunc={() => handleConfirmModal()}
          />
        )} */}
      </div>
    </div>
  );
}
