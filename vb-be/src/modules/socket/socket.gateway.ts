import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
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
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {}

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
