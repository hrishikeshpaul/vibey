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

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('join-room')
  joinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<number>> {
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
