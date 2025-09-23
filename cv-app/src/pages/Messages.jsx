// import  { useState } from "react";
import MessagesList from "../components/contact/MessagesList";
import { UseFetch } from "../hooks/useFetch";
export default function Messages() {
  // const { t } = useSelector((state) => state.langReducer);

  
  //---------------------FETCH---------------------------------
  const { data, isLoading } = UseFetch(
    // `https://cv-back-git-main-boogysh.vercel.app/api/comments`,
    `https://cv-back-25.vercel.app/api/messages`
    // `${process.env.REACT_APP_URL}/api/messages`,
    // statePage
  );

  console.log("data",data)

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
            {data.length > 0 ? (
              <MessagesList messages={data} isLoading={isLoading} />
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
