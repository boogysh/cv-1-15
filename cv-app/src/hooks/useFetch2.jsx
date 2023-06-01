// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function UseFetch2(url, state) {
// export function UseFetch2(url) {
  const [data2, setData2] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // const { id } = useParams();

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData2() {
      try {
        const response = await fetch(url);
        const data2 = await response.json();

        setData2(data2) 
        // || data.find((product) => product.id === id && setData(product));
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData2();
    // }, [url, id]);
  }, [url, state]);
  // }, [url, data2]);
  return { isLoading, data2, error };
}
