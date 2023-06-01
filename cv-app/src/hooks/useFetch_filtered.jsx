// import { useState, useMemo } from "react";
import { useState, useEffect } from "react";

export function UseFetch_filtered(url, id, statePage) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  //   const [ipList, setIpList] = useState([]);
  //   const [statePage, setStatePage] = useState(0)

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const filteredData = data.filter((item) => item.project === id);
        setfilteredData(filteredData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url, id, statePage]);
  return { isLoading, error, filteredData };
}
