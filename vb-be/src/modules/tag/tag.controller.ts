import { Controller, Get, Response, Request, Query } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagService } from './tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/search')
  async search(@Query('label') label: string, @Response() res: Res) {
    try {
      const queryResults = await this.tagService.find(label);
      return res.status(200).json(queryResults);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
    }
  }
}
