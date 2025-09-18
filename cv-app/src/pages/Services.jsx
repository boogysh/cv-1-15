import React from "react";
import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
import banner_services from "../assets/pr-bat/8.png";
import { useSelector } from "react-redux";

export default function Building() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="flex flex-col items-center bg-bg_body  main-scroll">
      <Banner title={t.servicesTitle} src={banner_services} />
      <section
        id="cards"
        className="flex flex-wrap justify-center pt-3 md:pt-5 lg:pt-7 2xl:pt-10"
      >
        {t.cardServices.map((item) => {
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
