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

@WebSocketGateway({ cors: true, namespace: 'rooms' })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-room')
  joinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<number>> {
    console.log(client);
    return new Observable();
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
