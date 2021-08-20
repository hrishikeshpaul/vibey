import {
  Controller,
  Post,
  Response,
  Request,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { firstValueFrom } from 'rxjs';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

@Controller('/api/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly tagService: TagService,
    private readonly spotify: SpotifyService,
  ) {}

  @Post('/')
  async create(@Body() body: { roomObj: ICreateRoom }, @Response() res: Res) {
    const { roomObj } = body;

    try {
      if (!roomObj) {
        throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet);
      }

      const tags = [];

      for (const tag of roomObj.tags) {
        tags.push(await this.tagService.updateOrInsert(tag));
      }

      const roomData = { ...roomObj, tags };

      const room = await this.roomService.create(roomData);
      const populatedRoom = await this.roomService.getOneRoom(room._id);

      await this.roomService.addRoomToRedis(room._id, room.host);

      /**
       * Need to pass an empty users array to not throw an error
       * as the frontend expects users
       */
      return res
        .status(HttpStatus.NewResource)
        .json({ ...populatedRoom.toObject(), users: [] });
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, err.toString());
    }
  }

  @Get('/all')
  async getAllRooms(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Response() res: Res,
  ) {
    try {
      const rooms = await this.roomService.getAllRooms(offset, limit);
      return res.status(200).send(rooms);
    } catch (err) {
      return res.status(HttpStatus.Error).send(err);
    }
  }

  @Get('/playlists')
  async getPlaylists(
    @Request() req: Req,
    @Response() res: Res,
    @Query('offset') offset: string,
  ) {
    try {
      const spotifyAT = req.headers['v-s-at'] as string;
      const response = await firstValueFrom(
        this.spotify.getUserPlaylists(spotifyAT, offset),
      );
      return res.status(HttpStatus.OK).json(response.data);
    } catch (err) {
      return res.status(err.statusCode).send(err);
    }
  }
}
