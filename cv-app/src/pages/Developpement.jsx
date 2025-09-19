import React, { useMemo, useState } from "react";
import Banner from "../components/Banner";
import banner_dev from "../assets/pr-dev/banner1_dev.png";
import { useSelector } from "react-redux";
import CardProject from "../components/cardProject/CardProject";

export default function Developpement() {
  const [uri, setUri] = useState();
  const { t } = useSelector((state) => state.langReducer);

  useMemo(() => {
    const hrefDev = window.location.href.includes(t.devNav);
    hrefDev && setUri(t.devNav);
  }, [t.devNav]);

  return (
    // <main className="main_architecture main-scroll">
    <main className="flex flex-col items-center bg-bg_body  main-scroll ">
      {uri === t.devNav && <Banner title={t.devTitle} src={banner_dev} />}
      <h2 className="font-black p-10">Développement d'applications pour usage personnel</h2>
      <section
        id="cards"
        className="flex flex-wrap justify-center  pt-3 md:pt-5 lg:pt-7 2xl:pt-10 "
      >
        

        {uri === t.devNav
          ? t.cardDev.map((item) => {
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
                // <CardProject
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
          : t.cardDev
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
                  // <CardProject
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
      </section>
    </main>
  );
}
