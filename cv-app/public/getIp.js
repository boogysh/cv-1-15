window.__USER_IP__ = null;

(async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    window.__USER_IP__ = data.ip || null;
  } catch (e) {
    window.__USER_IP__ = null;
  }
})();
