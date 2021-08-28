import { Types } from 'mongoose';

import { TagType } from '@modules/tag/tag.schema';
import { UserType } from '@modules/user/user.schema';

export interface RoomForm {
  name: string;
  description?: string;
  tags?: TagType[];
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

export interface IUpdateRoom {
  _id: Types.ObjectId;
  tags?: TagType[];
  maxUsers?: number;
  currentUsers?: UserType[];
  name?: string;
  description?: string;
  host?: UserType;
}
export interface IRedisRoom {
  _id: Types.ObjectId;
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
