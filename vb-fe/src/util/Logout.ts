import { WebPlayer } from "core/player/Player";
import { PlayerConstants } from "_store/player/PlayerTypes";
import { RoomConstants } from "_store/room/RoomTypes";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { UserConstants } from "_store/user/UserTypes";
import { resetLocalStorage } from "util/System";
import { VS } from "services/Socket";

export const resetApp = (): void => {
  WebPlayer.getPlayer().disconnect();
  VS.disconnect();
  resetLocalStorage();
  store.dispatch({ type: SystemConstants.RESET });
  store.dispatch({ type: UserConstants.RESET });
  store.dispatch({ type: RoomConstants.RESET });
  store.dispatch({ type: PlayerConstants.RESET });
};
