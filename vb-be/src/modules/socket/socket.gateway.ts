import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { socketError, ErrorText, ErrorHandler } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import {
  SocketEvents,
  SocketMessageBody,
} from '@modules/socket/socket.constants';
import { RoomService } from '@modules/room/room.service';
import { WsGuard } from '@modules/socket/socket.middleware';
import { AuthService } from '@modules/auth/auth.service';
import { TokenTypes } from '@modules/auth/auth.constants';

@UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage(SocketEvents.JoinRoom)
  async createRoom(
    @MessageBody() data: SocketMessageBody,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const roomId = data.data.roomId;
      const AT: string = data.headers['v-at'] as string;
      const { id } = await this.authService.verifyToken(AT, TokenTypes.Access);

      if (!id)
        throw new ErrorHandler(
          HttpStatus.Unauthorized,
          ErrorText.InvalidTokenPair,
        );

      await this.roomService.addUserToRoom(roomId, id);
      const updatedRoom = await this.roomService.getOneRoom(roomId);
      await client.join(roomId);

      client.emit(SocketEvents.JoinSuccess, updatedRoom);
    } catch (err) {
      socketError(client, HttpStatus.InternalError, ErrorText.Generic);
    }
  }

  @SubscribeMessage(SocketEvents.Message)
  async message(@MessageBody() data: SocketMessageBody) {
    const { roomId, message } = data.data;
    this.server.to(roomId).emit(SocketEvents.Message, message);
  }
}
