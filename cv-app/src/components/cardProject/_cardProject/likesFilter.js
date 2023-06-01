export function likesFilter(data2, id, setIpList, setLikesQty) {
  data2.filter((like) => {
    if (like.project === id) {
      setIpList(like.ipList);
      setLikesQty(like.likes);
    }
    return like.ipList && like.likes;
  });
}
