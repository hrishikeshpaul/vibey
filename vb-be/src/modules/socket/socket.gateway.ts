import { IRoom } from '@modules/room/room.schema';
import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { WsGuard } from './socket.middleware';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  // @UseGuards(WsGuard)
  @SubscribeMessage('create-room')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const savedRoom: IRoom = await this.socketService.saveRoomToMongo(
      data.room,
      data.userId,
    );
    this.socketService.addRoomToRedis(savedRoom);
    return new Observable();
  }

  @UseGuards(WsGuard)
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
