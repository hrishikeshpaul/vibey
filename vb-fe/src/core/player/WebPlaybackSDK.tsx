import React, { useEffect } from "react";
import { SPOTIFY_WEB_PLAYBACK_SDK_URL } from "./constant";
import { DeviceProvider } from "core/player/Device";
import { ErrorStateProvider } from "core/player/ErrorState";
import { PlaybackStateProvider } from "core/player/PlaybackState";
import { SpotifyPlayerProvider } from "core/player/SpotifyPlayer";
import { WebPlaybackSDKReadyProvider } from "core/player/WebPlaybackSDKReady";

export type WebPlaybackSDKProps = {
  deviceName: Spotify.PlayerInit["name"];
  getOAuthToken: Spotify.PlayerInit["getOAuthToken"];
  volume?: Spotify.PlayerInit["volume"];
  connectOnInitialized?: boolean;
};

export const WebPlaybackSDK: React.FC<WebPlaybackSDKProps> = ({
  children,
  deviceName,
  getOAuthToken,
  volume,
  connectOnInitialized = true,
}) => {
  useEffect(() => {
    // load Web Playback SDK.
    const script = document.createElement("script");
    script.src = SPOTIFY_WEB_PLAYBACK_SDK_URL;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <WebPlaybackSDKReadyProvider>
      <SpotifyPlayerProvider
        deviceName={deviceName}
        getOAuthToken={getOAuthToken}
        volume={volume}
        connectOnInitialized={connectOnInitialized}
      >
        <PlaybackStateProvider>
          <DeviceProvider>
            <ErrorStateProvider>{children}</ErrorStateProvider>
          </DeviceProvider>
        </PlaybackStateProvider>
      </SpotifyPlayerProvider>
    </WebPlaybackSDKReadyProvider>
  );
};
