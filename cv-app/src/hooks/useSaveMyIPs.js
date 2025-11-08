import { useEffect, useState } from "react";

export default function useSaveMyIPs(ip) {
  const [myIpList, setMyIpList] = useState([]);

  useEffect(() => {
    if (!ip) return; // si l'IP est vide, on ne fait rien

    const existingIPs = JSON.parse(localStorage.getItem("myIPs")) || [];

    // si la nouvelle IP n’est pas déjà enregistrée
    if (!existingIPs.includes(ip)) {
      const updatedIPs = [...existingIPs, ip];
      localStorage.setItem("myIPs", JSON.stringify(updatedIPs));
      setMyIpList(updatedIPs);
    } else {
      setMyIpList(existingIPs);
    }
  }, [ip]);

  return myIpList;
  
}


// my first version

// useEffect(() => {
  //   const myIPs = [];
  //   const dynamic_IP = ip;
  //   const get_IPs = JSON.parse(localStorage.getItem("myIPs"));
  //   if (!get_IPs) {
  //     return localStorage.setItem("myIPs", JSON.stringify(myIPs));
  //   } else if (!get_IPs.includes(dynamic_IP)) {
  //     myIPs.push(get_IPs);
  //     dynamic_IP !== "" && myIPs.push(dynamic_IP);
  //     return (
  //       myIPs && localStorage.setItem("myIPs", JSON.stringify(myIPs.flat()))
  //     );
  //   }
  //   setMyIpList(JSON.parse(localStorage.getItem("myIPs")));
  // }, [ip]);

