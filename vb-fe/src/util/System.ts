import { connection } from "services/Socket";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";

/**
 * This is a pipeline to initialize the sockets, player, and other async
 * modules
 */
export const initPipeline = async () => {
  try {
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing sockets..." });
    await connection();
    store.dispatch({ type: SystemConstants.LOADING, payload: "Initializing player..." });
    // TODO init player
    store.dispatch({ type: SystemConstants.SUCCESS });
  } catch (err) {
    console.error(err);
  }
};
