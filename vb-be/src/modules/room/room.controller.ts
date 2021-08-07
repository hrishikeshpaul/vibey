import { Controller, Post, Response, Body, Headers } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';

import { RoomService } from '@modules/room/room.service';
import { ICreateRoom } from '@modules/room/room.constants';
import { IDecodedToken } from '@modules/auth/auth.constants';

@Controller('/api/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  async create(
    @Body() roomInfo: ICreateRoom,
    @Headers('decoded') decoded: IDecodedToken,
    @Response() res: Res,
  ) {
    const { name, description, tags, maxUsers } = roomInfo.room;
    const roomObj = {
      name,
      description,
      tags,
      maxUsers,
      host: decoded.subject,
    };

    try {
      const room = await this.roomService.create(roomObj);
      res.status(HttpStatus.NewResource).json(room);
    } catch (err) {
      res.status(HttpStatus.InternalError).json({ error: ErrorText.Generic });
    }
  }
}
