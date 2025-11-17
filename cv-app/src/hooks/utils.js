/**
 * Extrait toutes les notes numériques depuis un tableau de ratings.
 * Chaque rating est sous la forme { ip, rating }.
 */
export const extractRatings = (ratingsArray = []) => {
  if (!Array.isArray(ratingsArray)) return [];
  return ratingsArray
    .map(r => (typeof r?.rating === "number" ? r.rating : null))
    .filter(r => r !== null);
};

/** Calcule la moyenne d’un tableau numérique */
export const calculateAverage = (numbers = []) =>
  numbers.length
    ? +(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1)
    : 0;

/**
 * Retourne la note de l’utilisateur en fonction de son IP.
 * @param {Array} ratingsArray - [{ ip, rating }]
 * @param {string} userIp
 */
export const getUserRatingByIp = (ratingsArray = [], userIp) => {
  if (!userIp || !Array.isArray(ratingsArray)) return undefined;
  const userObj = ratingsArray.find(r => r.ip === userIp);
  return userObj ? userObj.rating : undefined;
};

/**
 * Extrait la liste des IPs ayant liké le projet.
 * @param {Array} likesArray - tableau d'IPs (strings)
 */
export const extractLikes = (likesArray = []) => {
  if (!Array.isArray(likesArray)) return [];
  return likesArray
    .map(ip => (typeof ip === "string" ? ip.trim() : null))
    .filter(ip => ip && ip !== "");
};

/**
 * Extrait la liste des commentaires valides.
 * @param {Array} commentsArray - [{ firstName, lastName, commentTxt }]
 */
export const extractComments = (commentsArray = []) => {
  if (!Array.isArray(commentsArray)) return [];
  return commentsArray.filter(
    c => typeof c?.commentTxt === "string" && c.commentTxt.trim() !== ""
  );
};
