import { Dispatch } from "redux";
import { createRoom } from "services/Room";
import { RoomForm } from "util/Room";
import { ILocalStorageUser } from "util/User";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { RoomActionTypes, RoomConstants } from "./RoomTypes";

export const createRoomAction =
  (room: RoomForm) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>): Promise<void> => {
    dispatch({
      type: SystemConstants.LOADING,
      payload: false,
    });

    try {
      const user: ILocalStorageUser = JSON.parse(localStorage.getItem("v-user") || "");
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
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
