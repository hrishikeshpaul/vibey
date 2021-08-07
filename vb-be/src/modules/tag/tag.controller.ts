import { Controller, Get, Response, Query } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagService } from '@modules/tag/tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/search')
  async search(@Query('label') label: string, @Response() res: Res) {
    try {
      const queryResults = await this.tagService
        .find(label)
        .sort({ score: -1 })
        .limit(5);
      return res.status(200).json(queryResults);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
    }
  }
}
