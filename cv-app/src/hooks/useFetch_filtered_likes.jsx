import { useState, useEffect } from "react";
// import axios from "axios";
// import { IP } from "./../redux/action";
// import { useDispatch } from "react-redux";

export function UseFetch_filtered_likes(url, id, statePage) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ipList, setIpList] = useState([]);
  // const [likesQty, setlikesQty] = useState(0);
  // const [ip, setIp] = useState("");
  //-----------------------------------------
  // const { storedIp } = useSelector((state) => state.cardReducer);
  // const dispatch = useDispatch();
  //-----------------------------------------------

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        //-----------------
        // const res = await axios.get("https://geolocation-db.com/json/");
        // setIp(res.data.IPv4);
        // dispatch(IP(res.data.IPv4));
        //-------------------
        data.filter((like) => {
          if (like.project === id) {
            setIpList(() => like.ipList);
            // setlikesQty(() => like.likes);
            // setlikesQty(() => like.ipList.length);
          }
          return like.pList && like.likes;
        });
      } catch (err) {
        console.log(err);
        setError(true);
        // err && window.location.reload();
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, id, statePage]);
  return {
    isLoading,
    error,
    //likesQty,
    ipList,
  };
}
