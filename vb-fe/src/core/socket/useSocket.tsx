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

      socket.on("create-room", (room) => {
        console.log("savedRoom", room);
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
