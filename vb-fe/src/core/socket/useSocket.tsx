import { useDispatch } from "react-redux";
import socketIOClient, { Socket } from "socket.io-client";
import { SOCKET_ENDPOINT } from "util/Socket";
import { SystemConstants } from "_store/system/SystemTypes";
import { TokenStorageKeys } from "util/Http";
import { Room } from "util/Room";

export const useSocket = () => {
  const dispatch = useDispatch();

  const joinRoom = (data: any, socket: Socket) => {
    console.log("join room on - ", data);
  };

  const connect = () => {
    const socket = socketIOClient(SOCKET_ENDPOINT, {
      transportOptions: {
        polling: {
          extraHeaders: {
            [TokenStorageKeys.AT]: localStorage.getItem(TokenStorageKeys.AT) || "",
          },
        },
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected!");

      socket.on("join-room-success", (data: Room) => {
        console.log("JOIN ROOM SUCCESS", data);
      });

      socket.on("message", (data) => {
        console.log("MESSAGE", data);
      });

      socket.on("socket-err", (data) => {
        // TODO general error handling for socket-err - error toast or alike
        console.error("Error: ", data);
      });

      dispatch({
        type: SystemConstants.SOCKET,
        payload: socket,
      });
    });
  };

  return {
    connect,
  };
};
