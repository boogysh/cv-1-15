import { fr } from "../data/lang/fr";
import { en } from "../data/lang/en";
import { ro } from "../data/lang/ro";

const includesFr = window.location.href.includes("/fr");
const includesEn = window.location.href.includes("/en");
const includesRo = window.location.href.includes("/ro");

const defaultLang = includesEn ? "en" : includesRo ? "ro" : "fr";

const initialState = {
  lang: defaultLang,
};

// reducer
function langReducer(state = initialState, action) {
  switch (action.type) {
    case "FR":
      return { ...state, lang: "fr" };
    case "EN":
      return { ...state, lang: "en" };
    case "RO":
      return { ...state, lang: "ro" };
    default:
      return state;
  }
}

export default langReducer;

