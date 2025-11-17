import {
  extractRatings,
  calculateAverage,
  getUserRatingByIp,
  extractComments,
  extractLikes,
} from "../hooks/utils";

export default function formatProjectsForRedux(projectsArray = [], ip = null, myIpList = []) {
  const projects = {};
  const ratings = {};
  const ratingsCount = {};
  const comments = {};
  const commentsCount = {};
  const likes = {};
  const likesCount = {};
  const userRatingsByIp = {};

  let totalVotes = 0;
  let totalSum = 0;

  projectsArray.forEach((proj) => {
    const pid = proj._id || proj.project;
    projects[pid] = { ...proj };

    // ⭐ Ratings
    const ratingNumbers = extractRatings(proj.ratings || []);
    ratings[pid] = calculateAverage(ratingNumbers);
    ratingsCount[pid] = ratingNumbers.length;
    totalVotes += ratingNumbers.length;
    totalSum += ratingNumbers.reduce((a, b) => a + b, 0);

    // ⭐ User rating
    const userRating = getUserRatingByIp(proj.ratings || [], ip);
    if (userRating !== undefined) userRatingsByIp[pid] = userRating;

    // ⭐ Comments
    const projectComments = extractComments(proj.comments || []);
    comments[pid] = projectComments;
    commentsCount[pid] = projectComments.length;

    // ⭐ Likes
    const projectLikes = extractLikes(proj.likes || []);
    likes[pid] = projectLikes;
    likesCount[pid] = projectLikes.length;
  });

  const totalAverage = totalVotes ? +(totalSum / totalVotes).toFixed(2) : 0;

  return {
    projects,
    ratings,
    ratingsCount,
    comments,
    commentsCount,
    likes,
    likesCount,
    userRatingsByIp,
    totalAverage,
    totalVotes,
    ip,
    myIpList,
    lastUpdate: Date.now(),
  };
}
