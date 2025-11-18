// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function UseFetchMessages(url, state) {
  const [data2, setData2] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData2() {
      try {
        const response = await fetch(url);
        const data2 = await response.json();

        setData2(data2);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData2();
  }, [url, state]); //url+statePage
  return { isLoading, data2, error };
}
