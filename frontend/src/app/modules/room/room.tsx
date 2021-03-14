import { useEffect, useState } from "react";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChannel,
  sendMessage,
} from "app/hooks/useSocket";
import "./room.scss";
import { useParams } from "react-router-dom";

type chatState = string[];

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const room = id;

  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<chatState>([]);

  useEffect(() => {
    /**
     * Only connect to socket once room (params id) is available
     */
    if (room) initiateSocket(room);

    subscribeToChannel((data: any) => {
      setChat([...chat, data]);
    });

    return () => {
      disconnectSocket();
    };
  }, [room]);

  return (
    <div>
      <h2>Room</h2>
      <input
        type="text"
        name="name"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage(room, message)}>Send Message</button>
      {chat.map((chatMessage, index) => (
        <p key={index}>{chatMessage}</p>
      ))}
    </div>
  );
};

export default Room;
