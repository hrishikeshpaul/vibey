import { combineReducers } from "redux";
import { systemReducer, SystemState } from "_store/system/SystemReducer";
import { userReducer, UserState } from "_store/user/UserReducer";
import { roomReducer, RoomState } from "_store/room/RoomReducer";

export interface State {
  system: SystemState;
  user: UserState;
  room: RoomState;
}

export const rootReducer = combineReducers({
  system: systemReducer,
  user: userReducer,
  room: roomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
