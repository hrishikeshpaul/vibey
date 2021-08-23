import { Room } from "util/Room";
import { User } from "util/User";
import { RoomConstants } from "_store/room/RoomTypes";
import { store } from "_store/store";

export const updateCurrentRoom = (room: Room) => {
  if (room) {
    const currentUser: User | null = JSON.parse(localStorage.getItem("v-user") || "");

    store.dispatch({ type: RoomConstants.SET_ROOM, payload: room });
    store.dispatch({ type: RoomConstants.SET_HOST, payload: currentUser?._id === room.host._id });
  }
};
