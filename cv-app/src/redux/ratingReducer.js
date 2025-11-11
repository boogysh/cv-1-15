import { SET_RATING_FULL_UPDATE } from "./ratingActions";

const initialState = {
  ratingRedux: 0, // note utilisateur locale (optionnelle)
  ratings: {}, // { [projectId]: moyenne projet }
  count: {}, // { [projectId]: votes projet }
  totalAverage: 0, // moyenne globale
  totalVotes: 0, // total des votes
  lastUpdate: null, // timestamp
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATING_FULL_UPDATE: {
      const {
        ratings,
        count,
        totalAverage,
        totalVotes,
      } = action.payload;

      return {
        ...state,
        // 🔹 fusionne les moyennes de projets
        ratings: ratings ? { ...state.ratings, ...ratings } : state.ratings,

        // 🔹 fusionne le nombre de votes par projet
        count: count ? { ...state.count, ...count } : state.count,

        // 🔹 met à jour les totaux globaux
        totalAverage: totalAverage != null ? totalAverage : state.totalAverage,
        totalVotes: totalVotes != null ? totalVotes : state.totalVotes,

        lastUpdate: Date.now(),
      };
    }

    default:
      return state;
  }
};
