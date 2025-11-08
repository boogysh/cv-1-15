// import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";

export function useFetchFilteredLikes(url, id, statePage) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ipList, setIpList] = useState([]);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (!url || !id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);

        const data = await response.json();

        // ✅ Trouve le projet correspondant à l'ID
        const project = data.find((item) => item.project === id);

        if (project) {
          setIpList(project.ipList || []);
          // setRatingCount(project.ipList?.length || 0);
          setRatingCount(project.rateCount);
        } else {
          setIpList([]);
          setRatingCount(0);
        }
      } catch (err) {
        console.error("Erreur dans useFetchFilteredLikes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, id, statePage]);

  return { isLoading, error, ipList, ratingCount };
}

// export function UseFetch_filtered_likes(url, id, statePage) {
//   const [isLoading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [ipList, setIpList] = useState([]);
//   // const [likesQty, setlikesQty] = useState(0);
//   // const [ip, setIp] = useState("");
//   //-----------------------------------------
//   // const { storedIp } = useSelector((state) => state.cardReducer);
//   // const dispatch = useDispatch();
//   //-----------------------------------------------

//   useEffect(() => {
//     if (!url) return;
//     setLoading(true);
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         //-----------------
//         // const res = await axios.get("https://geolocation-db.com/json/");
//         // setIp(res.data.IPv4);
//         // dispatch(IP(res.data.IPv4));
//         //-------------------
//         data.filter((like) => {
//           if (like.project === id) {
//             setIpList(() => like.ipList);
//             // setlikesQty(() => like.likes);
//             // setlikesQty(() => like.ipList.length);
//           }
//            return like.ipList && like.likes;
//         });
//       } catch (err) {
//         console.log(err);
//         setError(true);
//         // err && window.location.reload();
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, [url, id, statePage]);
//   return {
//     isLoading,
//     error,
//     //likesQty,
//     ipList,
//   };
// }
