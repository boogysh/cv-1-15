import { createStore, combineReducers } from "redux";
import langReducer from "./langReducer";
import { ratingReducer } from "./ratingReducer";

const rootReducer = combineReducers({
  langReducer,
  ratingReducer,
  // ratingCountReducer,
  // ratingAverageReducer,
  // ratingAggregateReducer
});

const store = createStore(rootReducer);

export default store;
