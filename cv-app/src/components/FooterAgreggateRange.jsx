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

  // JSON-LD pour Google
  const jsonLd = {
    "@context": "https://boogysh.github.io/cv-api/images/arch/pr0/pr0-1.png",
    "@type": "Project",
    name: `MyProjects`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: globalAverage,
      reviewCount: totalRatings,
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
