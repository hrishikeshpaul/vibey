import { Types } from 'mongoose';

import { ICreateTag } from '@modules/tag/tag.constants';

export interface RoomForm {
  name: string;
  description?: string;
  tags?: ICreateTag[];
}

export interface ICreateRoom extends RoomForm {
  host: string;
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
