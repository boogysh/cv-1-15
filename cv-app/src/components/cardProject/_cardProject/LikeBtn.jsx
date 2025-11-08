import { useState, useEffect } from "react";
import { useFetchFilteredLikes } from "../../../hooks/useFetch_filtered_likes";
import Loader2 from "../../loader/Loader2";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
import StarSparkle from "./StarSparkle";

const LikeBtn = ({ ip, id, myIpList }) => {
  const [animate, setAnimate] = useState(false);
  const [liked, setLiked] = useState(false);
  const [statePage, setStatePage] = useState(0);

  //-----------USE FETCH-------------------
  const { isLoading, ipList } = useFetchFilteredLikes(
    `${process.env.REACT_APP_URL}/api/likes`,
    id,
    statePage //refresh after liking or unliked !!!!!!!!!!!
  );
  // console.log("liked", liked);
  // console.log("process.env.URL", process.env.REACT_APP_URL);
  //------------------------------------

  //--------MANAGE LIKE ON LOAD PAGE------------------
  useEffect(() => {
    const FindIdenticalIp = ipList.filter((value) => myIpList.includes(value));
    const ipListIncludesIp = ipList.includes(ip);
    ipListIncludesIp && setLiked(true);
    FindIdenticalIp.length > 0 && setLiked(true);
    // console.log("isFindIdenticalIp ", FindIdenticalIp);
    // console.log("ipListIncludesIp ", ipListIncludesIp);
  }, [ip, ipList, myIpList]);
  //------------------------------------
  const likePost = () => {
    if (ip && id && myIpList) {
      const fetchLikePost = fetch(
        //`process.env.API_LIKES`,
        // "https://cv-back-git-main-boogysh.vercel.app/api/likes",
        "https://cv-back-25.vercel.app/api/likes",
        // `${process.env.REACT_APP_URL}/api/likes`,
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
        setStatePage((statePage) => statePage + 1); //add delay !!!!!!!!!
      };
      cleanAndRefresh();
    } else return;
  };

  // //-------LIKE-POST-CONTENT------------------------
  const likeToPost = {
    project: `${id}`,
    ip: ip,
    allMyIPs: myIpList,
  };

  const handleClick = () => {
    likePost(); // ton appel existant
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1500); // durée de l'animation
  };

  return (
    <div className="flex items-center relative">
      <button onClick={handleClick} className="btn-icon ml-0 relative">
        {isLoading ? (
          <Loader2 />
        ) : (
          <img
            src={liked ? like2 : like}
            className="w-5 h-5 s:w-[22px] s:h-[22px] pop-like transition-transform duration-150"
            alt="like"
          />
        )}

        {/* 🌟 éclats dorés avec dispersion aléatoire */}
        {animate && <StarSparkle  color={"sparkle-like"} />}
      </button>
      <span className="pl-1 text-sm s:text-base">{ipList.length}</span>
    </div>
  );
};

//   return (
//     <div className="flex items-center">
//       <button onClick={likePost} className="btn-icon ml-0">
//         {isLoading ? (
//           <Loader2 />
//         ) : (
//           <>
//             <img
//               src={liked ? like2 : like}
//               className="w-5 h-5 s:w-[22px] s:h-[22px]"
//               alt="like"
//             />
//           </>
//         )}
//       </button>
//       <span className="pl-1 text-sm s:text-base">{ipList.length}</span>
//     </div>
//   );
// };

export default LikeBtn;
