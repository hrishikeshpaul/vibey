import { Dispatch } from "redux";
import { push, CallHistoryMethodAction } from "connected-react-router";

import { createRoom, getUserPlaylists } from "services/Room";
import { RoomForm } from "util/Room";
import { User } from "util/User";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { RoomActionTypes, RoomConstants } from "./RoomTypes";

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

export const getUserPlaylistsAction =
  (offset: number) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>): Promise<void> => {
    try {
      const response = await getUserPlaylists(offset);
      dispatch({
        type: RoomConstants.ADD_TO_PLAYLIST,
        payload: response.data.items,
      });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
