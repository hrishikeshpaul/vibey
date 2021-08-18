import React, { createContext, useContext, useEffect, useState } from "react";
import { MUST_BE_WRAPPED_MESSAGE } from "./constant";
import { useSpotifyPlayerRawInstance } from "./SpotifyPlayer";

export type PlayerDevice = Spotify.WebPlaybackInstance & {
  status: "ready" | "not_ready";
};

const DeviceContext = createContext<PlayerDevice | null | undefined>(undefined);

export const DeviceProvider: React.FC = ({ children }) => {
  const [device, setDevice] = useState<PlayerDevice | null>(null);
  const player = useSpotifyPlayerRawInstance();

  useEffect(() => {
    if (player === null) return;

    const ready = (spotifyDevice: Spotify.WebPlaybackInstance) => {
      setDevice({ ...spotifyDevice, status: "ready" });
    };

    const notReady = (spotifyDevice: Spotify.WebPlaybackInstance) => {
      setDevice({ ...spotifyDevice, status: "not_ready" });
    };

    player.addListener("ready", ready);
    player.addListener("not_ready", notReady);

    return () => {
      player.removeListener("ready", ready);
      player.removeListener("not_ready", notReady);
    };
  }, [player]);

  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>;
};

export function usePlayerDevice() {
  const value = useContext(DeviceContext);

  if (value === undefined) throw new Error(MUST_BE_WRAPPED_MESSAGE);

  return value;
}
