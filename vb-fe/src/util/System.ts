import { WebPlayer } from "core/player/Player";
import { VS } from "services/Socket";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { TokenStorageKeys } from "./Http";

/**
 * This is a pipeline to initialize the sockets, player and other async
 * modules
 */
export const initPipeline = async (): Promise<void> => {
  try {
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing sockets..." });
    const socketConnection = await VS.init();
    console.log(socketConnection);
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing player..." });
    const playerConnection = await WebPlayer.init();
    store.dispatch({ type: SystemConstants.LOADING, payload: playerConnection });
    store.dispatch({ type: SystemConstants.INITIALIZED, payload: true });
    store.dispatch({ type: SystemConstants.SUCCESS });
  } catch (err) {
    store.dispatch({ type: SystemConstants.FAILURE });
    store.dispatch({ type: SystemConstants.LOGIN, payload: false });
    store.dispatch({ type: SystemConstants.RESET });
    console.log(err);
  }
};

/**
 * On logout remove contents of local storage
 */
export const resetLocalStorage = () => {
  localStorage.removeItem(TokenStorageKeys.AT);
  localStorage.removeItem(TokenStorageKeys.RT);
  localStorage.removeItem(TokenStorageKeys.SpotifyRT);
  localStorage.removeItem(TokenStorageKeys.SpotifyAT);
  localStorage.removeItem("v-user");
};
