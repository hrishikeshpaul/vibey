import { Controller, Get, Response, Request } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagService } from './tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/search')
  async search(@Request() req: Req, @Response() res: Res) {
    const { str } = req.query;

    if (typeof str !== 'string') {
      return res
        .status(HttpStatus.Error)
        .send(new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet));
    }

    try {
      const queryResults = await this.tagService.find(str);
      return res.status(200).json(queryResults);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
    }
  }
}
