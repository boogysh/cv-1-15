import { useDispatch } from "react-redux";
import StarRating from "./StarRating";
import { useFetchRatings } from "../../../hooks/useFetchRatings";
import { setRatingFullUpdate } from "../../../redux/ratingActions";

const RateBtn = ({ id, ip, myIpList, statePage, setStatePage }) => {
  const dispatch = useDispatch();

  // 🔹 Récupération des votes depuis l’API (local + global)
  const { ratingRedux, count } = useFetchRatings(
    "https://cv-back-25.vercel.app/api/ratings",
    id,
    ip,         // 🔹 IP de l'utilisateur
    statePage
  );

  // 🔹 Mise à jour de la note dans les commentaires associés
  const updateCommentRating = async (selectedValue) => {
    try {
      await fetch(
        "https://cv-back-25.vercel.app/api/comments/update-rating",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project: id,
            ip,
            rating: selectedValue,
          }),
        }
      );
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour du rating du commentaire :",
        err
      );
    }
  };

  // 🔹 Poster une nouvelle note
  const ratePost = async (selectedValue) => {
    if (!ip || !id || !myIpList) return;

    try {
      // POST sur l'API pour ajouter ou mettre à jour le vote
      await fetch("https://cv-back-25.vercel.app/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: id,
          ip,
          rating: selectedValue,
          allMyIPs: myIpList,
        }),
      });

      // Mise à jour de la note dans les commentaires associés
      await updateCommentRating(selectedValue);

      // 🔹 Mise à jour immédiate de Redux pour refléter la nouvelle note
      dispatch(
        setRatingFullUpdate({
          ratingRedux: selectedValue,
        })
      );

      // 🔹 Forcer un re-fetch si nécessaire (statePage utilisé pour trigger useEffect)
      setStatePage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-auto h-auto">
      <div className="flex items-center px-4 w-auto h-auto mr-auto">
        {/* ⭐️ Affichage des étoiles selon ratingRedux */}
        <StarRating rating={ratingRedux} handlePost={ratePost} />
        <span className="pl-2 text-sm s:text-base">{count}</span>
      </div>
    </div>
  );
};

export default RateBtn;
