import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PlayerConstants } from "_store/player/PlayerTypes";
import { SystemConstants } from "_store/system/SystemTypes";
import { usePlayerDevice, useErrorState } from "core/player";
import { resetApp } from "util/Logout";

export const PlayerWrapper: FunctionComponent = () => {
  const device = usePlayerDevice();
  const error = useErrorState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING, payload: "Initializing Player..." });
    if (device) {
      dispatch({ type: PlayerConstants.SET_DEVICE_ID, payload: device.device_id });
      dispatch({ type: SystemConstants.SUCCESS });
    }
  }, [device, dispatch]);

  useEffect(() => {
    if (error) {
      console.log("error in player wrapper.tsx");
      dispatch({ type: SystemConstants.LOGIN, payload: false });
      dispatch({ type: SystemConstants.FAILURE });
      resetApp("PlayerWrapper.tsx");
    }
  }, [error, dispatch]);

  return <></>;
};
