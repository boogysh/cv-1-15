import React, { useState } from "react";
import { useSelector } from "react-redux";
// import Developpement from "./Developpement";
import CardProject from "./cardProject/CardProject";
import { MdClose } from "react-icons/md";
export default function Home() {
  const [show, setShow] = useState(false);

  const [topArrow, setTopArrow] = useState(false);
  const toggle = () => {
    setShow(!show);
    setTopArrow(!topArrow);
  };

  const { t } = useSelector((state) => state.langReducer);



  return (
    <main className="   flex flex-col w-auto ">
      <div className="flex items-center">
        <button
          onClick={() => toggle()}
          className="flex mr-auto mt-5 ml-5 px-5 rounded-full text-[20px] md:text-[24px] lg:text-[36px] cursor-pointer z-10 border-[1px] services_title_color-3 border_services_title_color-3 hover:bg-[#e0d1d1]"
        >
          New
        </button>
      </div>
      <section className={`w-auto h-auto flex flex-col items-center p-4 `}>
        {show && (
          <div className="fixed flex justify-center items-center top-0 z-[100] bg-black/50  w-full h-full ">
            <div className="flex flex-col items-center w-full xs:w-[97%] md:w-[700px] h-[70%] xs:h-[75%] md:h-[80%]  bg-bg_body xs:rounded-[20px] overflow-hidden">
              {/* HEADER */}
              <div className="flex bg-[#f1f1f1] items-center w-full border-[1px] border-b-black">
                <h2 className=" w-full h-auto text-center p-1 pr-0 ml-auto  text-[24px] font-semibold md:text-[36px] ">
                  New Projects
                </h2>
                <button
                  onClick={() => setShow(false)}
                  className={`btn-icon hover:bg-[#f1f1f1] mr-4`}
                >
                  <MdClose className={` w-5 h-5`} />
                </button>
              </div>
              {/* CONTENT */}
              <div className="flex flex-wrap justify-center overflow-scroll p-5">
                {/* {t.cardDev */}
                {t.cardBat
                  .map((item) => {
                    const {
                      id,
                      pictures,
                      title,
                      info,
                      urlProject,
                      urlExistent,
                      technos,
                    } = item;
                    return (
                      <CardProject
                        key={id}
                        images={pictures}
                        title={title}
                        info={info}
                        id={id}
                        urlProject={urlProject}
                        urlExistent={urlExistent}
                        technos={technos}
                      />
                    );
                  })
                  .slice(0, 3).toReversed()}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
