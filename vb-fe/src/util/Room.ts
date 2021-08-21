import { User } from "util/User";
import { Tag } from "util/Tags";

export interface RoomTrack {
  name: string;
  image: string;
  uri: string;
  position: number;
  paused: boolean;
  artist: string;
  contextUri: string;
}
export interface Room {
  description: string;
  host: User;
  name: string;
  start: Date;
  tags: Tag[];
  _id: string;
  maxUsers?: number;
  users: User[];
  track: RoomTrack;
}

export interface RoomForm {
  name: string;
  description: string;
  tags: Tag[];
}

export interface CreateRoom extends RoomForm {
  host: string;
  start: Date;
  end: Date;
  logs: any[];
  maxUsers: number;
  _id: string;
}
