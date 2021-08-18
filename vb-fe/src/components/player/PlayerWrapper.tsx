import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePlayerDevice, useErrorState } from "react-spotify-web-playback-sdk";
import { PlayerConstants } from "_store/player/PlayerTypes";
import { SystemConstants } from "_store/system/SystemTypes";

export const PlayerWrapper: FunctionComponent = () => {
  const device = usePlayerDevice();
  const error = useErrorState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SystemConstants.LOADING, payload: "Initializing Player...." });
    if (device) {
      dispatch({ type: PlayerConstants.SET_DEVICE_ID, payload: device.device_id });
      dispatch({ type: SystemConstants.SUCCESS });
    }
  }, [device, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch({ type: SystemConstants.FAILURE });
    }
  }, [error, dispatch]);
  return <></>;
};
