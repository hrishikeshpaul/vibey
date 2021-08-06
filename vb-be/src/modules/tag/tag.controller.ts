import { Controller, Get, Response, Request, Query } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagModel, TagType } from './tag.schema';
import { TagService } from './tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/search')
  async search(
    @Request() req: Req,
    @Response() res: Res,
  ): Promise<Array<TagType>> {
    const { str } = req.query;

    if (typeof str !== 'string') {
      res
        .status(HttpStatus.Error)
        .send(new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet));
      return;
    }

    TagModel.find(
      { label: { $regex: str, $options: 'i' } },
      { label: 1, score: 1, value: 1, _id: 0 },
      function (err, docs) {
        if (err) {
          res.status(500).json({ error: 'Error finding results' });
          return;
        } else {
          res.status(200).json(docs);
          return;
        }
      },
    );
  }
}
