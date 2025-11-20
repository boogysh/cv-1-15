import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { setProjectData } from "../../../redux/projectActions";
import formatProjectsForRedux from "../../../utils/helperRedux";

const RateBtn = ({ id }) => {
  const dispatch = useDispatch();
  const { ratingsCount, ip, userRatingsByIp } = useSelector(
    (state) => state.projectReducer || {}
  );

  // Valeur initiale venant de Redux
  // const initialRating = userRatingsByIp[id] || 0;
  const initialRating = userRatingsByIp[id];
  const [selectedValue, setSelectedValue] = useState(initialRating);

  // 🔹 Synchronisation si Redux change
  useEffect(() => {
    const newRating = userRatingsByIp[id] || 0;
    if (newRating !== selectedValue) {
      setSelectedValue(newRating);
    }
    // }, [userRatingsByIp, id, selectedValue]);          //version correcte j'ai commenté que cette ligne
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRatingsByIp, id]);

  const ratePost = async (value) => {
    if (!ip || !id) return;

    setSelectedValue(value);

    try {
      // 1️⃣ PATCH pour la note globale (existante)
      // const res = await fetch("http://localhost:4000/api/projects/rate", {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/projects/rate`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ project: id, ip, rating: value }),
        }
      );
      if (!res.ok) throw new Error("Erreur PATCH /rate");

      // 2️⃣ Re-fetch projets pour mettre à jour Redux
      // const projectRes = await fetch("http://localhost:4000/api/projects");
      const projectRes = await fetch(
        `${process.env.REACT_APP_API_URL}/projects`
      );
      if (!projectRes.ok) throw new Error("Erreur fetch projets après vote");
      const projectData = await projectRes.json();
      const projectsArray = Array.isArray(projectData)
        ? projectData
        : projectData.projects || [];

      const reduxPayload = formatProjectsForRedux(projectsArray, ip);

      // 3️⃣ PATCH pour tous les commentaires de cette IP
      const commentsToUpdate = reduxPayload.comments[id]
        .filter((c) => c.ip === ip)
        .map((c) => ({ _id: c._id, rating: value }));

      if (commentsToUpdate.length > 0) {
        // await fetch(`http://localhost:4000/api/projects/comments/rate`, {
        await fetch(`${process.env.REACT_APP_API_URL}/projects/comments/rate`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ projectId: id, comments: commentsToUpdate }),
          body: JSON.stringify({ project: id, ip, rating: value }),
        });
      }

      // 4️⃣ Mise à jour Redux
      const updatedComments = { ...reduxPayload.comments };
      Object.keys(updatedComments).forEach((pid) => {
        updatedComments[pid] = updatedComments[pid].map((c) =>
          c.ip === ip ? { ...c, rating: value } : c
        );
      });

      // const allRatings = updatedComments[id].map((c) => c.rating);
      // const newAverage = allRatings.length
      //   ? +(allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(
      //       2
      //     )
      //   : 0;

      dispatch(
        setProjectData({
          ...reduxPayload,
          comments: updatedComments,
          // ratings: { ...reduxPayload.ratings, [id]: newAverage },
          // ratingsCount: { ...reduxPayload.ratingsCount, [id]: updatedComments[id].length },
          userRatingsByIp: { ...reduxPayload.userRatingsByIp, [id]: value },
          ratingRedux: value,
        })
      );
    } catch (err) {
      console.error("Erreur ratePost :", err);
    }
  };

  return (
    <div className="w-auto h-auto">
      <div className="flex items-center px-4 w-auto h-auto mr-auto">
        <StarRating rating={selectedValue} handlePost={ratePost} />
        <span className="pl-2 text-sm s:text-base">
          {ratingsCount?.[id] || 0}
        </span>
      </div>
    </div>
  );
};

export default RateBtn;
