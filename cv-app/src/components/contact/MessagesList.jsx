import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loader from "../loader/LoaderMessages";
import { MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
// import { UseFetch } from "../../hooks/useFetch";
// import { UseFetch2 } from "../../hooks/useFetch2";

const MessagesList = ({
  messages,
  isLoading,
  messagesUpdate,
  setMessagesUpdate,
}) => {
  // const MessagesList = () => {
  // const [messagesUpdate, setMessagesUpdate] = useState(0);

  // const { data2, isLoading } = UseFetch2(
  //   // `${process.env.REACT_APP_URL}/api/messages`,
  //   `https://cv-back-25.vercel.app/api/messages`,
  //   messagesUpdate
  // );
  // const messages = data2;

  const [open, setOpen] = useState(Array.from(messages, () => false));
  const toggle = (index, value) => {
    const newOpenState = [...open];
    newOpenState[index] = value ?? !newOpenState[index];
    setOpen(newOpenState);
  };
  //---------------------FETCH---------------------------------

  // DELETE MESSAGE
  const deleteMessage = async (id) => {
    // await fetch(`https://cv-back-25.vercel.app/api/messages/${id}`, {
      await fetch(`${process.env.REACT_APP_API_URL}/messages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    setMessagesUpdate(messagesUpdate + 1);
    //refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };

  //
  return (
    <div className="mb-5  ml-auto">
      {messages.map((message, idx) => {
        // return <Loader  />
        // ) : (
        return isLoading ? (
          <Loader key={uuidv4()} />
        ) : (
          <div
            key={uuidv4()}
            className=" mx-auto p-[20px] mt-[15px] relative  bg-[#f1f1f1] rounded-[10px]"
          >
            <div className="flex flex-col ">
              <div className="flex items-center">
                <h3 className="p-2 font-semibold text-sm sm:text-base ">
                  {message.lastName} {message.firstName}{" "}
                </h3>

                <span className="text-sm sm:text-base">
                  <strong>le:</strong> {message.createdAt.slice(0, 10)}
                  <strong> à:</strong> {message.createdAt.slice(11, 16)}
                </span>
              </div>
              <div>
                <strong className="pl-2">Email:</strong> {message.email}
              </div>
            </div>
            {/* <p className="pl-[10px] w-95% max-w-[700px]"> */}
            {/* <p className="pl-[10px] w-full ">{message.messageTxt}</p> */}
            <p className="p-[10px] pt-4 w-95% max-w-[700px] ">   
              {message.messageTxt}
            </p>

            {/* DOTS MENU  */}
            <div
              className={`flex w-fit ml-auto  border-[1px]  h-fit rounded-full`}
            >
              {/* {showDotsMenu && ( */}
              {open[idx] && (
                <button
                  key={uuidv4()}
                  // onClick={() => findMessageToDelete(message._id)}
                  onClick={() => deleteMessage(message._id)}
                  className={`w-7 h-7 flex ml-px mr-4 justify-center items-center rounded-full `}
                >
                  <MdDelete className={`w-5 h-5 `} />
                </button>
              )}
              <button
                key={uuidv4()}
                // isOpen={open[idx]}
                onClick={() => toggle(idx)}
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
