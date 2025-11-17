// redux/reducer.js

import { SET_RATING_FULL_UPDATE, SET_PROJECT_DATA_FULL_UPDATE } from "./actions";

const initialState = {
  // 🔹 Ratings
  ratingRedux: 0, // note utilisateur locale
  ratings: {},    // { [projectId]: moyenne projet }
  count: {},      // { [projectId]: votes projet }
  totalAverage: 0, // moyenne globale
  totalVotes: 0,   // total des votes

  // 🔹 Projects
  projects: {},         // tous les projets stockés
  currentProjectId: null, // projet courant

  lastUpdate: null, // timestamp général pour suivi
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING_FULL_UPDATE: {
      const { projectId, average, count, ratings, totalAverage, totalVotes, ratingRedux } = action.payload;

      let nextRatings = state.ratings;
      let nextCount = state.count;

      // 🔹 Mise à jour pour un projet spécifique
      if (projectId != null) {
        nextRatings = { ...state.ratings, [projectId]: average ?? state.ratings[projectId] };
        nextCount = { ...state.count, [projectId]: count ?? state.count[projectId] };
      } 
      // 🔹 Mise à jour globale si ratings fourni
      else if (ratings) {
        nextRatings = { ...state.ratings, ...ratings };
      }

      return {
        ...state,
        ratings: nextRatings,
        count: nextCount,
        totalAverage: totalAverage ?? state.totalAverage,
        totalVotes: totalVotes ?? state.totalVotes,
        ratingRedux: ratingRedux ?? state.ratingRedux,
        lastUpdate: Date.now(),
      };
    }

    case SET_PROJECT_DATA_FULL_UPDATE: {
      const { projects, currentProjectId } = action.payload;
      return {
        ...state,
        projects: { ...state.projects, ...projects },
        currentProjectId: currentProjectId ?? state.currentProjectId,
        lastUpdate: Date.now(),
      };
    }

    default:
      return state;
  }
};
