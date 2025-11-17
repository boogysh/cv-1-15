import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProjectData } from "../redux/projectActions";
import {
  calculateAverage,
  extractRatings,
  getUserRatingByIp,
  extractComments,
  extractLikes,
} from "./utils";
import { fetchIp } from "../utils/getLocalIP";
import axios from "axios";

export const useFetchProjectData = (url) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [ip, setIp] = useState(null); // 🔹 ip en state pour déclencher fetch

  // 🔹 Récupération de l'IP au montage
  useEffect(() => {
    fetchIp(axios).then((result) => {
      setIp(result);
      console.log("ip", result);
    });
  }, []);

  // 🔹 Fetch des projets dès que l'URL et l'IP sont disponibles
  useEffect(() => {
    if (!url || !ip) return; // ⚡ attendre IP avant fetch
    // if (!url) return; // ⚡ attendre IP avant fetch
    let mounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("❌ Fetch failed");
        const data = await res.json();
        const projectsArray = Array.isArray(data) ? data : data.projects || [];

        if (!mounted) return;

        const projects = {};
        const ratings = {};
        const ratingsCount = {};
        const comments = {};
        const commentsCount = {};
        const likes = {};
        const likesCount = {};
        const userRatingsByIp = {};

        let totalVotes = 0;
        let totalSum = 0;

        projectsArray.forEach((proj) => {
          const pid = proj._id || proj.project;
          projects[pid] = proj; // pas de spread pour éviter nouveau ref

          // Ratings
          const ratingNumbers = extractRatings(proj.ratings || []);
          ratings[pid] = calculateAverage(ratingNumbers);
          ratingsCount[pid] = ratingNumbers.length;
          totalVotes += ratingNumbers.length;
          totalSum += ratingNumbers.reduce((a, b) => a + b, 0);

          // Note de l'utilisateur
          const userRating = getUserRatingByIp(proj.ratings || [], ip);
          if (userRating !== undefined) userRatingsByIp[pid] = userRating;

          // Comments
          const projectComments = extractComments(proj.comments || []);
          comments[pid] = projectComments;
          commentsCount[pid] = projectComments.length;

          // Likes
          const projectLikes = extractLikes(proj.likes || []);
          likes[pid] = projectLikes;
          likesCount[pid] = projectLikes.length;
        });

        const totalAverage = totalVotes
          ? +(totalSum / totalVotes).toFixed(2)
          : 0;

        dispatch(
          setProjectData({
            projects,
            ratings,
            ratingsCount,
            comments,
            commentsCount,
            likes,
            likesCount,
            totalAverage,
            totalVotes,
            userRatingsByIp,
            ip,
            lastUpdate: Date.now(),
          })
        );
      } catch (err) {
        console.error("Erreur fetch project data:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url, ip, dispatch]);

  return { isLoading };
};
