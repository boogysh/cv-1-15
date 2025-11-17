import { fr } from "../data/lang/fr";
import { en } from "../data/lang/en";
import { ro } from "../data/lang/ro";

// 🔹 Liste des langues disponibles
const LANGUAGES = { fr, en, ro };

// 🔹 Fonction pour détecter la langue depuis l'URL
const detectLocaleFromUrl = () => {
  const path = window.location.pathname.toLowerCase();
  
  if (path.startsWith("/fr")) return "fr";
  if (path.startsWith("/en")) return "en";
  if (path.startsWith("/ro")) return "ro";
  
  // Valeur par défaut
  return "fr";
};

// 🔹 Initial state basé sur la langue détectée
const initialLocale = detectLocaleFromUrl();
const initialState = { t: LANGUAGES[initialLocale], locale: initialLocale };

// 🔹 Reducer
function langReducer(state = initialState, action) {
  switch (action.type) {
    case "FR":
      return { ...state, t: fr, locale: "fr" };
    case "EN":
      return { ...state, t: en, locale: "en" };
    case "RO":
      return { ...state, t: ro, locale: "ro" };
    default:
      return state;
  }
}

export default langReducer;
