import { useState } from "react";
import MessagesList from "../components/contact/MessagesList";
import Loader from "../components/loader/LoaderMessages";
import { UseFetchMessages } from "../hooks/useFetchMessages";
export default function Messages() {
  const [messagesUpdate, setMessagesUpdate] = useState(0);

  //---------------------FETCH---------------------------------
  const { isLoading, data2 } = UseFetchMessages(
    // `https://cv-back-25.vercel.app/api/messages`,
    `${process.env.REACT_APP_API_URL}/messages`,
    messagesUpdate
  );

  console.log("data2", data2);

  return (
    <main className="min-h-screen bg-bg_body  flex flex-col w-auto ">
      {/* MESSAGES*/}
      <section className="w-full h-auto">
        <div className="flex flex-col  justify-center items-center ">
          <h1 className="text-center p-5 text-[26px] md:text-[40px] ">
            Messages
          </h1>
          <div className="p-1  w-auto h-auto">
            {isLoading ? (
              <Loader />
            ) : data2.length > 0 ? (
              <MessagesList
                messages={data2}
                isLoading={isLoading}
                messagesUpdate={messagesUpdate}
                setMessagesUpdate={setMessagesUpdate}
              />
            ) : (
              <p className={`pl-3 text-sm sm:text-base font-sans`}>
                The list is empty
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
