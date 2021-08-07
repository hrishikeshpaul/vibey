import { useEffect, useState } from "react";
import { Room, RoomForm } from "util/Room";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient, { Socket } from "socket.io-client";
import { SOCKET_ENDPOINT } from "util/Socket";
import { SystemConstants } from "_store/system/SystemTypes";

export const useSocket = () => {
  const dispatch = useDispatch();

  const connect = () => {
    const socket = socketIOClient(SOCKET_ENDPOINT, {
      transportOptions: {
        polling: {
          extraHeaders: {
            "v-at": localStorage.getItem("v-at") || "",
          },
        },
      },
    });

    socket.on("connect", () => {
      console.log("Socket connected!");
      dispatch({
        type: SystemConstants.SOCKET,
        payload: socket,
      });
    });
  };

  // const createRoom = (room: RoomForm) => {
  //   socket?.emit("create-room", room);
  // };

  return {
    connect,
  };
};
