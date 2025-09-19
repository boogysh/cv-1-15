// import React, { useState } from "react";
import Identity from "../components/cv/Indentity";
import Studies from "../components/cv/Studies";
import Experience from "../components/cv/Experience";
import Characteristics from "../components/cv/Characteristics";
import Aptitude from "../components/cv/Aptitude";
export default function Home() {

  

  // const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="min-h-[600px] bg-bg_body  flex flex-col w-auto ">
      {/* CV */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row justify-center items-center relative">
          <h1 className="text-center p-5 text-[26px] md:text-[40px] ">
            Curriculum Vitae
          </h1>

          {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
          {/*  DESACTIVATED. NEED TO UPGRADE THE PDF FILES */}
          {/* <a href={source} target="blank">
            <button className="border-[1px] border-black p-1 cursor-pointer rounded-md hover:bg-[#ebdede]">
              {t.download}
            </button>
          </a> */}
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
