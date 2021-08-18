import { Dispatch } from "redux";

import { play, next, previous, shuffle as setShuffle } from "services/Player";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { PlayerActionTypes, PlayerConstants } from "_store/player/PlayerTypes";
// import { WebPlayer } from "core/player/Player";

export const playTrack =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { deviceId } = getState().player;

    dispatch({ type: SystemConstants.LOADING });

    try {
      await play(contextUri, deviceId);
      dispatch({ type: PlayerConstants.SET_CURRENT_PLAYLIST, payload: contextUri });
      dispatch({ type: SystemConstants.SUCCESS });
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
    const { deviceId } = getState().player;

    dispatch({ type: PlayerConstants.PAUSE });
    dispatch({ type: PlayerConstants.SET_INITIAL });
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
    const { deviceId } = getState().player;

    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: PlayerConstants.PAUSE });
    try {
      await previous(deviceId);
      dispatch({ type: SystemConstants.SUCCESS });
      dispatch({ type: PlayerConstants.PLAY, payload: true });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const shuffleAction =
  () =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { deviceId } = getState().player;
    const { shuffle } = getState().player;

    dispatch({ type: SystemConstants.LOADING });
    dispatch({ type: PlayerConstants.PAUSE });
    try {
      await setShuffle(deviceId, !shuffle);
      dispatch({ type: SystemConstants.SUCCESS });
      dispatch({ type: PlayerConstants.PLAY, payload: true });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
