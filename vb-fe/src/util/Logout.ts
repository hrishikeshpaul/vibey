import { TokenStorageKeys } from "util/Http";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";
import { UserConstants } from "_store/user/UserTypes";

export const resetApp = () => {
  store.dispatch({ type: SystemConstants.RESET });
  store.dispatch({ type: UserConstants.RESET });
  localStorage.removeItem(TokenStorageKeys.AT);
  localStorage.removeItem(TokenStorageKeys.RT);
  localStorage.removeItem("v-user");
  localStorage.removeItem(TokenStorageKeys.SpotifyAT);
  localStorage.removeItem(TokenStorageKeys.SpotifyRT);
};
