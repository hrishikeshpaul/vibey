import { Controller, Post, Response, Body } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';

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
    if (!roomObj) {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }

    const tagsArr = [];
    for (const tag of roomObj.tags) {
      if (tag.__isNew__) {
        const newTag = await this.tagService.create(tag.label);
        tagsArr.push(newTag._id);
      } else {
        const updatedTag = await this.tagService.updateScore(tag._id);
        tagsArr.push(updatedTag._id);
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

      res.status(HttpStatus.NewResource).json(populatedRoom);
    } catch (err) {
      res.status(HttpStatus.InternalError).json({ error: ErrorText.Generic });
    }
  }
}
