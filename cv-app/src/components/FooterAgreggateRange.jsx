import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const FooterAgreggateRange = () => {
  //  console.log("🔄 FooterAgreggateRange render"); // <-- Ajoute ce log ici
 
  const lastUpdate = useSelector((state) => state.ratingReducer.lastUpdate);

  const [globalAverage, setGlobalAverage] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://cv-back-25.vercel.app/api/ratings");
        const data = await res.json();

        const withComputedRatings = data.map((item) => {
          const ratings = item.ipList?.map((ip) => ip.rating).filter(Boolean) || [];
          const rateCount = ratings.length;
          const rateAverage =
            rateCount > 0 ? ratings.reduce((acc, val) => acc + val, 0) / rateCount : 0;
          return { ...item, rateCount, rateAverage };
        });

        const validProjects = withComputedRatings.filter((i) => i.rateCount > 0);
        const sumVotes = validProjects.reduce((acc, i) => acc + i.rateCount, 0);
        const globalAvg =
          sumVotes > 0
            ? (
                validProjects.reduce(
                  (acc, i) => acc + i.rateCount * i.rateAverage,
                  0
                ) / sumVotes
              ).toFixed(1)
            : 0;

        setGlobalAverage(globalAvg);
        setTotalVotes(sumVotes);
      } catch (err) {
        console.error("Erreur fetch global:", err);
      }
    };

    fetchData();
  }, [lastUpdate]); // 🟢 se relance à chaque nouveau vote

  // // JSON-LD pour Google

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork", // Tu peux aussi utiliser "Project" ou "Product" selon ton positionnement SEO
    name: "Projets d'architecture et de rénovation - Buga Victor",
    alternateName:
      "Architecture, conception, design intérieur et extérieur et tout projet de rénovation",
    description:
      "Découvrez les projets d'architecture réalisés par Victor Buga — maisons contemporaines, constructions sur mesure et rénovations, notés par les visiteurs.",
    url: "https://boogysh.github.io/cv-api/",
    inLanguage: "fr",
    author: {
      "@type": "Person",
      name: "Victor Buga",
      jobTitle:
        "Architecte, ingénieur, concepteur 3D. Maçon polyvalent et chef de chantier.",
      url: "https://www.linkedin.com/in/victor-buga",
    },
    publisher: {
      "@type": "Organization",
      name: "Boogysh Construction",
      logo: {
        "@type": "ImageObject",
        url: "https://boogysh.github.io/cv-api/images/assets/logo-boogysh-construction-2.png",
      },
    },
    image: [
      "https://boogysh.github.io/cv-api/images/arch/pr0/pr0-1.png",
      "https://boogysh.github.io/cv-api/images/arch/pr1/pr1-0.jpg",
      "https://boogysh.github.io/cv-api/images/arch/pr2/pr2-1.jpg",
      "https://boogysh.github.io/cv-api/images/arch/pr3A/pr3A-3.jpg",
      "https://boogysh.github.io/cv-api/images/arch/pr3/pr3-stade-4.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr1/pr1-1.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2/pr2-1.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2/pr2-29.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2A/pr2A-20.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2A/pr2A-21.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2A/pr2A-22.jpg",
      "https://boogysh.github.io/cv-api/images/bat/pr2A/pr2A-23.jpg",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: globalAverage,
      bestRating: "5",
      worstRating: "1",
      reviewCount: totalVotes,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://boogysh.github.io/cv-api/",
    },
  };

  return (
    <>
      <div className="w-auto h-fit footer-ratings flex items-center justify-between px-2">
        <span className="text-[12px] md:text-base pb-2 text-white font-dancing">
          Moyenne : ⭐ {globalAverage}
        </span>
        <span className="pl-2 text-[12px] md:text-base pb-2 text-white font-dancing">
          Total des votes : {totalVotes}
        </span>
      </div>

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default FooterAgreggateRange;
