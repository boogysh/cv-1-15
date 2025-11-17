import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
import banner from "../assets/pr-arch/front-new-lg-q8.webp";
import { useSelector } from "react-redux";
// import { useMemo } from "react";

export default function Architecture() {
  const { t } = useSelector((state) => state.langReducer);

  // const cardArch = useMemo(() => t.cardArch, [t.cardArch]);

  // 🔹 Préparer les firstImages dès que cardArch change

  return (
    <main className="flex flex-col items-center bg-bg_body  main-scroll min-h-[70%]">
      <Banner src={banner} title={t.archTitle} />
      <h2 className="w-full text-center font-black text-[24px] md:text-[30px] lg:text-[44px] p-4 md:p-8 lg:pd-10 mt-3">
        {t.archTitle2}{" "}
      </h2>
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
