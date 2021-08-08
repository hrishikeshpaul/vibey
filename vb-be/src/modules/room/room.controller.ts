import { Controller, Post, Response, Body } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';

@Controller('/api/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly tagService: TagService,
  ) {}

  @Post('/')
  async create(@Body() body: { roomObj: ICreateRoom }, @Response() res: Res) {
    const { roomObj } = body;

    try {
      if (!roomObj) {
        throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet);
      }

      const tagsArr = [];
      for (const tag of roomObj.tags) {
        if (tag.__isNew__) {
          const newTag = await this.tagService.create(tag.label);
          tagsArr.push(newTag._id);
        } else if (tag._id) {
          const updatedTag = await this.tagService.updateScore(tag._id);
          tagsArr.push(updatedTag._id);
        } else {
          throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet);
        }
      }

      const roomData = {
        name: roomObj.name,
        description: roomObj.description,
        tags: tagsArr,
        host: roomObj.host,
      };

      try {
        const room = await this.roomService.create(roomData);
        const populatedRoom = await this.roomService.getOneRoom(room._id);

        return res.status(HttpStatus.NewResource).json(populatedRoom);
      } catch (err) {
        throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
      }
    } catch (err) {
      return res.status(err.statusCode).send(err.message);
    }
  }
}
