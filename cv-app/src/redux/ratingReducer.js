// src/redux/ratingReducer.js
import {
  SET_RATING,
  RESET_RATING,
  SET_RATING_COUNT,
  RESET_RATING_COUNT,
  SET_RATING_AVERAGE,
  RESET_RATING_AVERAGE,
  SET_RATING_AGGREGATE,
  RESET_RATING_AGGREGATE,
} from "./ratingActions";

const ratingState = {
  ratings: {}, // { [projectId]: ratingValue }
};

export const ratingReducer = (state = ratingState, action) => {
  switch (action.type) {
    case SET_RATING:
      return {
        ...state,
        ratings: {
          ...state.ratings,
          [action.payload.projectId]: action.payload.rating,
        },
      };

    case RESET_RATING:
      return ratingState;

    default:
      return state;
  }
};

// export default ratingReducer;

// src/redux/ratingCountReducer.js

const ratingCountState = {
  ratingCounts: {}, // { [projectId]: rateCount }
};

export const ratingCountReducer = (state = ratingCountState, action) => {
  switch (action.type) {
    case SET_RATING_COUNT:
      return {
        ...state,
        ratingCounts: {
          ...state.ratingCounts,
          [action.payload.projectId]: action.payload.rateCount,
        },
      };

    case RESET_RATING_COUNT:
      return ratingCountState;

    default:
      return state;
  }
};

//------------------------------------------------
const ratingAverageState = {
  ratingAverages: {}, // { [projectId]: rateAverage }
};

export const ratingAverageReducer = (state = ratingAverageState, action) => {
  switch (action.type) {
    case SET_RATING_AVERAGE:
      return {
        ...state,
        ratingAverages: {
          ...state.ratingAverages,
          // [action.payload.projectId]: action.payload.ratingAverage,
          [action.payload.projectId]: action.payload.averageRating,
        },
      };

    case RESET_RATING_AVERAGE:
      return ratingAverageState;

    default:
      return state;
  }
};

// src/redux/ratingAggregateReducer.js

// const initialAgregateState = {
//   aggregates: {}, // { [projectId]: { average, count } }
// };

const initialAgregateState = {
  aggregates: {},   // { [projectId]: { average, count } }
  lastUpdate: null, // 🕒 sert à détecter les changements globaux
};

export const ratingAggregateReducer = (state = initialAgregateState, action) => {
  switch (action.type) {
    case SET_RATING_AGGREGATE:
      return {
        ...state,
        aggregates: {
          ...state.aggregates,
          [action.payload.projectId]: {
            average: action.payload.average,
            count: action.payload.count,
          },
        },
        lastUpdate: Date.now(), // 🟢 on met à jour ici à chaque vote
      };

    case RESET_RATING_AGGREGATE:
      return initialAgregateState;

    default:
      return state;
  }
};
// export default ratingCountReducer;
