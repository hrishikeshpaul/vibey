import { store } from "_store/store";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
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
      this.player = "ee";
      this.player = new window.Spotify.Player({
        name: "Vibey",
        getOAuthToken: (callback: any) => {
          callback(localStorage.getItem("v-s-at"));
        },
        volume: 0.2,
      });

      this.player.addListener("ready", (data: any) => {
        console.log("Ready with Device ID", data);
        this.setDeviceId(data.device_id);
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
