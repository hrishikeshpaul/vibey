import { Dispatch } from "redux";
import { play, next, previous } from "services/Player";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { PlayerActionTypes, PlayerConstants } from "_store/player/PlayerTypes";
import { WebPlayer } from "util/Player";

export const playTrack =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({
      type: SystemConstants.LOADING,
      payload: true,
    });
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
    dispatch({
      type: SystemConstants.LOADING,
      payload: true,
    });
    dispatch({
      type: PlayerConstants.PAUSE,
      payload: true,
    });
    try {
      await next(deviceId);
      dispatch({
        type: SystemConstants.SUCCESS,
      });
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

export const playPrevious =
  () =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    dispatch({
      type: SystemConstants.LOADING,
      payload: true,
    });
    dispatch({
      type: PlayerConstants.PAUSE,
      payload: true,
    });
    try {
      await previous(deviceId);
      dispatch({
        type: SystemConstants.SUCCESS,
      });
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
