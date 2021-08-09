import { Tag } from "./Tags";

export interface RoomForm {
  name: string;
  description: string;
  tags: Tag[];
}

export interface dataCreateRoom {
  description: string;
  host: { id: string; username: string };
  name: string;
  start: Date;
  tags: Tag[];
  _id: string;
}

export interface Room extends RoomForm {
  host: string;
  start: Date;
  end: Date;
  logs: any[];
  maxUsers: number;
  _id: string;
}
