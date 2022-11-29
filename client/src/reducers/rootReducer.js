import currentAUthReducer from "./candidateList";
import { combineReducers } from "redux";

//Combine all the sub reducers
const rootReducer = combineReducers({
  currentAuth: currentAUthReducer,
});

export default rootReducer;
