import { Tag } from "./Tags";

export interface Room {
  name: string;
  description: string;
  host: string;
  tags: Tag[];
  start: Date;
  end: Date;
  logs: any[];
  maxUsers: number;
}
