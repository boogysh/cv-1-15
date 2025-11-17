import { SET_PROJECT_DATA, SET_USER_IP } from "./projectActions";

const initialState = {
  projects: {},          // Objet contenant tous les projets indexés par projectId
  ratings: {},           // Note moyenne par projet { [projectId]: number }
  ratingsCount: {},      // Nombre de votes par projet { [projectId]: number }
  comments: {},          // Commentaires par projet { [projectId]: [commentObj, ...] }
  commentsCount: {},     // Nombre de commentaires par projet { [projectId]: number }
  likes: {},             // Liste des IPs ayant liké chaque projet { [projectId]: [ip1, ip2, ...] }
  likesCount: {},        // Nombre de likes par projet { [projectId]: number }
  totalAverage: 0,       // Moyenne globale de tous les projets
  totalVotes: 0,         // Nombre total de votes sur tous les projets
  userRatingsByIp: {},   // Note donnée par l’utilisateur pour chaque projet { [projectId]: number }
  ip: null,              // IP actuelle de l’utilisateur
  // myIpList: [],          // Liste des IPs de l’utilisateur pour suivi des votes/likes
  ratingRedux: 0,        // Note temporaire pour le commentaire en cours (nouveau)
  lastUpdate: null,      // Timestamp de la dernière mise à jour du store
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_DATA:
      return { ...state, ...action.payload };

    case SET_USER_IP:
      if (action.payload === state.ip) return state;
      return { ...state, ip: action.payload };

    default:
      return state;
  }
};
