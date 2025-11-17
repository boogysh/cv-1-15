import { useEffect, useState } from "react";

export default function useSaveMyIPs(ip) {
  const [myIpList, setMyIpList] = useState([]);

  useEffect(() => {
    if (!ip) return; // si l'IP est vide, on ne fait rien

    // Récupère la liste existante depuis localStorage
    const storedIPs = JSON.parse(localStorage.getItem("myIPs")) || [];

    // Uniformise : on ne garde que des strings
    const cleanedIPs = storedIPs.map(item => (typeof item === "string" ? item : item.ip));

    // Ajoute la nouvelle IP si elle n'existe pas déjà
    if (!cleanedIPs.includes(ip)) {
      cleanedIPs.push(ip);
    }

    // Enlève les doublons
    const uniqueIPs = Array.from(new Set(cleanedIPs));

    // Sauvegarde
    localStorage.setItem("myIPs", JSON.stringify(uniqueIPs));
    setMyIpList(uniqueIPs);
  }, [ip]);

  return myIpList;
}
