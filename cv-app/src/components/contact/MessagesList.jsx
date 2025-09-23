import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loader/LoaderMessages";
// import trash from "../../assets/trash.png";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

const MessagesList = ({ messages, isLoading }) => {
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [IsMessageToDelete, setMessageToDelete] = useState("");
  //
  //

  const deleteMessage = async () => {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/messages}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ userId: loggedInUserId }),
    });
  };

  const findMessageToDelete = (id) => {
    const oneMessage = messages.filter((item) => {
      return item._id === id;
    });
    setMessageToDelete(oneMessage);
  };

  console.log("++++++++++++++++++", IsMessageToDelete);

  // export function likesFilter(data2, id, setIpList, setLikesQty) {
  // data2.filter((like) => {
  //   if (like.project === id) {
  //     setIpList(like.ipList);
  //     setLikesQty(like.likes);
  //   }
  //   return like.ipList && like.likes;
  // });

  // const notAuthorized = await response.json();
  // console.log("Authorized-?:", notAuthorized.message);
  //
  return (
    <div className="mb-5 ">
      {messages.map((message) => {
        // return <Loader  />
        // ) : (
        return isLoading ? (
          <Loader key={uuidv4()} />
        ) : (
          <div
            key={uuidv4()}
            className="p-1 sm:p-[10px] mt-[15px] relative  bg-[#f1f1f1] rounded-[10px] w-auto"
          >
            <div className="flex items-center">
              <h3 className="p-2 font-semibold text-sm sm:text-base ">
                {message.lastName} {message.firstName}{" "}
              </h3>
              <span className="text-sm sm:text-base">
                <strong>le:</strong> {message.createdAt.slice(0, 10)}{" "}
                <strong> à: </strong> {message.createdAt.slice(11, 19)}
              </span>
            </div>
            <p className="pl-[10px] w-[700px]">{message.messageTxt}</p>

            {/* DOTS MENU  */}
            {/* {userIdEgalPostUserId && ( */}
            <div
              className={`flex w-fit ml-auto  border-[1px]  h-fit rounded-full`}
            >
              {showDotsMenu && (
                <button
                  id={message._id}
                  // onClick={deleteMessage}
                  //onClick={() => delFunc(id)}
                  onClick={() => findMessageToDelete(message._id)}
                  className={`w-7 h-7 flex ml-px mr-4 justify-center items-center rounded-full `}
                >
                  <MdDelete className={`w-5 h-5 `} />
                </button>
              )}
              <button
                onClick={() => setShowDotsMenu(!showDotsMenu)}
                className={`w-7 h-7 flex  justify-center items-center rounded-full `}
              >
                <BsThreeDots className={`w-4 h-4 `} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
