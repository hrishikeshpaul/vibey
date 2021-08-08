import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ErrorText } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

@Injectable()
export class ValidateRoomRequestBody implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { room, userId } = req.body;
    const { name, description, tags, maxUsers } = room;

    try {
      if (typeof name !== 'string' || typeof userId !== 'string') {
        return res
          .status(HttpStatus.Error)
          .json({ error: ErrorText.InvalidDataSet });
      }

      const roomObj = {
        name,
        description,
        tags,
        host: userId,
        maxUsers,
      };
      req.body.roomObj = roomObj;
      return next();
    } catch (err) {
      return res.status(err.statusCode).send(err.message);
    }
  }
}
