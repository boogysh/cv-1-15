// import { useEffect, useState } from "react";

// export default function useGetUserRating(ipList, ip) {
//   const [rating, setRating] = useState(0);

//   // ⚡ On récupère la note de l’utilisateur dès le chargement
//   useEffect(() => {
//     if (!ipList || !ip) return;

//     // Cherche le RATING avec l'IP actuelle, le projet est deja filtré par useFetch
//     const currentUser = ipList.find((item) => item.ip === ip);

//     if (currentUser) {
//       setRating(currentUser.rating); // note déjà donnée
//     }
//   }, [ipList, ip]);
//   return rating;
//}
