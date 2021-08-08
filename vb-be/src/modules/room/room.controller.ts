import { Controller, Post, Response, Body } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';

@Controller('/api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  async create(@Body() body: ICreateRoom, @Response() res: Res) {
    const { roomObj } = body;
    if (!roomObj)
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });

    try {
      const room = await this.roomService.create(roomObj);
      res.status(HttpStatus.NewResource).json(room);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.InternalError).json({ error: ErrorText.Generic });
    }
  }
}
