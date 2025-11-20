// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import commentIcon from "../../../assets/comment1.png";
// import { UseFetch_filtered_comments } from "../../../hooks/useFetch_filtered_comments";
import CommentsModal from "./CommentsModal";

const CommentsBtn = ({ id, ip, showComments, setShowComments }) => {
  const { comments } = useSelector((state) => state.projectReducer || {});

  // console.log('commentsList',comments[id] )

  return (
    <div className="flex items-center">
      <button
        onClick={() => setShowComments(!showComments)}
        className="btn-icon hover:border-transparent hover:bg-transparent hover:scale-125 transition-all ease-in-out"
      >
        <img
          src={commentIcon}
          className="w-5 h-6 s:w-[22px] s:h-[26px]"
          alt="comments"
        />
      </button>
      <span className="pl-1 text-sm s:text-base">
        {comments[id]?.length || 0}
      </span>

      {showComments && (
        <CommentsModal setShowComments={setShowComments} id={id} ip={ip} />
      )}
    </div>
  );
};

export default CommentsBtn;

// import React, { useState } from "react";
// import comment from "../../../assets/comment1.png";
// import { UseFetch_filtered_comments } from "../../../hooks/useFetch_filtered_comments";
// import CommentsModal from "./CommentsModal";

// const CommentsBtn = ({
//   id,
//   ip,
//   title,
//   showComments,
//   setShowComments,
//   statePage,          // 🟢 vient du parent (global)
//   setStatePage,       // 🟢 vient du parent (global)
//   myIpList
// }) => {
//   // 🟢 Local seulement pour recharger la liste de commentaires après ajout/suppression
//   const [statePageComments, setStatePageComments] = useState(0);

//   // 🧭 Fetch uniquement les commentaires du projet
//   const { isLoadingComments, commentsList } = UseFetch_filtered_comments(
//     `${process.env.REACT_APP_URL}/api/comments`,
//     id,
//     statePageComments   // 🟢 ce state local ne concerne que les comments
//   );

//   return (
//     <div className="flex items-center">
//       {/* COMMENTS BUTTON */}
//       <button
//         onClick={() => setShowComments(!showComments)}
//         className="btn-icon"
//       >
//         <img
//           src={comment}
//           className="w-5 h-6 s:w-[22px] s:h-[26px]"
//           alt="comments"
//         />
//       </button>

//       {/* COUNT */}
//       <span className="pl-1 text-sm s:text-base">{commentsList.length}</span>

//       {/* MODAL COMMENTS */}
//       {showComments && (
//         <CommentsModal
//           setShowComments={setShowComments}
//           comments={commentsList}
//           isLoading={isLoadingComments}
//           // 🟢 pour rating et synchro globale
//           statePage={statePage}
//           setStatePage={setStatePage}
//           // 🟢 pour rafraîchir uniquement les commentaires
//           localStatePage={statePageComments}
//           setLocalStatePage={setStatePageComments}
//           title={title}
//           id={id}
//           ip={ip}
//           myIpList={myIpList}
//         />
//       )}
//     </div>
//   );
// };

// export default CommentsBtn;
