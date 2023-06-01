import React, { useState } from "react";
import Identity from "../components/cv/Indentity";
import Studies from "../components/cv/Studies";
import Experience from "../components/cv/Experience";
import Characteristics from "../components/cv/Characteristics";
import Aptitude from "../components/cv/Aptitude";
import { useSelector } from "react-redux";
// import Developpement from "./Developpement";
import CardProject from "../components/cardProject/CardProject";
import { MdClose } from "react-icons/md";
export default function Home() {
  const [show, setShow] = useState(false);
  
  const [topArrow, setTopArrow] = useState(false);
  const toggle = () => {
    setShow(!show);
    setTopArrow(!topArrow);
  };

  const { t } = useSelector((state) => state.langReducer);

  const Fr = window.location.href.includes("/fr");
  const En = window.location.href.includes("/en");
  const Ro = window.location.href.includes("/ro");

  let source;

  Fr && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-fr.pdf");
  En && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-en.pdf");
  Ro && (source = "https://boogysh.github.io/cv-file/cv-buga-victor-ro.pdf");

  return (
    // <main className="main-home  main-scroll">
    <main className="min-h-[600px] bg-bg_body  flex flex-col w-auto ">
      <div className="flex items-center">
        
        <button
          onClick={() => toggle()}
          className="flex ml-auto mx-5 mt-3 px-5 rounded-full text-[20px] md:text-[24px] cursor-pointer z-10 border-[1px] border-black hover:bg-[#ebdede]"
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
                {t.cardDev
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
                  .slice(0, 3)}
              </div>
            </div>
          </div>
        )}
      </section>
      {/* CV */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row justify-center items-center relative">
          <h1 className="text-center p-5 text-[26px] md:text-[40px] ">
            Curriculum Vitae
          </h1>

          {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
          <a href={source} target="blank">
            <button className="border-[1px] border-black p-1 cursor-pointer rounded-md hover:bg-[#ebdede]">
              {t.download}
            </button>
          </a>
        </div>

        <Identity />
        <Studies />
        <Experience />
        <Characteristics />
        <Aptitude />
      </section>
    </main>
  );
}
