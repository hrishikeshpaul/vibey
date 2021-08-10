/* Copyright (C) 2021 Vibey - All Rights Reserved */

import { Http } from "util/Http";
import { PlayerEndpoints } from "util/Endpoints";

export const play = (contextUri: string, deviceId: string) => {
  return Http.put(
    PlayerEndpoints.PLAY,
    {},
    {
      params: {
        context_uri: contextUri,
        device_id: deviceId,
      },
    },
  );
};

export const next = (deviceId: string) => {
  return Http.post(
    PlayerEndpoints.NEXT,
    {},
    {
      params: {
        device_id: deviceId,
      },
    },
  );
};
