import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
const FooterAgreggateRange = () => {
  const aggregate = useSelector(
    (state) => state.ratingAggregateReducer.aggregates
  );

  Object.entries(aggregate).forEach(([projectId, data]) => {
    console.log(
      `Projet ${projectId}: moyenne ${data.average}, notes ${data.count}`
    );
  });

  const allAggregates = Object.values(aggregate);
  const totalRatings = allAggregates.reduce((acc, val) => acc + val.count, 0);
  const globalAverage =
    totalRatings > 0
      ? (
          allAggregates.reduce((acc, val) => acc + val.average * val.count, 0) /
          totalRatings
        ).toFixed(1)
      : 0;

  console.log(
    "🌍 Moyenne globale:",
    globalAverage,
    "sur",
    totalRatings,
    "notes"
  );

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
      reviewCount: totalRatings,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://boogysh.github.io/cv-api/",
    },
  };

  return (
    <>
      <div className="w-auto h-fit footer-ratings flex items-center justify-between px-2 ">
        <span className="text-[12px] md:text-base pb-2 text-white font-dancing">
          Moyenne : ⭐ {globalAverage}
        </span>
        <span className="pl-2 text-[12px] md:text-base pb-2 text-white font-dancing">
          Total des votes : {totalRatings}
        </span>
      </div>

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
    </>
  );
};

export default FooterAgreggateRange;
