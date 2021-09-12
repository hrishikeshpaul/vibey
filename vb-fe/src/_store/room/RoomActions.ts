import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

import { State } from "_store/rootReducer";
import { RoomActionTypes, RoomConstants } from "_store/room/RoomTypes";
import { store } from "_store/store";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { createRoom, getAllRooms, getUserPlaylists, updateRoom } from "services/Room";
import { VS } from "services/Socket";
import { Room, RoomForm, RoomType } from "util/Room";

export const createRoomAction =
  (room: RoomForm) =>
  async (
    dispatch: Dispatch<RoomActionTypes | SystemActionTypes | CallHistoryMethodAction>,
    getState: () => State,
  ): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });
    try {
      const { user } = getState().user;
      const res = await createRoom(room, user._id);

      dispatch({
        type: RoomConstants.CREATE,
        payload: res.data,
      });
      dispatch({
        type: SystemConstants.SET_ROOM_MODAL,
        payload: { isOpen: false, type: null },
      });
      dispatch({
        type: SystemConstants.SUCCESS,
      });
      dispatch(push(`/room/${res.data._id}`));
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const updateRoomAction =
  (room: RoomType) =>
  async (
    dispatch: Dispatch<RoomActionTypes | SystemActionTypes | CallHistoryMethodAction>,
    getState: () => State,
  ): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });
    try {
      const { user } = getState().user;
      await updateRoom(room, user._id);

      dispatch({
        type: SystemConstants.SET_ROOM_MODAL,
        payload: { isOpen: false, type: null },
      });
      dispatch({ type: SystemConstants.SUCCESS });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };

export const setRoom = (room: Room): void => {
  if (room) {
    const { user } = store.getState().user;

    store.dispatch({ type: RoomConstants.SET_ROOM, payload: room });
    store.dispatch({ type: RoomConstants.SET_HOST, payload: user?._id === room.host._id });
  }
};

export const updateCurrentRoom = (room: Room): any => {
  store.dispatch({
    type: RoomConstants.UPDATE,
    payload: room,
  });
};

export const joinRoom = (roomId: string) => async (): Promise<void> => {
  VS.getPublisher().joinRoom(roomId);
  VS.getSubscriber().joinSuccess(setRoom);
  VS.getSubscriber().updateRoom(updateCurrentRoom);
};

export const getUserPlaylistsAction =
  (offset: number) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>): Promise<void> => {
    try {
      const response = await getUserPlaylists(offset);
      dispatch({
        type: RoomConstants.ADD_TO_PLAYLIST,
        payload: response.data.items,
      });
      dispatch({ type: RoomConstants.PLAYLIST_LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
      dispatch({ type: RoomConstants.PLAYLIST_LOADING, payload: false });
    }
  };

export const getAllRoomsAction =
  (offset: number, limit: number) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>): Promise<void> => {
    try {
      const response = await getAllRooms(offset, limit);
      dispatch({ type: RoomConstants.ADD_ROOMS, payload: response.data });
      dispatch({ type: RoomConstants.UPDATE_OFFSET_LIMIT, payload: { limit, offset: offset + 1 } });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
