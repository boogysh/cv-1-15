// utils/getLocalIP.js
export async function getLocalIP() {
  return new Promise((resolve, reject) => {
    const ips = [];
    const rtc = new RTCPeerConnection({ iceServers: [] });

    // Crée un canal de données vide
    rtc.createDataChannel("");

    rtc
      .createOffer()
      .then((offer) => rtc.setLocalDescription(offer))
      .catch(reject);

    rtc.onicecandidate = (event) => {
      if (!event || !event.candidate) {
        resolve(ips);
        return;
      }
      const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(
        event.candidate.candidate
      );
      if (ipMatch && !ips.includes(ipMatch[1])) ips.push(ipMatch[1]);
    };
  });
}

export async function fetchIp(axios) {
  try {
    const res = await axios.get("https://api.ipify.org?format=json");
    if (res?.data?.ip) {
      // console.log("ip+++++++", res.data.ip);
      return res.data.ip; // ✅ "data" et non "date"
    }
    return null;
  } catch (err) {
    console.error("Erreur récupération IP:", err);
    return null;
  }
}
