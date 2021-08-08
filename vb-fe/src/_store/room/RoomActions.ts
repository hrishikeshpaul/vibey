import { Dispatch } from "redux";
import { createRoom } from "services/Room";
import { RoomForm } from "util/Room";
import { ILocalStorageUser } from "util/User";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { RoomActionTypes, RoomConstants } from "./RoomTypes";

export const createRoomAction =
  (room: RoomForm) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { socket } = getState().system;

    dispatch({
      type: SystemConstants.LOADING,
      payload: false,
    });

    try {
      const user: ILocalStorageUser = JSON.parse(localStorage.getItem("v-user") || "");
      const res = await createRoom(room, user._id);
      socket?.emit("create-room", { room, userId: user._id });

      dispatch({
        type: RoomConstants.CREATE,
        payload: res.data,
      });
      dispatch({
        type: SystemConstants.LOADING,
        payload: false,
      });
    } catch (err) {
      dispatch({
        type: SystemConstants.LOADING,
        payload: false,
      });
    }
  };
