import React from "react";
import DiplomeArchitecture1 from "../assets/diplomes/architecture-1.jpg";
import DiplomeArchitecture2 from "../assets/diplomes/architecture-2.jpg";
import DiplomeArchitecture3 from "../assets/diplomes/architecture-3.jpg";
import DiplomeArchitecture4 from "../assets/diplomes/architecture-4.jpg";
import Design1 from "../assets/diplomes/design-1.jpg";
import Design2 from "../assets/diplomes/design-2.jpg";
import Delf from "../assets/diplomes/delf.jpg";
import Dev from "../assets/diplomes/dev.jpg";
const style = {
  imgBox: "flex ",
  imgDiplome:
    "flex  h-auto w-[540px] object-cover  mx-0 sm:mx-2 mt-5 border-[1px] border-[#ec6a01] ",
  imgDiplome2:
    "flex h-auto w-[700px] object-cover  mx-0 sm:mx-2 mt-5 border-[1px] border-[#ec6a01] ",
  h3Diplomes:
    "text-center w-full text-[16px] s:text-[18px] lg:text-[24px] pt-3 mb-0 lg:mb-5",
};

const Diplomes = () => {
  return (
    <main className="min-h-[600px] mb-5 bg-bg_body  flex flex-col w-auto relative ">
      <h2 className="w-full text-center font-black text-[26px] md:text-[34px] lg:text-[44px] p-2 md:p-5 lg:pd-10 mt-3">
        Mes diplomes suite à mes études
      </h2>
      <h3 className={style.h3Diplomes}>
        Faculté d'Urbanisme et d'Architecture BAC + 4
      </h3>
      <div className=" flex flex-wrap w-full justify-center mx-auto h-auto ">
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={DiplomeArchitecture1}
            alt="diplome architecture"
          />
        </div>
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={DiplomeArchitecture2}
            alt="diplome architecture 2"
          />
        </div>
      </div>
      <div className=" flex flex-wrap w-full justify-center mx-auto h-auto ">
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={DiplomeArchitecture3}
            alt="diplome architecture 3"
          />
        </div>
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={DiplomeArchitecture4}
            alt="diplome architecture 4"
          />
        </div>
      </div>
      <h3 className={style.h3Diplomes}>
        Ecole de design
      </h3>
      <div className=" flex flex-wrap w-full justify-center mx-auto h-auto ">
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={Design1}
            alt="diplome architecture"
          />
        </div>
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome}
            src={Design2}
            alt="diplome architecture 2"
          />
        </div>
      </div>
      <h3 className="text-center  w-full text-[20px] s:text-[22px] lg:text-[24px] pt-5 mb-2 ">
        DELF B2 et Développement WEB
      </h3>
      <div className="flex flex-wrap justify-center">
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome2}
            src={Delf}
            alt="diplome architecture"
          />
        </div>
        <div className={style.imgBox}>
          <img
            className={style.imgDiplome2}
            src={Dev}
            alt="diplome architecture 2"
          />
        </div>
      </div>
    </main>
  );
};

export default Diplomes;
