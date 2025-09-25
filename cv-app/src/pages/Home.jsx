// import React, { useState } from "react";
import Identity from "../components/cv/Indentity";
import { Link } from "react-router-dom";
import Studies from "../components/cv/Studies";
import Experience from "../components/cv/Experience";
import Characteristics from "../components/cv/Characteristics";
import Aptitude from "../components/cv/Aptitude";
import DiplomeArchitecture from "../assets/diplomes/architecture-1.jpg";
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
    <main className="min-h-[600px] bg-bg_body  flex flex-col w-auto relative ">
      <Link to={`/${t.locale}/diplomes`}>
        <div className=" w-auto h-auto ml-auto absolute top-0 right-0  m-10 mr-5 mt-[60px]  md:m-5 md:mt-10  lg:m-10  border-[1px]  border-[#ec6a01]">
          <img
            className="h-[auto] w-[140px] xs:w-[160px] sm:w-[180px] md:w-[150px] lg:w-[240px] "
            src={DiplomeArchitecture}
            alt="diplome architecture"
          />
          <GiClick
            className="inline-block absolute top-[80px] sm:top-[100px] md:top-[80px] lg:top-[130px] 
          right-[0px] md:right-[0px] lg:right-[20px] mr-5 w-6  h-6 lg:w-10 lg:h-10 text-[#ec6a01]"
          />
        </div>
      </Link>
      {/* CV */}
      <section className="w-full">
        {/* <div className="flex flex-col md:flex-row justify-center items-center relative"> */}
        <div className="flex flex-col md:flex-row justify-center items-center ">
          <h1 className="text-center p-5 text-[26px] md:text-[40px] ">
            Curriculum Vitae
          </h1>

          {/* <a href="https://boogysh.github.io/cv-file/CV-Buga-Victor.docx"> */}
          {/*  DESACTIVATED. NEED TO UPGRADE THE PDF FILES */}
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
