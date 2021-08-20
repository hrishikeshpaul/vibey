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
import { RedisService } from '@db/redis.module';
import { RedisRoom } from '@modules/room/room.constants';
import { RoomType } from '@modules/room/room.schema';

@UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @SubscribeMessage(SocketEvents.Health)
  healthCheck(@ConnectedSocket() client: Socket) {
    client.emit(SocketEvents.HealthSuccess, HttpStatus.OK);
  }

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

      const updatedRoom = (await this.roomService.addUserToRoom(
        roomId,
        id,
      )) as RedisRoom;
      const currentRoom = await this.roomService.getOneRoom(roomId);

      await client.join(roomId);

      client.emit(SocketEvents.JoinSuccess, {
        ...updatedRoom,
        ...currentRoom.toObject(),
      });
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
