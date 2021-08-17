import { IRedisRoom } from '@modules/room/room.constants';

export enum SocketEvents {
  JoinRoom = 'join-room',
  JoinSuccess = 'join-room-success',
  Message = 'message',
  Error = 'socket-err',
  PauseTrack = 'pause-track',
}

export interface SocketMessageBody {
  event: string;
  data: any;
  headers: any;
}

export interface ISocketCreateRoomData {
  room: IRedisRoom;
}

export interface SocketMessageData {
  roomId: string;
  message: string;
}
