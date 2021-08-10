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

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { firstValueFrom } from 'rxjs';

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

      await this.roomService.addRoomToRedis(room._id);

      return res.status(HttpStatus.NewResource).json(populatedRoom);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, err.toString());
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
      console.log(err);
      // return res.status(err.statusCode).send(err);
    }
  }
}
