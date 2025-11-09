import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { useFetchFilteredLikes } from "../../../hooks/useFetch_filtered_likes";
import { aggregateRange } from "../../../utils/aggregateRange";
import { setRatingFullUpdate } from "../../../redux/ratingActions";

const RateBtn = ({ id, ip, myIpList, statePage, setStatePage }) => {
  const dispatch = useDispatch();

  // 🔹 Sélecteurs sécurisés
  const { globalRating = 0, aggregate } = useSelector((state) => {
    const { ratings = {}, aggregates = {} } = state.ratingReducer || {};
    return {
      globalRating: ratings[id] ?? 0,
      aggregate: aggregates[id] ?? { average: 0, count: 0 },
    };
  });

  // 🔹 Récupération des votes depuis l’API
  const { ipList, ratingCount } = useFetchFilteredLikes(
    "https://cv-back-25.vercel.app/api/ratings",
    id,
    statePage
  );

  // 🔹 Memoiser l’aggregate local pour éviter changements de référence
  const localAggregate = useMemo(() => {
    const ratingsArray = ipList.map((item) => item.rating).filter(Boolean);
    return aggregateRange(ratingsArray);
  }, [ipList]);

  // console.log('localAggregate.average',localAggregate.average)

  // 🔹 useEffect pour mettre à jour Redux uniquement si nécessaire
  useEffect(() => {
    if (!ipList || !ip) return;
    const currentUser = ipList.find((item) => item.ip === ip);
    if (!currentUser) return;

    const needUpdate =
      globalRating !== currentUser.rating ||
      aggregate.average !== localAggregate.average ||
      aggregate.count !== localAggregate.count;

    if (needUpdate) {
      dispatch(
        setRatingFullUpdate(
          id,
          currentUser.rating,
          localAggregate.average
          // localAggregate.count
        )
      );
    }
  }, [
    ipList,
    ip,
    id,
    dispatch,
    globalRating,
    aggregate.average,
    aggregate.count,
    localAggregate.average,
    localAggregate.count,
  ]);

  const updateCommentRating = async (selectedValue) => {
    try {
      await fetch("https://cv-back-25.vercel.app/api/comments/update-rating", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: id,
          ip,
          rating: selectedValue,
        }),
      });
      
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour du rating du commentaire :",
        err
      );
    }
  };

  // 🔹 Poster une nouvelle note
  const ratePost = (selectedValue) => {
    if (!ip || !id || !myIpList) return;

    fetch("https://cv-back-25.vercel.app/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project: id,
        ip,
        rating: selectedValue,
        allMyIPs: myIpList,
      }),
    })
      .then(async () => {
        // ✅ Met aussi à jour la note dans le commentaire associé
        await updateCommentRating(selectedValue);
        setStatePage((prev) => prev + 1); // force re-fetch
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-auto h-auto">
      <div className="flex items-center px-4 w-auto h-auto mr-auto">
        <StarRating rating={globalRating} handlePost={ratePost} />
        <span className="pl-2 text-sm s:text-base">{ratingCount}</span>
      </div>
    </div>
  );
};

export default RateBtn;
