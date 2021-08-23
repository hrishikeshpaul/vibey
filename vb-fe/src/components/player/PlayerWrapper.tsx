import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";

import { PlayerConstants } from "_store/player/PlayerTypes";
import { SystemConstants } from "_store/system/SystemTypes";
import { usePlayerDevice, useErrorState, usePlaybackState } from "core/player";
import { resetApp } from "util/Logout";

export const PlayerWrapper: FunctionComponent = () => {
  const device = usePlayerDevice();
  const error = useErrorState();
  const playbackState = usePlaybackState();
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
      switch (error.type) {
        case "authentication_error":
          resetApp();
          dispatch({ type: SystemConstants.LOGIN, payload: false });
          break;
        default:
          resetApp();
          dispatch({ type: SystemConstants.LOGIN, payload: false });
      }
      dispatch({ type: SystemConstants.FAILURE });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (playbackState) {
      dispatch({
        type: PlayerConstants.UPDATE_TRACK,
        payload: playbackState.track_window.current_track,
      });
      dispatch({
        type: playbackState.paused ? PlayerConstants.PAUSE : PlayerConstants.PLAY,
      });
      dispatch({
        type: PlayerConstants.UPDATE_POSITION,
        payload: playbackState.position,
      });
      dispatch({ type: PlayerConstants.SET_SHUFFLE, payload: playbackState.shuffle });
    }
  }, [playbackState, dispatch]);

  return <></>;
};
