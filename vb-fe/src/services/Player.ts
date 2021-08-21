/* Copyright (C) 2021 Vibey - All Rights Reserved */

import { Http } from "util/Http";
import { PlayerEndpoints } from "util/Endpoints";
import { AxiosResponse } from "axios";
import { Socket } from "dgram";

export const play = (contextUri: string, deviceId: string): Promise<AxiosResponse<void>> => {
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

export const next = (deviceId: string): Promise<AxiosResponse<void>> => {
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

export const previous = (deviceId: string): Promise<AxiosResponse<void>> => {
  return Http.post(
    PlayerEndpoints.PREVIOUS,
    {},
    {
      params: {
        device_id: deviceId,
      },
    },
  );
};

export const shuffle = (deviceId: string, state: boolean): Promise<AxiosResponse<void>> => {
  return Http.put(
    PlayerEndpoints.SHUFFLE,
    {},
    {
      params: {
        device_id: deviceId,
        state,
      },
    },
  );
};
