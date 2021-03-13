import { useEffect } from "react";
import "./room.scss";
import io from "socket.io-client";
import { BASE_URL } from "app/static/url";

let socket;

const Room = () => {
  useEffect(() => {
    /*
     * This should likely be set up to state for error handling
     *
     */
    socket = io(BASE_URL, { transports: ["websocket"] });
  }, []);

  return (
    <div>
      <h2>Room</h2>
    </div>
  );
};

export default Room;
