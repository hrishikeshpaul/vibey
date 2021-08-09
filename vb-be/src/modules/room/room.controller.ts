import { Controller, Post, Response, Body } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';
import { Types } from 'mongoose';

@Controller('/api/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly tagService: TagService,
  ) {}

  @Post('/')
  async create(@Body() body: { roomData: ICreateRoom }, @Response() res: Res) {
    const { roomData } = body;

    try {
      if (!roomData) {
        throw new ErrorHandler(HttpStatus.Error, ErrorText.Forbidden);
      }

      roomData.tags.map(
        async (tag) => await this.tagService.updateOrInsert(tag),
      );

      const room = await this.roomService.create(roomData);
      const populatedRoom = await this.roomService.getOneRoom(room._id);

      await this.roomService.addRoomToRedis(room._id);

      return res.status(HttpStatus.NewResource).json(populatedRoom);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, err.toString());
    }
  }
}
