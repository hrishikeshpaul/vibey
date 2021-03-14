import io from "socket.io-client";
import { BASE_URL } from "app/static/url";

let socket: any;

export const initiateSocket = (room: string) => {
  socket = io(BASE_URL, { transports: ["websocket"] });
  console.log("Connecting socket...");
  if (socket && room) socket.emit("join", room);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const subscribeToChannel = (cb: any) => {
  if (!socket) return true;

  socket.on("chat", (msg: string) => {
    console.log("Websocket event received!");
    return cb(null, msg);
  });
};

export const sendMessage = (room: string, message: string) => {
  if (socket) socket.emit("chat", { message, room });
};
