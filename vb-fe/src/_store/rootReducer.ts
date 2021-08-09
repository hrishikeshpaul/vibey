import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { systemReducer, SystemState } from "_store/system/SystemReducer";
import { userReducer, UserState } from "_store/user/UserReducer";
import { roomReducer, RoomState } from "_store/room/RoomReducer";

export interface State {
  system: SystemState;
  user: UserState;
  room: RoomState;
}

export const rootReducer = (history: any) =>
  combineReducers({
    system: systemReducer,
    user: userReducer,
    room: roomReducer,
    router: connectRouter(history),
  });

export type RootState = ReturnType<typeof rootReducer>;
