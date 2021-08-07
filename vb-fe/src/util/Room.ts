import { Tag } from "./Tags";

export interface RoomForm {
  name: string;
  description: string;
  tags: Tag[];
}

export interface Room extends RoomForm {
  host: string;
  start: Date;
  end: Date;
  logs: any[];
  maxUsers: number;
}
