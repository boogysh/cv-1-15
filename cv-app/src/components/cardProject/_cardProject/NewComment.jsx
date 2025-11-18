import React from "react";
import useFormComment from "../../../hooks/useForm/useFormComment";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setProjectData } from "../../../redux/projectActions";

export default function NewComment({ id }) {
  const dispatch = useDispatch();

  const { ratings, comments, ip, userRatingsByIp, ratingRedux } = useSelector(
    (state) => state.projectReducer || {}
  );

  const {
    borderRedFunc,
    resetValues,
    val,
    borderRed,
    matchFN,
    matchLN,
    matchComment,
  } = useFormComment();

  /**
   * 🔥 LA NOTE À ENVOYER
   * 1) si ratingRedux existe → priorité
   * 2) sinon si userRatingsByIp[id] existe → fallback
   * 3) sinon → 0
   */
  const ratingToSend =
    ratingRedux !== undefined
      ? ratingRedux
      : userRatingsByIp?.[id] !== undefined
      ? userRatingsByIp[id]
      : 0;

  const commentToPost = {
    firstName: val.firstName,
    lastName: val.lastName,
    commentTxt: val.comment,
    project: id,
    // rating: ratingRedux !== 0 ? ratingRedux : ratingToSend,
    rating: ratingRedux ,
    ip,
  };

  // console.log("🔥 NOTE À ENVOYER DANS COMMENT =", commentToPost.rating);
  // console.log("🔥ratingRedux =", ratingRedux);
  // console.log("🔥ratingToSend =", ratingToSend);

  const commentPost = async (e) => {
    e.preventDefault();

    if (!val.comment || !val.firstName || !val.lastName || !id || !ip) {
      borderRedFunc();
      return;
    }

    try {
      // const res = await fetch(`http://localhost:4000/api/projects/comment`, {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/projects/comment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentToPost),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du commentaire");

      const { project } = await res.json();

      // 🔹 reconstruit les commentaires du projet
      const updatedComments = { ...comments };
      updatedComments[id] = project.comments;

      // 🔹 mise à jour Redux
      dispatch(
        setProjectData({
          comments: updatedComments,
          ratings: { ...ratings, [id]: ratingToSend },
          userRatingsByIp: { ...userRatingsByIp, [id]: ratingToSend },
          ratingRedux: ratingToSend, // 🔥 garde la bonne note
        })
      );

      resetValues();
    } catch (err) {
      console.error("Erreur NewComment :", err);
    }
  };

  return (
    <div
      id="comment_form"
      className="p-3 s:p-5 w-full h-auto flex justify-center items-center rounded-[10px] z-999 bg-white"
    >
      <div className="w-[23%] h-auto flex flex-col mr-2">
        <input
          id="comment_LN"
          onChange={matchLN}
          className={`w-full h-full p-[5px] border-none rounded-[5px] text-black bg-[#f1f1f1] mb-[10px] ${
            borderRed.lastName ? "border-red" : ""
          }`}
          type="text"
          placeholder="Nom..."
        />
        <input
          id="comment_FN"
          onChange={matchFN}
          className={`w-full h-full p-[5px] border-none rounded-[5px] text-black bg-[#f1f1f1] ${
            borderRed.firstName ? "border-red" : ""
          }`}
          type="text"
          placeholder="Prénom..."
        />
      </div>

      <div className="w-[75%] h-auto flex items-center border border-black rounded-[5px] bg-[#f1f1f1]">
        <textarea
          id="comment_textarea"
          onChange={matchComment}
          className={`w-full h-full p-[10px] text-sm sm:text-base resize-none rounded-[5px] bg-[#f1f1f1] ${
            borderRed.comment ? "border-red" : ""
          }`}
          placeholder="Laissez un commentaire..."
        />

        <button
          type="submit"
          className="btn-icon mr-2 w-7 h-7 s:w-9 s:h-9 px-1 ml-2"
          onClick={commentPost}
        >
          <AiOutlineSend className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
