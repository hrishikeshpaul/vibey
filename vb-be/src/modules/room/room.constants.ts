import { Types } from 'mongoose';

import { ICreateTag } from '@modules/tag/tag.constants';

export interface RoomForm {
  name: string;
  description?: string;
  tags?: ICreateTag[];
}

export interface ICreateRoom extends RoomForm {
  room: RoomForm;
  host: string;
}

export interface RedisRoomTrack {
  name: string;
  position: number;
  image: string;
  artist: string;
  uri: string;
  paused: boolean;
  contextUri: string;
}

export interface RedisRoom {
  track: RedisRoomTrack;
  users: Array<{
    _id: string;
    username: string;
    image: string;
  }>;
  host: string;
}
