import { UserData } from "./user.model";

export interface Room {
  name: string;
  description: string;
  id: string;
  host: UserData;
  start: string;
  logs: [];
  currentSong: string;
  users: number;
}