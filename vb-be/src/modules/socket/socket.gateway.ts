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
import { WsGuard } from './socket.middleware';
import { AuthService } from '@modules/auth/auth.service';
import { TokenTypes } from '@modules/auth/auth.constants';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('join-room')
  async createRoom(
    @MessageBody() data: ISocketCreateRoomData,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data);
    console.log(client.handshake.headers['v-at']);
    // console.log(
    //   await this.authService.verifyToken(
    //      ,
    //     TokenTypes.Access,
    //   ),
    // );
  }
}
