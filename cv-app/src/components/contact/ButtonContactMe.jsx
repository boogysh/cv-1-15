import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import useForm from "../hooks/useForm/useFormContact";
import FormContact from "./formContact";
import { MdClose } from "react-icons/md";
// import axios from "axios";
export default function Home() {
  const [show, setShow] = useState(false);

  // const toggle = () => {
  //   setShow(!show);
  // };

  // const { t } = useSelector((state) => state.langReducer);

  // // 🔒 Bloquer le scroll du body quand la modale est ouverte
    // useEffect(() => {
    //   document.body.classList.add("overflow-hidden");
    //   return () => document.body.classList.remove("overflow-hidden");
    // }, []);
  

  return (
    <main className="   flex flex-col w-auto ">
      {/* BTN CONTACT ME */}
      <div className="flex items-center">
        <button
          onClick={() => setShow(true)}
          className="flex   ml-3 xs:ml-5   px-2  rounded-[5px] xs:rounded-[10px] text-[14px] xs:text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] cursor-pointer z-10 border-[1px] services_title_color-3 border_services_title_color-3 hover:bg-[#e0d1d1]"
        >
          Contactez Moi
        </button>
      </div>
      {/* MODAL CONTACT ME */}
      <section className={`w-auto h-auto flex flex-col items-center`}>
        {show && (
          <div className="fixed overflow-clip  flex justify-center items-center top-0 left-0 z-[99] bg-black/70  w-full h-full  ">
            <div className="flex flex-col items-center w-95%  max-w-[400px] h-auto max-h-[620px]  xs:max-h-none xs:h-auto bg-bg_body rounded-[20px] overflow-hidden z-[99]">
              {/* HEADER */}
              <div className="flex rounded-tl-[20px] xxs:rounded-tl-[20px] rounded-tr-[20px] bg-[#f1f1f1] items-center w-full  border-[1px] border-b-black">
                <h2 className=" w-full h-auto text-center p-1 pr-0 ml-auto  text-[24px] font-semibold md:text-[30px] ">
                  Contactez Moi
                </h2>
                <button
                  onClick={() => setShow(false)}
                  className={`btn-icon hover:bg-[#f1f1f1] mr-4`}
                >
                  <MdClose className={`w-5 h-5`} />
                </button>
              </div>
              {/* CONTENT */}
              <div className="flex flex-wrap justify-center overflow-scroll p-2  xs:p-5 ">
                {/* formulaire */}
                <FormContact
                // borderRed={borderRed}
                // sendMessage={sendMessage}
                // isLoading={isLoading}
                // setLoading={setLoading}
                // allValues={allValues}
                />
               
                
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
