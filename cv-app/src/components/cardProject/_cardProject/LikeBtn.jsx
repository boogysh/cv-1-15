import { useState, useMemo } from "react";
import Loader2 from "../../loader/Loader2";
import like from "../../../assets/like.png";
import like2 from "../../../assets/like3.png";
// import StarSparkle from "./StarSparkle";
import { useSelector, useDispatch } from "react-redux";
import { setProjectData } from "../../../redux/projectActions";

const LikeBtn = ({ ip, id }) => {
  const dispatch = useDispatch();
  // const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { likes } = useSelector((state) => state.projectReducer || {});

  // Liste des IPs ayant liké ce projet
  const ipList = useMemo(() => likes[id] || [], [likes, id]);

  // Détecte si l'utilisateur a déjà liké
  const liked = useMemo(() => ip && ipList.includes(ip), [ip, ipList]);

  const handleLikeClick = async () => {
    if (!ip || !id) return;

    // setAnimate(true);
    // setTimeout(() => setAnimate(false), 1500);

    setLoading(true);
    try {
      // Toggle like/dislike sur le backend
      // const res = await fetch("http://localhost:4000/api/projects/like", {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/projects/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project: id, ip }),
        }
      );

      if (!res.ok) throw new Error("Erreur lors de la mise à jour du like");

      const { project } = await res.json();

      // Met à jour Redux avec le tableau des likes mis à jour
      dispatch(
        setProjectData({
          likes: {
            ...likes,
            [id]: project.likes,
          },
        })
      );
    } catch (err) {
      console.error("Erreur LikeBtn :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center relative">
      <button onClick={handleLikeClick} className="btn-icon hover:border-transparent hover:bg-transparent ml-0 relative hover:scale-125 transition-all ease-in-out">
        {loading ? (
          <Loader2 />
        ) : (
          <img
            src={liked ? like2 : like}
            className="w-5 h-5 s:w-[22px] s:h-[22px] pop-like transition-transform duration-150"
            alt="like"
          />
        )}
        {/* {animate && (
          <StarSparkle
            color={"sparkle-like"}
            sparkExplodeZone={"spark-explode-zone-like"}
          />
        )} */}
      </button>
      <span className="pl-1 text-sm s:text-base">{ipList.length}</span>
    </div>
  );
};

export default LikeBtn;
