import { Types } from 'mongoose';

import { ICreateTag } from '@modules/tag/tag.constants';

export interface ICreateRoom {
  name: string;
  description?: string;
  tags?: ICreateTag[];
  host: string;
  maxUsers?: number;
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
