import { TagType } from '@modules/tag/tag.schema';
import { model, Schema, Model, Document, Types } from 'mongoose';

export interface UserType {
  _id?: Types.ObjectId;
  displayName: string;
  username: string;
  email: string;
  href: string;
  uri: string;
  image: string;
  createdAt?: string;
}

export interface IUser extends Document {
  _id?: Types.ObjectId;
  displayName: string;
  username: string;
  email: string;
  href: string;
  uri: string;
  image: string;
  createdAt?: string;
}

const UserSchema: Schema = new Schema({
  displayName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  href: { type: String },
  uri: { type: String },
  image: { type: String },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

export const UserModel: Model<IUser> = model('user', UserSchema);
