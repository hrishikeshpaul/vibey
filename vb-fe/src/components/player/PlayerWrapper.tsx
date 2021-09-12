import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PlayerConstants } from "_store/player/PlayerTypes";
import { SystemConstants } from "_store/system/SystemTypes";
import { usePlayerDevice, useErrorState } from "core/player";
import { resetApp } from "util/Logout";
import { onTrackPlayAction } from "_store/player/PlayerActions";
import { State } from "_store/rootReducer";

export const PlayerWrapper: FunctionComponent = () => {
  const device = usePlayerDevice();
  const error = useErrorState();
  const dispatch = useDispatch();
  const { isHost } = useSelector((state: State) => state.room);

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING, payload: "Initializing Player..." });
    if (device && device.status === "ready") {
      dispatch({ type: PlayerConstants.SET_DEVICE_ID, payload: device.device_id });
      dispatch({ type: SystemConstants.SUCCESS });
      dispatch(onTrackPlayAction());
    }
  }, [device, dispatch, isHost]);

  useEffect(() => {
    if (error) {
      resetApp("PlayerWrapper.tsx");
    }
  }, [error, dispatch]);

  return <></>;
};
