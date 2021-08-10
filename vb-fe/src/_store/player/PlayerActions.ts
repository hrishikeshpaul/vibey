import { Dispatch } from "redux";
import { play, next, previous, pause } from "services/Player";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { PlayerActionTypes, PlayerConstants } from "_store/player/PlayerTypes";
import { WebPlayer } from "util/Player";

export const playTrack =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({ type: SystemConstants.LOADING });
    try {
      await play(contextUri, deviceId);
      dispatch({
        type: SystemConstants.SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const playNext =
  () =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: PlayerConstants.PAUSE });
    try {
      await next(deviceId);
      dispatch({ type: SystemConstants.SUCCESS });
      dispatch({ type: PlayerConstants.PLAY });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const playPrevious =
  () =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: PlayerConstants.PAUSE });
    try {
      await previous(deviceId);
      dispatch({ type: SystemConstants.SUCCESS });
      dispatch({
        type: PlayerConstants.PLAY,
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const pauseTrack =
  () =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: PlayerConstants.PAUSE });
    try {
      await pause(deviceId);
      dispatch({ type: SystemConstants.SUCCESS });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
