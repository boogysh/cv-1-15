import { createStore, combineReducers } from "redux";
import langReducer from "./langReducer";

const rootReducer = combineReducers({
  langReducer,
});

const store = createStore(rootReducer);

export default store;