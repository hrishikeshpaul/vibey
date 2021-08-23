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
  currentUsers: User[];
}

export interface UpdateRoom {
  description: string;
  name: string;
  tags: Tag[];
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
