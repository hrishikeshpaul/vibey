import { TagType } from '@modules/tag/tag.schema';
import { model, Schema, Model, Document } from 'mongoose';

export interface RoomType {
  name: string;
  description: string;
  tags: TagType[];
  host: string;
  start?: Date;
  end?: Date;
  maxUsers?: number;
}

export interface IRoom extends Document {
  id: string;
  name: string;
  description: string;
  tags: TagType[];
  host: string;
  start: Date;
  end: Date;
  maxUsers?: number;
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
});

export const RoomModel: Model<IRoom> = model('room', RoomSchema);
