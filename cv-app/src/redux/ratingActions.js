// --- TYPES D’ACTION ---
export const SET_RATING = "SET_RATING";
export const RESET_RATING = "RESET_RATING";

// --- ACTIONS ---
export const setRatingAction = (projectId, rating) => ({
  type: SET_RATING,
  payload: { projectId, rating },
});

export const resetRatingAction = () => ({
  type: RESET_RATING,
});
//-------------------------------------------------
// --- TYPES D’ACTION ---
export const SET_RATING_COUNT = "SET_RATING_COUNT";
export const RESET_RATING_COUNT = "RESET_RATING_COUNT";

// --- ACTIONS ---
export const setRatingCountAction = (projectId, rateCount) => ({
  type: SET_RATING_COUNT,
  payload: { projectId, rateCount },
});

export const resetRatingCountAction = () => ({
  type: RESET_RATING_COUNT,
});

// --- TYPES D’ACTION ---
export const SET_RATING_AVERAGE = "SET_RATING_AVERAGE";
export const RESET_RATING_AVERAGE = "RESET_RATING_AVERAGE";

// --- ACTIONS ---
export const setRatingAverageAction = (projectId, averageRating) => ({
  type: SET_RATING_AVERAGE,
  payload: { projectId, averageRating },
});

export const resetRatingAverageAction = () => ({
  type: RESET_RATING_AVERAGE,
});

// src/redux/ratingAggregateActions.js
export const SET_RATING_AGGREGATE = "SET_RATING_AGGREGATE";
export const RESET_RATING_AGGREGATE = "RESET_RATING_AGGREGATE";

export const setRatingAggregateAction = (projectId, average, count) => ({
  type: SET_RATING_AGGREGATE,
  payload: { projectId, average, count },
});

export const resetRatingAggregateAction = () => ({
  type: RESET_RATING_AGGREGATE,
});




