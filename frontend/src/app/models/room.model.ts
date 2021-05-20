import { UserData } from "./user.model";
import { Tag } from "./tag.model";

export interface Room {
  name: string;
  description: string;
  id: string;
  host?: UserData | string; // adding string here just for resting purposes
  start?: string;
  logs?: [];
  currentSong?: string;
  users?: number;
  tags: Tag[]
}