import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { socketError, ErrorText, ErrorHandler } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import {
  SocketEvents,
  SocketMessageBody,
} from '@modules/socket/socket.constants';
import { RoomService } from '@modules/room/room.service';
import { WsGuard, RsGuard } from '@modules/socket/socket.middleware';
import { AuthService } from '@modules/auth/auth.service';
import { TokenTypes } from '@modules/auth/auth.constants';
import { RedisRoom } from '@modules/room/room.constants';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { firstValueFrom } from 'rxjs';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly authService: AuthService,
    private readonly spotifyService: SpotifyService,
  ) {}

  @UseGuards(WsGuard)
  @SubscribeMessage(SocketEvents.Health)
  healthCheck(@ConnectedSocket() client: Socket) {
    client.emit(SocketEvents.HealthSuccess, HttpStatus.OK);
  }

  @UseGuards(RsGuard)
  @SubscribeMessage(SocketEvents.Refresh)
  async refreshTokens(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SocketMessageBody,
  ) {
    Logger.log('Refreshing tokens from socket..');
    try {
      const user = { email: body.decoded.email, id: body.decoded.id };
      const accessToken = body.headers['v-at'];
      const spotifyRefreshToken = body.headers['v-s-rt'];
      const [refreshedAT, refreshedRT] = await this.authService.refreshTokens(
        accessToken,
        user,
      );
      const response = await firstValueFrom(
        this.spotifyService.refreshAccessToken(spotifyRefreshToken),
      );
      const refreshedSpotifyAT = response.data.access_token;
      client.emit(SocketEvents.RefreshSuccess, {
        accessToken: refreshedAT,
        refreshToken: refreshedRT,
        spotifyAccessToken: refreshedSpotifyAT,
      });
    } catch (err) {
      socketError(client, HttpStatus.Unauthorized, ErrorText.Unauthorized);
    }
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(SocketEvents.EmitPlayTrack)
  playTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SocketMessageBody,
  ) {
    const { contextUri, roomId } = body.data;
    this.server.to(roomId).emit(SocketEvents.SubscribersPlay, contextUri);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage(SocketEvents.UpdateTrackInRoom)
  async updateTrackInRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SocketMessageBody,
  ) {
    try {
      const { track, roomId } = body.data;
      await this.roomService.updateTrackInRoom(roomId, '', track);
    } catch (err) {
      socketError(client, HttpStatus.InternalError, ErrorText.Generic);
    }
  }

  @UseGuards(WsGuard)
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

  @UseGuards(WsGuard)
  @SubscribeMessage(SocketEvents.Message)
  async message(@MessageBody() data: SocketMessageBody) {
    const { roomId, message } = data.data;
    this.server.to(roomId).emit(SocketEvents.Message, message);
  }
}
