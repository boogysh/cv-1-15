import React, { useState, useEffect } from "react";
import shareIcon from "../../../assets/share.png";
import axios from "axios";
import ShareList from "./ShareList";
import LikeBtn from "./LikeBtn";
import useSaveMyIPs from "../../../hooks/useSaveMyIPs";
import CommentsBtn from "./CommentsBtn";
import RateBtn from "./RateBtn";

export default function LikeCommentRateShareBtns(props) {
  const [showComments, setShowComments] = useState(false);
  const [statePage, setStatePage] = useState(0);
  // const [statePageRating, setStatePageRating] = useState(0);

  const [showShareMenu, setShowShareMenu] = useState(false);
  // const [showRateConfirmModal, setShowRateConfirmModal] = useState(false);
  const [ip, setIp] = useState("");

  //--------------------------AXIOS---------------------------------------
  async function getIp() {
    const res = await axios.get("https://geolocation-db.com/json/");
    res && setIp(res.data.IPv4);
  }
  useEffect(() => {
    getIp();
  }, []);

  //----------------SAVE MY-IP'S TO LOCAL STORAGE-------------------------
  const myIpList = useSaveMyIPs(ip);

  //------

  // useEffect(() => {
  //   if (showRateConfirmModal) {
  //     const timer = setTimeout(() => {
  //       setShowRateConfirmModal(false);
  //     }, 2500); // ⏱️ 3 secondes

  //     return () => clearTimeout(timer); // nettoyage si l’état change avant
  //   }
  // }, [showRateConfirmModal]);
  //------------------------------------

  //------------------------------------
  return (
    <div className="w-full h-auto flex flex-col bg-[#f1f1f1] justify-between items-center p-[9px] ">
      <div className="w-full h-auto flex  items-center">
        {/* LIKES*/}
        <LikeBtn ip={ip} id={props.id} myIpList={myIpList} />
        {/* -----COMMENTS------ */}
        <CommentsBtn
          id={props.id}
          ip={ip}
          title={props.title}
          showComments={showComments}
          setShowComments={setShowComments}
          statePage={statePage}
          setStatePage={setStatePage}
          myIpList={myIpList}
        />

        {/* --------------- */}
        {/* RATING  */}
        <RateBtn
          ip={ip}
          id={props.id}
          myIpList={myIpList}
          statePage={statePage}
          setStatePage={setStatePage}
        />

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
