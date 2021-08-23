import {
  Controller,
  Post,
  Response,
  Request,
  Body,
  Get,
  Query,
  Put,
  Param,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Response as Res, Request as Req } from 'express';
import { firstValueFrom } from 'rxjs';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom, IUpdateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';
import { EventsGateway } from '@modules/socket/socket.gateway';

@Controller('/api/room')
export class RoomController {
  constructor(
    @Inject(forwardRef(() => EventsGateway))
    private readonly eventsGateway: EventsGateway,
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
      console.log(err);
      throw new ErrorHandler(HttpStatus.InternalError, err.toString());
    }
  }

  @Put('/:id')
  async updateRoom(
    @Body() body: { roomObj: IUpdateRoom; userId: Types.ObjectId },
    @Param() params: { id: string },
    @Response() res: Res,
  ) {
    const { roomObj, userId } = body;
    const { id } = params;

    try {
      if (!roomObj) {
        throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet);
      }

      // search for room
      const foundRoom = await this.roomService.getOneRoom(id);
      if (!foundRoom) {
        throw new ErrorHandler(HttpStatus.NotFound, ErrorText.NotFound);
      }
      // validate the current user is the host
      if (foundRoom.host.id != userId) {
        throw new ErrorHandler(HttpStatus.Forbidden, ErrorText.Forbidden);
      }

      const newTags = [];
      for (const tag of roomObj.tags) {
        const newTag = await this.tagService.insertNew(tag);
        await this.tagService.updateScore(newTag._id);
        newTags.push(newTag);
      }

      const parsedRoomObj = {
        ...roomObj,
        _id: Types.ObjectId(id),
        tags: newTags,
      };

      const updatedRoom = await this.roomService.updateRoomAndReturn(
        parsedRoomObj,
      );
      if (!updatedRoom) {
        throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
      }

      this.eventsGateway.server.to(id).emit('update-room', updatedRoom);
      return res.status(HttpStatus.OK).json({ room: updatedRoom });
    } catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).send(err.message);
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
