import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PlayerConstants } from "_store/player/PlayerTypes";
import { SystemConstants } from "_store/system/SystemTypes";
import { usePlayerDevice, useErrorState } from "core/player";
import { resetApp } from "util/Logout";
import { VS } from "services/Socket";
import { subscribersPlay } from "_store/player/PlayerActions";
import { State } from "_store/rootReducer";

export const PlayerWrapper: FunctionComponent = () => {
  const device = usePlayerDevice();
  const error = useErrorState();
  const dispatch = useDispatch();
  const { isHost } = useSelector((state: State) => state.room);

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING, payload: "Initializing Player..." });
    if (device) {
      dispatch({ type: PlayerConstants.SET_DEVICE_ID, payload: device.device_id });
      dispatch({ type: SystemConstants.SUCCESS });

      VS.getSubscriber().onTrackPlay((contextUri: string) => {
        if (contextUri) {
          if (!isHost) dispatch(subscribersPlay(contextUri));
        }
      });
    }
  }, [device, dispatch, isHost]);

  useEffect(() => {
    if (error) {
      dispatch({ type: SystemConstants.LOGIN, payload: false });
      dispatch({ type: SystemConstants.FAILURE });
      resetApp("PlayerWrapper.tsx");
    }
  }, [error, dispatch]);

  return <></>;
};
