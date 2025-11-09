// import React from "react";
import { MdClose } from "react-icons/md";
import NewComment from "./NewComment";
import Comments from "./Comments";
import RateBtn from "./RateBtn";

const CommentsModal = ({
  setShowComments,
  comments,
  isLoading,
  statePage,
  setStatePage,
  localStatePage,
  setLocalStatePage,
  title,
  id,
  ip,
  myIpList,
}) => {
  const handleModalClose = () => setShowComments(false);

  return (
    <div className="bg-black/70 fixed z-50 inset-0 flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] h-auto bg-white rounded-[20px] overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center py-3 px-5 border-b">
          <h2 className="text-xl md:text-2xl font-medium text-center">{title}</h2>
          <button onClick={handleModalClose} className="btn-icon">
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* COMMENTS LIST */}
        <div className="p-2 h-[400px] overflow-y-auto">
          {comments.length > 0 ? (
            <Comments comments={comments} isLoading={isLoading} />
          ) : (
            <p className="pl-3 text-sm md:text-base">La liste est vide</p>
          )}
        </div>

        {/* RATING */}
        <div className="flex flex-col items-center py-3">
          <h2 className="text-2xl font-semibold mb-2">Évaluez ce projet !</h2>
          <RateBtn ip={ip} id={id} myIpList={myIpList} statePage={statePage} setStatePage={setStatePage} />
        </div>

        {/* NEW COMMENT */}
        <div className="p-3 border-t">
          <NewComment
            id={id}
            ip={ip}
            statePage={statePage}
            setStatePage={setStatePage}
            localStatePage={localStatePage}
            setLocalStatePage={setLocalStatePage}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;




// import React from "react";
// import { MdClose } from "react-icons/md";
// import NewComment from "./NewComment";
// import Comments from "./Comments";
// import RateBtn from "./RateBtn";
// const CommentsModal = ({
//   // setShowComments,
//   // comments,
//   // title,
//   // id,
//   // ip,
//   // statePage,
//   // setStatePage,
//   // statePageRating,
//   // setStatePageRating,
//   // isLoading,
//   setShowComments,
//   comments,
//   title,
//   id,
//   ip,
//   statePage,
//   setStatePage,
//   localStatePage,
//   setLocalStatePage,
//   isLoading,
//   myIpList,
// }) => {
//   //----------------SAVE MY-IP'S TO LOCAL STORAGE-------------------------

 

//   const handleModal = () => {
//     setShowComments(false);
//     setLocalStatePage((prev) => prev + 1); // 🔁 refresh comments
//     setStatePage((prev) => prev + 1); // 🔁 refresh rating global
//   };
//   // console.log("🔎 id reçu dans CommentsModal:", id);

//   return (
//     <div
//       className={`bg-black/70 fixed z-50 bottom-0 left-0 top-0 right-0 w-full h-full  bg-cover flex justify-center items-center `}
//     >
//       <div
//         className={` w-[95%] xxs:w-[90%] z-60 xs:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[36%]  h-auto bg-white z-[90] rounded-[20px] overflow-hidden`}
//       >
//         {/* HEADER */}
//         <div
//           className={` rounded-t-[20px] w-full h-auto flex items-center py-1 px-3 `}
//         >
//           <h2
//             className={` w-full text-[18px] xs:text-[22px] sm:text-[28px] font-medium py-3 text-center`}
//           >
//             {title}
//           </h2>
//           <button
//             // onClick={() => setShowComments(false)}
//             onClick={handleModal}
//             className={`btn-icon hover:bg-[#f1f1f1] mr-0 rounded-full w-9`}
//           >
//             <MdClose className={`w-5 h-5`} />
//           </button>
//         </div>
//         {/* CONTENT */}
//         <div
//           className={`p-1 pb-3 w-full h-auto max-h-[400px] overflow-y-scroll  border-y-[1px] `}
//         >
//           {comments.length > 0 ? (
//             <Comments
//               comments={comments}
//               isLoading={isLoading}
//               statePage={statePage}
//               localStatePage={localStatePage}
//             />
//           ) : (
//             <p className={`pl-3 text-sm pt-1 sm:text-base font-sans`}>
//               La liste est vide
//             </p>
//           )}
//         </div>
//         {/* --RATING-- */}
//         <h2 className="text-2xl font-semibold mt-2 mb-0 text-center">
//           Évaluez ce projet !
//         </h2>
//         <div className="flex justify-center pt-4 pb-2">
//           {/* RATING  */}

//           <RateBtn
//             ip={ip}
//             id={id}
//             myIpList={myIpList}
//             statePage={statePage}
//             setStatePage={setStatePage}
//           />
//         </div>
//         {/* FOOTER */}
//         <div className={`  z-10 rounded-b-[20px] `}>
//           <NewComment
//             id={id}
//             ip={ip}
//             statePage={statePage} // global pour rating
//             setStatePage={setStatePage} // global pour rating
//             localStatePage={localStatePage} // local pour commentaires
//             setLocalStatePage={setLocalStatePage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentsModal;
