import { combineReducers } from "redux";
// import { systemReducer } from "./system/systemReducer";
// import { userReducer } from "./user/userReducer";
import { systemReducer, SystemState } from "_store/system/SystemReducer";
import { userReducer, UserState } from "_store/user/UserReducer";
import { playerReducer, PlayerState } from "./player/PlayerReducer";

export interface State {
  system: SystemState;
  user: UserState;
  player: PlayerState;
}

export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  player: playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
