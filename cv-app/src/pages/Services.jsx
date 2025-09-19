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
        <h2 className=" font-black text-[30px] sm:text-[36px] lg:text-[44px]">
          Un projet envisagé?
        </h2>
        <section className="flex flex-wrap p-[30px]">
          <h3 className="text-center w-full text-[18px] s:text-[22px] lg:text-[24px] pt-0 sm:pt-3 mb-7">
            Vous avez des travaux de rénovation à réaliser ou des petites
            interventions?
          </h3>

          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-5 ">
            Voulez vous faire des économies jusqu' à 40% sur vos travaux ? C'est
            simple. Réglez vous même les matériaux, dans les magasins pro au
            prix négocié et payez que la main d'œuvre. Moi je ferai le reste,
            des rénovation du sol au plafond.
          </p>
          <h3 className="text-center w-full text-[20px] s:text-[22px] lg:text-[24px] pt-3 mb-5">
            Pourquoi choisir mes services?
          </h3>
          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-8">
            Vous bénéficierez du savoir-faire transmis par des véritables maçons
            professionnels, que j'ai acquis dans le cadre des sociétés ou j'ai
            activé au long de ma carrière. Vous bénéficierez d'un prix
            attractif, en faisant des économies jusqu'au 40%, en bénéficiant des
            mêmes garanties légales et de la même qualité, que j'ai fourni aux
            clients dans le cadre de mon activité professionnelle, en tant que
            salarié.
          </p>
          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-5">
            Mon profil d'ingénieur avec des connaissances solides dans
            l'architecture et mon perfectionnisme vous offriront une qualité
            au-dessus de la moyenne parmi les sociétés du coin, couverte par les
            mêmes assurances, au prix plus avantageux.
          </p>
          <h3 className="text-center w-full text-[20px] s:text-[22px] lg:text-[24px] pt-3 mb-5">
            Seconds œuvres disponible dans l'immédiat et gros œuvres disponible
            partiellement.
          </h3>
        </section>

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
