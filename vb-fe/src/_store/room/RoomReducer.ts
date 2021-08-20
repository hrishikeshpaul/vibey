import { Playlist } from "util/Playlist";
import { Room } from "util/Room";
import { RoomConstants, RoomActionTypes } from "./RoomTypes";

export interface RoomState {
  roomsList: Room[];
  currentRoom: Room | null;
  playlists: Playlist[];
  playlistLoading: boolean;
  isHost: boolean;
}

/**
 * Initial values for the System State
 */
const initialState: RoomState = {
  roomsList: [],
  currentRoom: null,
  playlists: [],
  playlistLoading: true,
  isHost: false,
};

export const roomReducer = (state: RoomState = initialState, action: RoomActionTypes): RoomState => {
  switch (action.type) {
    case RoomConstants.RESET: {
      return { ...initialState };
    }
    case RoomConstants.CREATE: {
      return {
        ...state,
        currentRoom: action.payload,
      };
    }
    case RoomConstants.SET_ROOM: {
      return {
        ...state,
        currentRoom: action.payload,
      };
    }
    case RoomConstants.SET_HOST: {
      return {
        ...state,
        isHost: action.payload,
      };
    }
    case RoomConstants.ADD_TO_PLAYLIST: {
      return {
        ...state,
        playlists: [...state.playlists, ...action.payload],
      };
    }
    case RoomConstants.PLAYLIST_LOADING: {
      return {
        ...state,
        playlistLoading: action.payload,
      };
    }
    case RoomConstants.ADD_ROOMS: {
      return {
        ...state,
        roomsList: [...state.roomsList, ...action.payload],
      };
    }
    default:
      return state;
  }
};
