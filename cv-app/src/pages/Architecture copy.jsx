import CardProject from "../components/cardProject/CardProject";
import Banner from "../components/Banner";
// import banner from "../assets/pr-arch/front-1200.jpg";
// import banner from "../assets/pr-arch/front-1200-1.jpg";
import banner from "../assets/pr-arch/front-new-lg-q8.jpg";
import { useSelector } from "react-redux";
// import { selectT } from "../redux/selectT";
// import LoaderSlider from "../components/loader/LoaderSlider";
import Loader from "../components/loader/Loader";
import { useMemo, useEffect, useState } from "react";
 import logo from "../assets/logo-boogysh-construction-2-70-2.png";   // 83ko

export default function Architecture() {
  const { t } = useSelector((state) => state.langReducer);
  // const t = useSelector(selectT);
  const {
    isLoading,
    ip,
    projects,
    ratings,
    ratingsCount,
    comments,
    commentsCount,
    likes,
    userRatingsByIp,
  } = useSelector((state) => state.projectReducer || {});

  const cardArch = useMemo(() => t.cardArch, [t.cardArch]);
  // const [firstImages, setFirstImages] = useState({logo});
  const [firstImages, setFirstImages] = useState({logo});
  // console.log("selectT exists?", selectT);

   // 🔹 Préparer les firstImages dès que cardArch change
  useEffect(() => {
    const obj = {};
    cardArch.forEach((card) => {
      if (card.pictures?.[0]) {
        obj[card.id] = card.pictures[0];

        // Préchargement immédiat de la première image
        const img = new Image();
        img.src = card.pictures[0];
      }
    });
    setFirstImages(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col items-center bg-bg_body  main-scroll">
      {/* // <main className="flex flex-col items-center main-scroll bg-gradient-to-b from-[#f9f5f0] to-[#f3ede7]">
    // <main className="flex flex-col items-center main-scroll bg-gradient-to-b from-[#fff7f7] via-[#eeeeee] to-[#dacece]"> */}
      <Banner src={banner} title={t.archTitle} />
      <h2 className="w-full text-center font-black text-[24px] md:text-[30px] lg:text-[44px] p-4 md:p-8 lg:pd-10 mt-3">
        {t.archTitle2}{" "}
      </h2>
      {isLoading
      //  ||
      // !ip ||
      // !ratings ||
      // !ratingsCount ||
      // !comments ||
      // !commentsCount ||
      // !userRatingsByIp ||
      // !likes ||
      // !t ||
      // !projects 
      ? (
        <div className="w-full h-[30dvh] flex items-center pb-[60px]">
          <Loader />
        </div>
      ) : (
        <section
          id="cards"
          className="flex flex-wrap justify-center pt-3 md:pt-5 lg:pt-7 2xl:pt-10"
        >
          {cardArch.map((item) => {
            const { id, pictures, title, info, technos } = item;

            return (
              // userRatingsByIp[id] !== null && (
              (
                <CardProject
                  key={id}
                  images={pictures}
                  // firstImage={firstImages[id]} 
                  firstImage={logo}
                  title={title}
                  info={info}
                  id={id}
                  technos={technos}
                />
              )
            );
          })}
        </section>
      )}
    </main>
  );
}
