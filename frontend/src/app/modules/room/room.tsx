import { useEffect } from "react";
import "./room.scss";
import io from "socket.io-client";
import { BASE_URL } from "app/static/url";
import { useParams } from "react-router-dom";

let socket;

const Room = () => {
  /**
   * I would create the following type as an interface, but I'm not sure where to put it.
   */
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    /*
     * This should likely be set up to state for error handling
     *
     */
    socket = io(BASE_URL, { transports: ["websocket"] });
    socket.emit("join_room", id);
  }, []);

  return (
    <div>
      <h2>Room</h2>
    </div>
  );
};

export default Room;
