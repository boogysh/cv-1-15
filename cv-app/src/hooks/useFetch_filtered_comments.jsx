// import { useState, useMemo } from "react";
import { useState, useEffect } from "react";

export function UseFetch_filtered_comments(url, id, statePage) {
  const [isLoadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  //   const [ipList, setIpList] = useState([]);
  //   const [statePage, setStatePage] = useState(0)

  useEffect(() => {
    if (!url) return;
    setLoadingComments(true);
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const commentsList = data.filter((item) => item.project === id);
        setCommentsList(commentsList);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoadingComments(false);
      }
    }
    fetchData();
  }, [url, id, statePage]);
  return { isLoadingComments, error, commentsList };
}
