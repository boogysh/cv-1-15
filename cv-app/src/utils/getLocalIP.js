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
  const providers = [
    // 1️⃣ ipify : le plus rapide
    async () => {
      const res = await axios.get("https://api.ipify.org?format=json");
      return res?.data?.ip || null;
    },

    // 2️⃣  ident.me IPv4 : dernier recours
    //
    async () => {
      const res = await axios.get("https://v4.ident.me");
      return res?.data?.trim() || null;
    },
    // 3️⃣ geolocation-db : renvoie IPv4
    async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      return res?.data?.IPv4 || null;
    },
  ];

  for (const provider of providers) {
    try {
      const ip = await provider();
      if (ip) return ip;
    } catch (err) {
      console.error("Erreur provider IP :", err);
    }
  }

  return null;
}
