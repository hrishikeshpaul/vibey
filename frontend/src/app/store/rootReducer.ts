import { combineReducers } from "redux";
import { systemReducer } from "./system/systemReducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
