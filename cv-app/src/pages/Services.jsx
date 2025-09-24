import React from "react";
import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
import banner_services from "../assets/pr-bat/8.png";
import { useSelector } from "react-redux";

export default function Building() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    // <main className="min-h-[600px] flex flex-col items-center bg-bg_body  main-scroll">
    <main className="min-h-[600px] flex flex-col items-center bg-bg_body w-auto">
      <Banner title={t.servicesTitle} src={banner_services} />
      <section
        id="cards"
        // className="flex flex-wrap justify-center  pt-3 md:pt-5 lg:pt-7 2xl:pt-10"
        className="flex flex-wrap justify-center  pt-3"
      >
        <div className="flex flex-col w-full  ">
          <p className="text-sm pl-2">
            <span className=" text-[#ec6a01] text-[22px]">25€ T.T.C.</span>{" "}
            l'heure pour la main d'oevre contre 42€ H.T., que mes clients ont
            payé dernières 12 ans pour mes sérvices.
          </p>

          <h2 className=" pt-3 mx-auto font-black text-[30px] sm:text-[36px] lg:text-[44px]">
            Un projet envisagé?
          </h2>
        </div>
        <section className="flex flex-wrap p-[30px]">
          <h3 className="text-center w-full text-[18px] s:text-[22px] lg:text-[24px] pt-0 sm:pt-3 mb-7">
            Voulez vous rénover votre logement ou une des vos pièces ?
          </h3>

          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-5 ">
            Faites des économies jusqu' à 40% sur vos travaux. Réglez vous même les matériaux, dans les magasins pro au
            prix négocié et payez que la main d'œuvre. Moi je ferai le reste,
            des rénovation du sol au plafond.
          </p>
          <h3 className="text-center w-full text-[20px] s:text-[22px] lg:text-[24px] pt-3 mb-5">
            Pourquoi choisir mes services?
          </h3>
          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-5">
            Mon profil d'ingénieur avec des connaissances solides dans
            l'architecture et mon perfectionnisme vous offriront une qualité
            au-dessus de la moyenne parmi les sociétés du coin, couverte par les
            mêmes assurances, au prix plus avantageux.
          </p>
          <p className="indent-5 text-sm xs:text-base lg:text-lg pb-8">
            Vous bénéficierez également du savoir-faire transmis par des
            véritables maçons professionnels, que j'ai acquis dans le cadre des
            sociétés ou j'ai activé au long de ma carrière. Vous bénéficierez
            d'un prix attractif, en faisant des économies jusqu'au 40%, en
            bénéficiant des mêmes garanties légales et de la même qualité, que
            j'ai fourni aux clients dans le cadre de mon activité
            professionnelle, en tant que salarié.
          </p>

          {/* <h3 className="text-center w-full text-[20px] s:text-[22px] lg:text-[24px] pt-3 mb-5">
            Seconds œuvres disponible dans l'immédiat et gros œuvres disponible 
            partiellement.
          </h3> */}
          <h3 className="text-center w-full text-[20px] s:text-[22px] lg:text-[24px] pt-3 mb-5">
            Soyez le client suivant et profiter de votre logement après une
            transformation irreconaissable.
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
