import { createStore, combineReducers } from "redux";
import langReducer from "./langReducer";
import { projectReducer } from "./projectReducer";

const rootReducer = combineReducers({
  langReducer,
  projectReducer,
});

const store = createStore(rootReducer);

export default store;
