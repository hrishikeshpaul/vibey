import { Dispatch } from "redux";

import { play, next, previous, shuffle as setShuffle } from "services/Player";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { PlayerActionTypes, PlayerConstants } from "_store/player/PlayerTypes";
import { VS } from "services/Socket";
import { RoomTrack } from "util/Room";
import { SimplifiedArtist } from "util/Playlist";

export const subscribersPlay =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { deviceId } = getState().player;

    dispatch({ type: SystemConstants.LOADING });

    try {
      await play(contextUri, deviceId);
      dispatch({ type: PlayerConstants.SET_CONTEXT_URI, payload: contextUri });
      dispatch({ type: SystemConstants.SUCCESS });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const playTrack =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { deviceId } = getState().player;
    const { currentRoom } = getState().room;

    dispatch({ type: SystemConstants.LOADING });

    try {
      await play(contextUri, deviceId);
      VS.getPublisher().emitTrackPlay(contextUri, currentRoom!._id, currentRoom!.host._id);
      dispatch({ type: PlayerConstants.SET_CURRENT_PLAYLIST, payload: contextUri });
      dispatch({ type: PlayerConstants.SET_CONTEXT_URI, payload: contextUri });
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
    const { deviceId, shuffle } = getState().player;

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

export const updateTrackInRoom =
  (position: number) =>
  async (getState: () => State): Promise<void> => {
    const { track, paused, contextUri } = getState().player;
    const { currentRoom } = getState().room;

    const roomTrack: RoomTrack = {
      name: track!.name,
      uri: track!.uri,
      artist: track!.artists.map((artist: SimplifiedArtist) => artist.name).join(", "),
      image: track!.album.images[0].url,
      contextUri,
      paused,
      position,
    };

    VS.getPublisher().updateTrackInRoom(roomTrack, currentRoom!._id);
  };
