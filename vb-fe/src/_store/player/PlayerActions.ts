import { Dispatch } from "redux";
import { play } from "services/Player";
import { State } from "_store/rootReducer";
import { SystemActionTypes, SystemConstants } from "_store/system/SystemTypes";
import { PlayerActionTypes } from "_store/player/PlayerTypes";
import { WebPlayer } from "util/Player";

export const playTrack =
  (contextUri: string) =>
  async (dispatch: Dispatch<PlayerActionTypes | SystemActionTypes>, getState: () => State): Promise<void> => {
    const deviceId = WebPlayer.getDeviceId();
    console.log(deviceId);
    dispatch({
      type: SystemConstants.LOADING,
      payload: true,
    });
    try {
      const response = await play(contextUri, deviceId);
      console.log(response);
      dispatch({
        type: SystemConstants.SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: SystemConstants.FAILURE,
        payload: err,
      });
    }
  };
