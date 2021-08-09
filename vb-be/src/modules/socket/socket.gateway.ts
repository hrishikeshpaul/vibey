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
import { RedisService } from '@db/redis.module';
import { RoomModel } from '@modules/room/room.schema';
import { UserService } from '@modules/user/user.service';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
    private readonly redis: RedisService,
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('join-room')
  async createRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const AT: string = client.handshake.headers['v-at'] as string;
      const { id } = await this.authService.verifyToken(AT, TokenTypes.Access);

      // const currentRoom = await this.roomService.getOneRoom(data);
      await this.roomService.addUserToRoom(data, id);
      const updatedRoom = await this.roomService.getOneRoom(data);
      await client.join(id);
    } catch (err) {
      client.emit('socket-err', err);
    }
  }
}
