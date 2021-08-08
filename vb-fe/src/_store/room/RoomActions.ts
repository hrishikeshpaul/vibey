import { useSocket } from "core/socket/useSocket";
import { Dispatch } from "redux";
import { Room, RoomForm } from "util/Room";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { RoomActionTypes } from "./RoomTypes";

export const createRoomAction =
  (room: RoomForm) =>
  async (dispatch: Dispatch<RoomActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const { socket } = getState().system;

    dispatch({
      type: SystemConstants.LOADING,
      payload: true,
    });
    const user: any = JSON.parse(localStorage.getItem("v-user") || "");
    socket?.emit("create-room", { room, userId: user["_id"] }); //eslint-disable-line
  };
