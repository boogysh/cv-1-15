// import React, { useState } from "react";
import Identity from "../components/cv/Indentity";
import { Link } from "react-router-dom";
import Studies from "../components/cv/Studies";
import Experience from "../components/cv/Experience";
import Characteristics from "../components/cv/Characteristics";
import Aptitude from "../components/cv/Aptitude";
import DiplomeArchitecture from "../assets/diplomes/architecture-1-2.jpg";
import { useSelector } from "react-redux";
import { GiClick } from "react-icons/gi";

export default function Home() {
  const { t } = useSelector((state) => state.langReducer);

  const Fr = window.location.href.includes("/fr");
  const En = window.location.href.includes("/en");
  const Ro = window.location.href.includes("/ro");

  let source;

  Fr &&
    (source =
      "https://boogysh.github.io/cv-api/images/cv/cv-buga-victor-fr-pdf.pdf "); // https://boogysh.github.io/cv-api/images/cv/cv-buga-victor-fr-pdf.pdf   !!! format is important  !!!
  En &&
    (source =
      "https://boogysh.github.io/cv-api/images/cv/cv-buga-victor-en-pdf.pdf"); //https://boogysh.github.io/cv-file/cv-buga-victor-en.pdf  !!! format is important  !!!
  Ro &&
    (source =
      "https://boogysh.github.io/cv-api/images/cv/cv-buga-victor-ro-pdf.pdf");

  return (
    <main id="mainCv" className="min-h-[600px] bg-bg_body flex flex-col w-auto relative ">
      <Link to={`/${t.locale}/diplomes`} className="relative">
        <div   className=" w-auto h-auto ml-auto absolute  top-[50px]  right-[0px] md:top-0 md:right-0 rounded-[10px]  m-10 mr-5 mt-[60px] xs:mr-5   md:m-5 md:mt-8 lg:m-8  border-[1px]  border-[#ec6a01] shadow shadow:hover overflow-hidden">
          <img
           
            className="h-[auto] w-[120px] sm:w-[180px] md:w-[130px] lg:w-[200px]  "
            src={DiplomeArchitecture}
            alt="diplome architecture"
          />
          <GiClick
            className="inline-block absolute top-[65px] xs:top-[65px] sm:top-[100px] md:top-[70px] lg:top-[110px] 
          right-[0px] md:right-[0px] lg:right-[20px] mr-5 w-6  h-6  lg:w-10 lg:h-10 text-[#ec6a01] " 
          />
        </div>
      </Link>
      {/* CV */}
      <section className="w-full">
        {/* <div className="flex flex-col md:flex-row justify-center items-center relative"> */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-2">
          <h1 className="text-center p-3 sm:p-5 text-[26px] md:text-[40px] ">
            Curriculum Vitae
          </h1>

          {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
          {/*  DESACTIVATED. NEED TO UPGRADE THE PDF FILES */}
          <a href={source} target="blank">
            <button className="border-[1px] border-black p-1 cursor-pointer rounded-md hover:bg-[#ebdede] shadow shadow:hover">
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
