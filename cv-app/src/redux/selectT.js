import { createSelector } from "@reduxjs/toolkit";
import { fr } from "../data/lang/fr";
import { en } from "../data/lang/en";
import { ro } from "../data/lang/ro";

const langs = { fr, en, ro };

// Renvoie les traductions pour la langue active avec memoisation
export const selectT = createSelector(
  (state) => state.langReducer.lang, // primitive (string)
  (lang) => langs[lang]              // renvoie fr / en / ro (objet)
);