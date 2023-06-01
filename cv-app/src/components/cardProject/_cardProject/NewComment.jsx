import React from "react";
// import sendComment from "../../../assets/send-comment2.png";
import useFormComment from "../../../hooks/useForm/useFormComment";
import { AiOutlineSend } from "react-icons/ai";

export default function NewComment({ id, statePage, setStatePage }) {
  //--------MATCH FIRST-NAME, MATCH-LAST-NAME, MATCH-COMMENT---------------
  const {
    borderRedFunc,
    resetValues,
    val,
    borderRed,
    matchFN,
    matchLN,
    matchComment,
  } = useFormComment();
  //-------COMMENT-POST-CONTENT------------
  const commentToPost = {
    firstName: `${val.firstName}`,
    lastName: `${val.lastName}`,
    commentTxt: `${val.comment}`,
    project: `${id}`,
  };
  //----------COMMENT-POST-FUNCTION---------------
  const commentPost = (e) => {
    e.preventDefault();
    if (val.comment && val.firstName && val.lastName && id) {
      // const fetchCommentPost = fetch("process.env.API_COMMENTS", { //? REACT_APP
      const fetchCommentPost = fetch(
        // "https://cv-back-git-main-boogysh.vercel.app/api/comments",
        `${process.env.REACT_APP_URL}/api/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentToPost),
        }
      );
      //----CLEAR INPUTS AND REFRESH COMMENTS--------
      const cleanAndRefresh = async () => {
        await fetchCommentPost;
        resetValues();
        setStatePage(statePage + 1);
      };
      cleanAndRefresh();
    } else {
      borderRedFunc();
    }
  };

  return (
    <div
      id="comment_form"
      className="p-3 s:p-5 w-full h-auto flex justify-center items-center rounded-[10px] z-999 bg-white"
    >
      <div className="w-[23%] h-auto flex flex-col mr-2 ">
        {/* -----LN-------- */}
        <input
          id="comment_LN"
          onChange={matchLN}
          className={`w-full h-full p-[5px]  border-none rounded-[5px] text-black  text-sm sm:text-base bg-[#f1f1f1] mb-[10px] ${
            borderRed.lastName && "border-red"
          }`}
          type="text"
          placeholder="Nom..."
        />
        {/* ------FN--------*/}
        <input
          id="comment_FN"
          onChange={matchFN}
          className={`w-full h-full p-[5px]  border-none rounded-[5px] text-black  text-sm sm:text-base bg-[#f1f1f1]  ${
            borderRed.firstName && "border-red"
          }`}
          type="text"
          placeholder="Prénom..."
        />
      </div>
      <div className="w-[75%] h-auto flex items-center border-[1px] border-solid border-black rounded-[5px] bg-[#f1f1f1]">
        <textarea
          id="comment_textarea"
          onChange={matchComment}
          className={`w-full h-full p-[10px] text-sm sm:text-base resize-none flex items-center  rounded-[5px] bg-[#f1f1f1] ${
            borderRed.comment && "border-red"
          }`}
          type="text"
          placeholder="Laissez un commentaire..."
        />
        <button
          type="submit"
          className="btn-icon mr-2 w-7 h-7  s:w-9 s:h-9 px-1 ml-2"
          onClick={commentPost}
        >
          <AiOutlineSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
