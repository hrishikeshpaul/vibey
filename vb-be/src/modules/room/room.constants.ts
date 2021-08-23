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
  description?: string;
  tags?: string[];
  host: {
    _id: Types.ObjectId;
    username: string;
  };
}
