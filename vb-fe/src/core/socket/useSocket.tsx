import { useEffect, useState } from "react";
import { Room } from "util/Room";
import { useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import { SOCKET_ENDPOINT } from "util/Socket";
import { SystemConstants } from "_store/system/SystemTypes";

export const useSocket = () => {
  const dispatch = useDispatch();

  const connect = () => {
    console.log("calling socket connect");
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
      socket.emit("join-room");
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
