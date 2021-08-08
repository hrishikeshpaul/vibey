import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PlayerConstants } from "_store/player/PlayerTypes";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

export const usePlayer = () => {
  const [player, setPlayer] = useState<any>(null);
  const dispatch = useDispatch();

  const handleScriptLoad = () => {
    return new Promise((resolve: any) => {
      if (window.Spotify) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = resolve;
      }
    });
  };

  const init = () => {
    handleScriptLoad();
    window.onSpotifyWebPlaybackSDKReady = () => {
      const webPlayer = new window.Spotify.Player({
        name: "Vibey",
        getOAuthToken: (callback: any) => {
          callback(localStorage.getItem("v-s-at"));
        },
        volume: 0.2,
      });

      webPlayer.addListener("ready", (data: any) => {
        console.log("Ready with Device ID", data);
        dispatch({
          type: PlayerConstants.ADD_DEVICE,
          payload: data.device_id,
        });
        // play("spotify:album:0Nu5uWgrnNGWWbWfzXPgPI", data.device_id);
      });

      dispatch({
        type: PlayerConstants.ADD_PLAYER,
        payload: webPlayer,
      });

      webPlayer.connect();
    };
  };

  return {
    init,
  };
};
