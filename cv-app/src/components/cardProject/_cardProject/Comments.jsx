import React from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../loader/Loader";

const Comments = ({ comments, isLoading }) => {
  return (
    <div className="mt-[0.5rem] ">
      {comments.map((comment) => {
        return isLoading ? (
          <Loader key={uuidv4()} />
        ) : (
          <div
            key={uuidv4()}
            className="p-1 sm:p-[10px] mt-[15px]  bg-[#f1f1f1] rounded-[10px]"
          >
            <div className="flex items-center">
              <h3 className="p-2 font-semibold text-sm sm:text-base ">
                {comment.lastName} {comment.firstName}{" "}
              </h3>
              <span className="text-sm sm:text-base">
                <strong>le:</strong> {comment.createdAt.slice(0, 10)}{" "}
                <strong> à: </strong> {comment.createdAt.slice(11, 19)}
              </span>
            </div>
            <p className="pl-[10px]">{comment.commentTxt}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
