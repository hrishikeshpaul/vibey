import { Controller, Post, Response, Body } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { TagService } from '@modules/tag/tag.service';
import { SocketService } from '@modules/socket/socket.service';

@Controller('/api/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly tagService: TagService,
    private readonly socketService: SocketService,
  ) {}

  @Post('/')
  async create(@Body() body: { roomObj: ICreateRoom }, @Response() res: Res) {
    const { roomObj } = body;
    if (!roomObj) {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }

    const namedTagsArr = [];
    const tagsArr = [];
    for (const tag of roomObj.tags) {
      if (tag.__isNew__) {
        const newTag = await this.tagService.create(tag.label);
        tagsArr.push(newTag._id);
        namedTagsArr.push(newTag.label);
      } else {
        const updatedTag = await this.tagService.updateScore(tag._id);
        namedTagsArr.push(updatedTag.label);
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

      // we can pass tags as labels for redis and the FE, as opposed to ID strings
      const roomWithNamedTags = {
        _id: room._id,
        name: room.name,
        description: room.description,
        tags: namedTagsArr,
        host: room.host,
      };
      await this.socketService.addRoomToRedis(roomWithNamedTags);
      res.status(HttpStatus.NewResource).json(room);
    } catch (err) {
      res.status(HttpStatus.InternalError).json({ error: ErrorText.Generic });
    }
  }
}
