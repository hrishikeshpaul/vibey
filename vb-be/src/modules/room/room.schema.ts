import { TagType } from '@modules/tag/tag.schema';
import { UserType } from '@modules/user/user.schema';
import { model, Schema, Model, Document, Types } from 'mongoose';

export interface RoomType {
  name: string;
  description?: string;
  tags?: TagType[];
  host: string;
  start?: Date;
  end?: Date;
  maxUsers?: number;
  currentUsers?: UserType[];
}

export interface IRoom extends Document {
  _id?: Types.ObjectId;
}

const RoomSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tag',
    },
  ],
  host: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  start: {
    type: Date,
    default: Date.now(),
  },
  end: {
    type: Date,
  },
  maxUsers: {
    type: Number,
    default: 1,
  },
  currentUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

export const RoomModel: Model<IRoom> = model('room', RoomSchema);
