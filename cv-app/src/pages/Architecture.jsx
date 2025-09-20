import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
import banner from "../assets/pr-arch/front-1200.jpg";
import { useSelector } from "react-redux";

export default function Architecture() {
  const { t } = useSelector((state) => state.langReducer);

  return (
    <main className="flex flex-col items-center bg-bg_body  main-scroll">
      <Banner src={banner} title={t.archTitle} />
      <h2 className="w-full text-center font-black text-[24px] md:text-[30px] lg:text-[44px] p-4 md:p-8 lg:pd-10 mt-3">Mes réalisations pendant mes études à la faculté d'Urbanisme et d'Architecture </h2>
      <section
        id="cards"
        className="flex flex-wrap justify-center pt-3 md:pt-5 lg:pt-7 2xl:pt-10"
      >
        {t.cardArch.map((item) => {
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
