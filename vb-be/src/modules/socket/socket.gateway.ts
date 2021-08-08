import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RoomService } from '@modules/room/room.service';
import { ISocketCreateRoomData } from './socket.constants';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomService: RoomService) {}

  // @UseGuards(WsGuard)
  @SubscribeMessage('create-room')
  async createRoom(
    @MessageBody() data: ISocketCreateRoomData,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.roomService.addRoomToRedis(data.room);
      console.log(data.room.host);
    } catch (err) {
      // error handling for sockets
    }
  }

  @SubscribeMessage('get-all-rooms')
  getAllRooms(@ConnectedSocket() client: Socket): any {
    // read from redis
    // return an observable
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
