import { ICreateTag } from '@modules/tag/tag.constants';
import { Types } from 'mongoose';

export interface ICreateRoom {
  name: string;
  description?: string;
  tags?: ICreateTag[];
  host: string;
  maxUsers?: number;
}

export interface ISocketRedisRoom {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  tags?: string[];
  host: string;
}
