import { fr } from "../data/lang/fr";
import { en } from "../data/lang/en";
import { ro } from "../data/lang/ro";

const includesFr = window.location.href.includes("/fr");
const includesEn = window.location.href.includes("/en");
const includesRo = window.location.href.includes("/ro");

let initialState;

const localeDetect = () => {
  if (!includesFr && !includesEn && !includesRo) {
    return (initialState = { t: fr });
  }
  if (includesFr) {
    return (initialState = { t: fr });
  }
  if (includesEn) {
    return (initialState = { t: en });
  }
  if (includesRo) {
    return (initialState = { t: ro });
  }
};
localeDetect();

// // reducer
function cardReducer(state = initialState, action) {
  switch (action.type) {
    case "FR":
      return {
        ...state,
        t: fr,
      };
    case "EN":
      return {
        ...state,
        t: en,
      };
    case "RO":
      return {
        ...state,
        t: ro,
      };

    default:
      return state;
  }
}
export default cardReducer;
