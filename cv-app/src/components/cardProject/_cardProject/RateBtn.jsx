import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { useFetchFilteredLikes } from "../../../hooks/useFetch_filtered_likes";
import { aggregateRange } from "../../../utils/aggregateRange";
// import { setRatingAction } from "../../../redux/ratingActions";
import {
  setRatingAction,
  setRatingCountAction,
  setRatingAverageAction,
  setRatingAggregateAction,
} from "../../../redux/ratingActions";

const RateBtn = ({ id, ip, myIpList, statePage, setStatePage }) => {
  const dispatch = useDispatch();
  const globalRating = useSelector((state) => state.ratingReducer.ratings[id]);

  const [rating, setRating] = useState(globalRating || 0);

  const { ipList, ratingCount } = useFetchFilteredLikes(
    `${process.env.REACT_APP_URL}/api/ratings`,
    id,
    statePage
  );

  // 1️⃣ Extraire tous les ratings
  const ratingsArray = ipList.map((item) => item.rating);
  // 2️⃣ Calculer la somme des ratings
  const sum = ratingsArray.reduce((acc, val) => acc + val, 0);
  // 3️⃣ Calcul de la moyenne arrondie à une décimale
  const averageRating =
    ratingsArray.length > 0
      ? Number((sum / ratingsArray.length).toFixed(1))
      : 0; // console.log("Moyenne:", averageRating); // 4

  // Calculer moyenne et total
  const { average, count } = aggregateRange(ratingsArray);

  useEffect(() => {
    if (!ipList || !ip) return;
    const currentUser = ipList.find((item) => item.ip === ip);
    if (currentUser) {
      setRating(currentUser.rating);
      dispatch(setRatingAction(id, currentUser.rating));
      dispatch(setRatingCountAction(id, ratingCount)); //global acces
      // console.log("📤 Dispatch de la moyenne:", averageRating);
      dispatch(setRatingAverageAction(id, averageRating)); //global acces
      dispatch(setRatingAggregateAction(id, average, count));
    }
  }, [ipList, ip, id, dispatch, ratingCount, averageRating, average, count]);

  const ratePost = (selectedValue) => {
    if (!ip || !id || !myIpList) return;

    const rateToPost = {
      project: id,
      ip,
      rating: selectedValue,
      allMyIPs: myIpList,
    };

    fetch("https://cv-back-25.vercel.app/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rateToPost),
    })
      .then(() => {
        setStatePage((prev) => prev + 1);
        setRating(selectedValue);
        dispatch(setRatingAction(id, selectedValue)); // 🟢 MAJ store Redux
        dispatch(setRatingAverageAction(id, averageRating)); //MAJ store Redux
        dispatch(setRatingAggregateAction(id, average, count));
      })
      .catch((err) => console.error("Erreur en postant la note :", err));
  };

  return (
    <div className="w-auto-h-auto">
      <div className="flex items-center px-4 w-auto h-auto mr-auto ">
        <StarRating
          rating={rating}
          setRating={setRating}
          handlePost={ratePost}
        />
        <span className="pl-2 text-sm s:text-base">{ratingCount}</span>
      </div>
    </div>
  );
};

export default RateBtn;


