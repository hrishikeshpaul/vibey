import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { VS } from "services/Socket";
import { TokenStorageKeys, initHttp } from "util/Http";
import { resetApp } from "./Logout";

/**
 * This is a pipeline to initialize the sockets, player and other async
 * modules
 */
export const initPipeline = async (): Promise<void> => {
  try {
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing connections..." });
    await initHttp();
    store.dispatch({ type: SystemConstants.HTTP_CONNECTED, payload: true });
    await VS.init();
    store.dispatch({ type: SystemConstants.SOCKETS_CONNECTED, payload: true });
  } catch (err) {
    resetApp("System.ts");
    console.log(err);
  }
};

/**
 * On logout remove contents of local storage
 */
export const resetLocalStorage = (): void => {
  localStorage.removeItem(TokenStorageKeys.AT);
  localStorage.removeItem(TokenStorageKeys.RT);
  localStorage.removeItem(TokenStorageKeys.SpotifyRT);
  localStorage.removeItem(TokenStorageKeys.SpotifyAT);
  localStorage.removeItem("v-user");
};
