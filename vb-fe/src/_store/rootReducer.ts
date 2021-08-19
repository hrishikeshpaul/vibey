import { combineReducers, Reducer, CombinedState } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import { systemReducer, SystemState } from "_store/system/SystemReducer";
import { userReducer, UserState } from "_store/user/UserReducer";
import { roomReducer, RoomState } from "_store/room/RoomReducer";
import { playerReducer, PlayerState } from "_store/player/PlayerReducer";

export interface State {
  system: SystemState;
  user: UserState;
  room: RoomState;
  player: PlayerState;
  router: RouterState<unknown>;
}

export const rootReducer = (history: History): Reducer<CombinedState<State>> =>
  combineReducers({
    system: systemReducer,
    user: userReducer,
    room: roomReducer,
    player: playerReducer,
    router: connectRouter(history),
  });

export type RootState = ReturnType<typeof rootReducer>;
