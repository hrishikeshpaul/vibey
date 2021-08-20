import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

import { createRoom, getUserPlaylists } from "services/Room";
import { Room, RoomForm } from "util/Room";
import { User } from "util/User";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";

import { RoomActionTypes, RoomConstants } from "_store/room/RoomTypes";
import { VS } from "services/Socket";
import { store } from "_store/store";

export const updateCurrentRoom = (room: Room): void => {
  console.log(room);

  if (room) {
    const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");
    store.dispatch({ type: RoomConstants.SET_ROOM, payload: room });
    store.dispatch({ type: RoomConstants.SET_HOST, payload: currentUser?._id === room.host._id });
  }
};

export const createRoomAction =
  (room: RoomForm) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes | CallHistoryMethodAction>): Promise<void> => {
    dispatch({ type: SystemConstants.LOADING });

    try {
      const user: User = JSON.parse(localStorage.getItem("v-user") || "");
      const res = await createRoom(room, user._id);

      dispatch({
        type: RoomConstants.CREATE,
        payload: res.data,
      });
      dispatch({
        type: SystemConstants.CREATE_ROOM_MODAL,
        payload: false,
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

export const joinRoom = (roomId: string) => async (): Promise<void> => {
  VS.getPublisher().joinRoom(roomId);
  VS.getSubscriber().joinSuccess(updateCurrentRoom);
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
