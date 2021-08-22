/* Copyright (C) 2021 Vibey - All Rights Reserved */

import { Http } from "util/Http";
import { RoomForm } from "util/Room";
import { RoomEndpoints } from "util/Endpoints";

export const createRoom = (room: RoomForm, userId: string): Promise<any> => {
  return Http.post(`${RoomEndpoints.GENERAL}`, { room, userId });
};

export const updateRoom = (room: RoomForm, userId: string, roomId: string): Promise<any> => {
  return Http.put(`${RoomEndpoints.GENERAL}${roomId}`, { room, userId });
};

export const getUserPlaylists = (offset: number): Promise<any> => {
  return Http.get(RoomEndpoints.PLAYLIST, {
    params: {
      offset,
    },
  });
};
