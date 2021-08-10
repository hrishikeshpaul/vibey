import { IRedisRoom } from '@modules/room/room.constants';

export enum SocketEvents {
  JoinRoom = 'join-room',
  JoinSuccess = 'join-room-success',
  Message = 'message',
}

export interface ISocketCreateRoomData {
  room: IRedisRoom;
}

export interface SocketMessageData {
  roomId: string;
  message: string;
}
