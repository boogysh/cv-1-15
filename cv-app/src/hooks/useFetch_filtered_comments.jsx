import { useState, useEffect, useMemo } from "react";

/**
 * Hook pour récupérer les commentaires filtrés par projectId.
 * Limite les rerenders inutiles et permet un fetch global optimisé.
 *
 * @param {string} url - endpoint API pour les commentaires
 * @param {string} id - projectId courant
 * @param {number} statePage - trigger pour re-fetch (ex: après ajout d'un commentaire)
 */
export function UseFetch_filtered_comments(url, id, statePage) {
  const [isLoadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(false);
  const [commentsData, setCommentsData] = useState([]); // stocke tous les commentaires reçus

  useEffect(() => {
    if (!url) return;

    let mounted = true; // pour éviter update après un unmount
    setLoadingComments(true);

    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();

        if (!mounted) return;

        // 🔹 on ne met à jour que si les données ont vraiment changé
        setCommentsData(prev => {
          const isEqual = JSON.stringify(prev) === JSON.stringify(data);
          return isEqual ? prev : data;
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoadingComments(false);
      }
    }

    fetchData();

    return () => { mounted = false };
  }, [url, statePage]);

  // 🔹 Filtrage par projectId avec useMemo pour limiter les rerenders
  const commentsList = useMemo(() => {
    return commentsData?.filter(item => item.project === id) || [];
  }, [commentsData, id]);

  return { isLoadingComments, error, commentsList };
}





// // import { useState, useMemo } from "react";
// import { useState, useEffect } from "react";

// export function UseFetch_filtered_comments(url, id, statePage) {
//   const [isLoadingComments, setLoadingComments] = useState(true);
//   const [error, setError] = useState(false);
//   const [commentsList, setCommentsList] = useState([]);
//   //   const [ipList, setIpList] = useState([]);
//   //   const [statePage, setStatePage] = useState(0)

//   useEffect(() => {
//     if (!url) return;
//     setLoadingComments(true);
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const commentsList = data?.filter((item) => item.project === id);
//         setCommentsList(commentsList);
//       } catch (err) {
//         console.log(err);
//         setError(true);
//       } finally {
//         setLoadingComments(false);
//       }
//     }
//     fetchData();
//   }, [url, id, statePage]);
//   return { isLoadingComments, error, commentsList };
// }
