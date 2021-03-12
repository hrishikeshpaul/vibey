import { combineReducers } from "redux";
import { sessionReducer } from "./sessions/sessionReducer";

export const rootReducer = combineReducers({
  session: sessionReducer,
});
