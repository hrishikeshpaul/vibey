import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';

@Injectable()
export class SearchTagMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.query.label &&
      typeof req.query.label === 'string' &&
      req.query.label.length < 13
    ) {
      return next();
    }
    return res
      .status(HttpStatus.Error)
      .json({ error: ErrorText.InvalidDataSet });
  }
}
