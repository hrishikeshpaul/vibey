import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { socketError, ErrorText, ErrorHandler } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import {
  SocketMessageData,
  SocketEvents,
} from '@modules/socket/socket.constants';
import { RoomService } from '@modules/room/room.service';
import { ISocketCreateRoomData } from '@modules/socket/socket.constants';
import { WsGuard } from '@modules/socket/socket.middleware';
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

  @SubscribeMessage(SocketEvents.JoinRoom)
  async createRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const AT: string = client.handshake.headers['v-at'] as string;
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
  async message(@MessageBody() data: SocketMessageData) {
    const { message, roomId } = data;
    this.server.to(roomId).emit(SocketEvents.Message, message);
  }
}
