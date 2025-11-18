import { useState } from "react";
import MessagesList from "../components/contact/MessagesList";
import Loader from "../components/loader/LoaderMessages";
//  import { UseFetch } from "../hooks/useFetch";
import { UseFetch2 } from "../hooks/useFetch2";
export default function Messages() {
  // const { t } = useSelector((state) => state.langReducer);
  const [messagesUpdate, setMessagesUpdate] = useState(0);

  //---------------------FETCH---------------------------------
  const { isLoading, data2 } = UseFetch2(
    // `https://cv-back-25.vercel.app/api/messages`,
      `${process.env.REACT_APP_API_URL}/messages`,
    messagesUpdate
  );

  console.log("data2",data2)

  return (
    <main className="min-h-[600px] bg-bg_body  flex flex-col w-auto ">
      {/* MESSAGES*/}
      <section className="w-full">
        {/* <div className="flex flex-col md:flex-row justify-center items-center relative"> */}
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
                // setLoading={setLoading}
                messagesUpdate={messagesUpdate}
                setMessagesUpdate={setMessagesUpdate}
              />
            ) : (
              <p className={`pl-3 text-sm sm:text-base font-sans`}>
                The list is empty
              </p>
            )}
          </div>
          {/* <div className="p-1  w-auto h-auto">
            {data2.length > 0 ? (
              <MessagesList
                messages={data2}
                isLoading={isLoading}
                // setLoading={setLoading}
                messagesUpdate={messagesUpdate}
                setMessagesUpdate={setMessagesUpdate}
              />
            ) : isLoading ? (
              <Loader />
            ) : (
              <p className={`pl-3 text-sm sm:text-base font-sans`}>
                The list is empty
              </p>
            )}
          </div> */}
        </div>
      </section>
    </main>
  );
}
