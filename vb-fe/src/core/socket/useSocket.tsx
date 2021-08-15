import { useDispatch } from "react-redux";
import socketIOClient, { Socket } from "socket.io-client";
import { SOCKET_ENDPOINT } from "util/Socket";
import { SystemConstants } from "_store/system/SystemTypes";
import { setHeaders, TokenStorageKeys } from "util/Http";
import { ErrorText } from "util/Error";
import { refreshTokens } from "services/Auth";
import { store } from "_store/store";
import { push, CallHistoryMethodAction } from "connected-react-router";

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

      socket.on("message", (data) => {
        console.log("MESSAGE", data);
      });

      socket.on("socket-err", (data) => {
        // TODO general error handling for socket-err - error toast or alike
        console.error("Error: ", data);
      });

      socket.on("exception", async (err: { status: string; message: string }) => {
        if (err.message === ErrorText.Unauthorized) {
          console.log("it be here");
          try {
            const res = await refreshTokens();
            const { accessToken, refreshToken, spotifyAccessToken } = res.data;

            localStorage.setItem(TokenStorageKeys.AT, accessToken);
            localStorage.setItem(TokenStorageKeys.RT, refreshToken);
            localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
            setHeaders();
            // retry old event
          } catch (error: any) {
            store.dispatch({ type: SystemConstants.LOGIN, payload: false });
            dispatch(push("/"));
          }
        }
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
