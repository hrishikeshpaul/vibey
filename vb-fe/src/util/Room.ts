import { User } from "util/User";
import { Tag } from "util/Tags";

export interface Room {
  description: string;
  host: User;
  name: string;
  start: Date;
  tags: Tag[];
  _id: string;
  maxUsers?: number;
  users: User[];
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
