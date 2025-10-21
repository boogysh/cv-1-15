import React from "react";
import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
// import banner_bat from "../assets/pr-bat/7.png";
import banner_bat from "../assets/pr-bat/7-1.jpg";
import { useSelector } from "react-redux";

export default function Building() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="flex flex-col items-center bg-bg_body  main-scroll">
      <Banner title={t.batTitle} src={banner_bat} />
      <section
        id="cards"
        className="flex flex-wrap justify-center pt-3 md:pt-5 lg:pt-7 2xl:pt-10"
      >
        <h2 className="font-black text-[30px] lg:text-[44px]">{t.batTitle2}</h2>
        <h3 className="text-center w-full text-[16px] s:text-[20px] lg:text-[28px] pt-3 mb-2">
        {t.batTitle3}
        </h3>
        <p className=" w-full text-center indent-5 text-sm xs:text-base lg:text-lg pb-10 ">
          {t.batTitle4}
        </p>
        {t.cardBat.map((item) => {
          const { id, pictures, title, info, technos } = item;
          return (
            <CardProject
              key={id}
              images={pictures}
              title={title}
              info={info}
              id={id}
              technos={technos}
            />
          );
        })}
      </section>
    </main>
  );
}
