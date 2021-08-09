import { combineReducers } from "redux";
import { systemReducer, SystemState } from "_store/system/SystemReducer";
import { userReducer, UserState } from "_store/user/UserReducer";

export interface State {
  system: SystemState;
  user: UserState;
}

export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
