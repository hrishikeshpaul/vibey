import { push } from "connected-react-router";
import { TokenStorageKeys } from "util/Http";

import { PlayerConstants } from "_store/player/PlayerTypes";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";

const DEFAULT_VOLUME = 50;

const handleScriptLoad = () => {
  return new Promise((resolve: any) => {
    if (window.Spotify) {
      resolve();
    } else {
      window.onSpotifyWebPlaybackSDKReady = resolve;
    }
  });
};

class Player {
  private player: any;

  private deviceId = "";

  async init() {
    handleScriptLoad();
    return new Promise((resolve, reject) => {
      console.log("called");

      window.onSpotifyWebPlaybackSDKReady = () => {
        this.player = new window.Spotify.Player({
          name: "Vibey",
          getOAuthToken: (callback: any) => {
            callback(localStorage.getItem(TokenStorageKeys.SpotifyAT) || "");
          },
          volume: DEFAULT_VOLUME / 100,
        });

        this.player.addListener("ready", (data: any) => {
          this.setDeviceId(data.device_id);
          resolve("Player ready");
        });

        this.player.on("initialization_error", (data: any) => {
          reject(new Error(data.message));
          store.dispatch({
            type: PlayerConstants.SET_INITIAL,
          });
        });

        this.player.on("authentication_error", (data: any) => {
          reject(new Error(data.message));
          store.dispatch({ type: PlayerConstants.SET_INITIAL });
          store.dispatch(push("/"));
          store.dispatch({ type: SystemConstants.RESET });
        });

        this.player.on("playback_error", () => {
          store.dispatch({
            type: PlayerConstants.SET_INITIAL,
          });
        });

        this.player.addListener("player_state_changed", (data: any) => {
          if (data) {
            store.dispatch({
              type: PlayerConstants.UPDATE_TRACK,
              payload: data.track_window.current_track,
            });
            store.dispatch({
              type: data.paused ? PlayerConstants.PAUSE : PlayerConstants.PLAY,
            });
            store.dispatch({
              type: PlayerConstants.UPDATE_POSITION,
              payload: data.position,
            });
            store.dispatch({ type: PlayerConstants.SET_SHUFFLE, payload: data.shuffle });
          }
        });

        this.player.connect();
      };
      // window.onSpotifyWebPlaybackSDKReady();
    });
  }

  getPlayer(): any {
    return this.player;
  }

  setDeviceId(deviceId: string): void {
    this.deviceId = deviceId;
  }

  getDeviceId(): string {
    return this.deviceId;
  }
}

export const WebPlayer = new Player();
