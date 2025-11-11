import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRatingFullUpdate } from "../redux/ratingActions";

/**
 * Hook pour charger toutes les ratings et alimenter Redux.
 * Appeler ce hook une seule fois (ex: App.jsx ou Layout).
 */
export const useFetchRatings = (
  url,
  projectId = null,
  userIp = null,
  statePage = null
) => {
  const [ipList, setIpList] = useState([]);
  const [ratingsObj, setRatingsObj] = useState({});
  const [count, setCount] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [totalAverage, setTotalAverage] = useState(0);
  const [userRating, setUserRating] = useState(0); // note de l'utilisateur pour le projet courant

  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state.ratingReducer || {});
  const reduxStateRef = useRef(reduxState);

  // 🔹 garder la dernière version du state Redux
  useEffect(() => {
    reduxStateRef.current = reduxState;
  }, [reduxState]);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
          console.error("Fetch ratings failed:", res.statusText);
          return;
        }

        const json = await res.json();
        const dataArray = Array.isArray(json) ? json : json.projects || [];

        const projectAverages = {};
        const projectVotesObj = {};
        let currentIpList = [];
        let currentVotes = 0;
        let currentUserRating = 0;

        // 🔹 Parcours des projets pour calculer moyennes et votes
        dataArray.forEach((proj) => {
          const ipListProj = proj.ipList || [];
          const ratings = ipListProj
            .map((i) => i.rating)
            .filter((r) => typeof r === "number");

          const average =
            ratings.length > 0
              ? +(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(
                  2
                )
              : 0;

          projectAverages[proj.project] = average;
          projectVotesObj[proj.project] = ratings.length;

          // 🔹 Projet courant : récupérer ipList et note utilisateur si existante
          if (proj.project === projectId) {
            currentIpList = ipListProj;
            currentVotes = ratings.length;

            // if (userIp) {
            //   const found = ipListProj.find((i) => i.ip === userIp);
            //   if (found && typeof found.rating === "number") {
            //     currentUserRating = found.rating;
            //   }
            // }
            if (userIp) {
              const found = ipListProj.find((i) => i.ip === userIp);
              if (found && typeof found.rating === "number") {
                currentUserRating = found.rating;
              }
            }
          }
        });

        // 🔹 Calcul global
        const allRatings = dataArray.flatMap((p) =>
          p.ipList
            ? p.ipList.map((i) => i.rating).filter((r) => typeof r === "number")
            : []
        );

        const totalAvg =
          allRatings.length > 0
            ? +(
                allRatings.reduce((a, b) => a + b, 0) / allRatings.length
              ).toFixed(2)
            : 0;

        // 🔹 Mise à jour des states locaux
        setIpList(currentIpList);
        setCount(currentVotes);
        setRatingsObj(projectAverages);
        setTotalAverage(totalAvg);
        setTotalVotes(allRatings.length);
        setUserRating(currentUserRating); // note utilisateur pour affichage étoiles

        // 🔹 Mise à jour Redux
        const oldState = reduxStateRef.current;
        dispatch(
          setRatingFullUpdate({
            ratings: { ...oldState.ratings, ...projectAverages },
            count: { ...oldState.count, ...projectVotesObj },
            totalAverage: totalAvg,
            totalVotes: allRatings.length,
            ratingRedux: currentUserRating,
          })
        );
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Erreur fetch ratings:", err);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, projectId, userIp, statePage, dispatch]);

  return {
    ratingRedux: userRating, // note de l'utilisateur pour ce projet
    ipList,
    ratingsObj,
    count,
    totalAverage,
    totalVotes,
  };
};
