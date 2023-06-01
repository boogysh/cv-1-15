import React from "react";
import { MdClose } from "react-icons/md";
import NewComment from "./NewComment";
import Comments from "./Comments";

const AllComments = ({
  setShowComments,
  comments,
  title,
  id,
  statePage,
  setStatePage,
  isLoading,
}) => {
  return (
    <div
      className={`bg-gray-700/50 fixed z-20  bottom-0 left-0 top-0 right-0 w-full h-full  bg-cover flex justify-center items-center `}
    >
      <div
        className={` w-[95%] xxs:w-[90%] xs:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[36%]  h-auto  max-h-[450px] s:max-h-[600px] bg-white z-[9999] rounded-[20px] overflow-hidden`}
      >
        {/* HEADER */}
        <div
          className={` rounded-t-[20px] w-full h-auto flex items-center py-1 px-3 `}
        >
          <h2 className={` w-full text-[18px] xs:text-[22px] sm:text-[28px] font-medium py-3 text-center`}>
            {title}
          </h2>
          <button
            onClick={() => setShowComments(false)}
            className={`btn-icon hover:bg-[#f1f1f1] mr-1`}
          >
            <MdClose className={` w-5 h-5`} />
          </button>
        </div>
        {/* CONTENT */}
        <div
          className={`p-1 pb-3 w-full h-auto max-h-[400px] overflow-y-scroll  border-y-[1px] `}
        >
          {comments.length > 0 ? (
            <Comments comments={comments} isLoading={isLoading} />
          ) : (
            <p className={`pl-3 text-sm sm:text-base font-sans`}>
              The list is empty
            </p>
          )}
        </div>
        {/* FOOTER */}
        <div className={`sticky bottom-0 z-10 rounded-b-[20px] `}>
          <NewComment
            id={id}
            setStatePage={setStatePage}
            statePage={statePage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllComments;
