import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { socketError, ErrorText } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import { RoomService } from '@modules/room/room.service';
import { ISocketCreateRoomData } from '@modules/socket/socket.constants';

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
      return await this.roomService.addRoomToRedis(data.room);
    } catch (err) {
      return socketError(client, HttpStatus.InternalError, ErrorText.Generic);
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
