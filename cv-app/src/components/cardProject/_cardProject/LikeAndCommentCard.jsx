// import React, {useState} from "react";
import React, { useState, useEffect } from "react";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
import comment from "../../../assets/comment1.png";
import shareIcon from "../../../assets/share.png";
import { UseFetch_filtered_likes } from "../../../hooks/useFetch_filtered_likes";
import Loader2 from "../../loader/Loader2";
import axios from "axios";
import ShareList from "./ShareList";

export default function LikeAndCommentCardNew(props) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [ip, setIp] = useState("");

  const [liked, setLiked] = useState(false); //true or false
  const [myIpList, setMyIpList] = useState([]);

  const [statePage, setStatePage] = useState(0);
  //-----------USE FETCH-------------------
  const { isLoading, ipList } = UseFetch_filtered_likes(
    `${process.env.REACT_APP_URL}/api/likes`,
    props.id,
    statePage //refresh after liking or unliked !!!!!!!!!!!
  );
  // console.log("liked", liked);
  console.log("process.env.URL", process.env.REACT_APP_URL);
  //--------------------------AXIOS---------------------------------------
  async function getIp() {
    const res = await axios.get("https://geolocation-db.com/json/");
    res && setIp(res.data.IPv4);
  }
  useEffect(() => {
    getIp();
  }, []);

  //----------------SAVE MY-IP'S TO LOCAL STORAGE-------------------------

  useEffect(() => {
    const myIPs = [];
    const dynamic_IP = ip;
    const get_IPs = JSON.parse(localStorage.getItem("myIPs"));
    if (!get_IPs) {
      return localStorage.setItem("myIPs", JSON.stringify(myIPs));
    } else if (!get_IPs.includes(dynamic_IP)) {
      myIPs.push(get_IPs);
      dynamic_IP !== "" && myIPs.push(dynamic_IP);
      return (
        myIPs && localStorage.setItem("myIPs", JSON.stringify(myIPs.flat()))
      );
    }
    setMyIpList(JSON.parse(localStorage.getItem("myIPs")));
  }, [ip]);
  //--------MANAGE LIKE ON LOAD PAGE------------------

  useEffect(() => {
    const FindIdenticalIp = ipList.filter((value) => myIpList.includes(value));
    const ipListIncludesIp = ipList.includes(ip);
    ipListIncludesIp && setLiked(true);
    FindIdenticalIp.length > 0 && setLiked(true);
    // console.log("isFindIdenticalIp ", FindIdenticalIp);
    // console.log("ipListIncludesIp ", ipListIncludesIp);
  }, [ip, ipList, myIpList]);

  // //-------LIKE-POST-CONTENT------------------------
  const likeToPost = {
    project: `${props.id}`,
    ip: ip,
    allMyIPs: myIpList,
  };
  //------------------------------------
  const likePost = () => {
    if (ip && props.id && myIpList) {
      const fetchLikePost = fetch(
        //`process.env.API_LIKES`,
        "https://cv-back-git-main-boogysh.vercel.app/api/likes",
        // "http://localhost:4000/api/likes/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(likeToPost),
        }
      );
      const cleanAndRefresh = async () => {
        await fetchLikePost;
        setLiked(!liked);
        // setStatePage(statePage + 1);
        setStatePage((statePage) => statePage + 1);
      };
      cleanAndRefresh();
    } else return;
  };
  //------------------------------------
  return (
    <div className="w-full h-auto flex flex-col bg-[#f1f1f1] justify-between items-center p-[9px] ">
      {/* LIKES*/}
      <div className="w-full h-auto flex  items-center">
        <button onClick={likePost} className="btn-icon ml-0">
          {isLoading ? (
            <Loader2 />
          ) : (
            <>
              <img
                src={liked ? like2 : like}
                className="w-4 s:w-5 h-4 s:h-5"
                alt="like"
              />
            </>
          )}
        </button>
        <span className="pl-1 text-sm s:text-base">{ipList.length}</span>
        {/* COMMENTS */}
        <button
          onClick={() => props.setShowComments(!props.showComments)}
          className="btn-icon"
        >
          <img src={comment} className="w-4 h-5 s:w-5 s:h-6" alt="like" />
        </button>
        <span className="pl-1 text-sm s:text-base">{props.commentsQty}</span>
        {/* --------------- */}
        {/* ---SHARE MENU------- */}
        <div
          className={`flex border-[1px] border-gray-300  h-auto rounded-full ml-auto`}
        >
          {showShareMenu && (
            <>
              <ShareList url={`${window.location.href}#${props.id}`} />
            </>
          )}

          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="btn-icon ml-auto "
          >
            <img
              src={shareIcon}
              className="w-3 h-3 xxs:w-4 xxs:h-4"
              alt="share icon"
            />
          </button>
        </div>
        {/* --------------- */}
      </div>
    </div>
  );
}
