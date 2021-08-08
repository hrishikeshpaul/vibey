/* Copyright (C) 2021 Vibey - All Rights Reserved */

import { Http } from "util/Http";
import { PlayerEndpoints } from "util/Endpoints";

export const play = (contextUri: string, deviceId: string) => {
  const accessToken = localStorage.getItem("v-s-at");
  return Http.put(
    PlayerEndpoints.PLAY,
    {},
    {
      params: {
        context_uri: contextUri,
        device_id: deviceId,
      },
      headers: {
        "v-s-at": accessToken,
      },
    },
  );
};
