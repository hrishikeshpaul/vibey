import { PlayerConstants } from "_store/player/PlayerTypes";
import { store } from "_store/store";

const DEFAULT_VOLUME = 50;

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

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

  constructor() {
    handleScriptLoad();
    window.onSpotifyWebPlaybackSDKReady = async () => {
      this.player = new window.Spotify.Player({
        name: "Vibey",
        getOAuthToken: (callback: any) => {
          callback(localStorage.getItem("v-s-at"));
        },
        volume: DEFAULT_VOLUME / 100,
      });

      this.player.addListener("ready", (data: any) => {
        console.log("Ready with Device ID", data);
        this.setDeviceId(data.device_id);
        // store.dispatch({ type: PlayerConstants.SET_VOLUME, payload: DEFAULT_VOLUME });
      });

      this.player.addListener("player_state_changed", (data: any) => {
        console.log(data);
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
      });
      this.player.connect();
    };
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
