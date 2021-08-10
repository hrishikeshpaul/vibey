import { IRedisRoom } from '@modules/room/room.constants';

export interface ISocketCreateRoomData {
  room: IRedisRoom;
}

export interface SocketMessageData {
  roomId: string;
  message: string;
}
