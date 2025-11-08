import { createStore, combineReducers } from "redux";
import langReducer from "./langReducer";
import {
  ratingReducer,
  ratingCountReducer,
  ratingAverageReducer,
  ratingAggregateReducer
} from "./ratingReducer";

const rootReducer = combineReducers({
  langReducer,
  ratingReducer,
  ratingCountReducer,
  ratingAverageReducer,
  ratingAggregateReducer
});

const store = createStore(rootReducer);

export default store;

