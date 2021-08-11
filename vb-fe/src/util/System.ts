import { connection } from "services/Socket";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";

export const initPipeline = async () => {
  try {
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing sockets..." });
    const socketConnection = await connection();
    console.log(socketConnection);
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing player..." });
  } catch (err) {
    console.log(err);
  }
};
