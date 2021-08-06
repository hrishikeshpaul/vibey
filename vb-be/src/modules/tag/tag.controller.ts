import { Controller, Get, Response, Request } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagType } from './tag.schema';
import { TagService } from './tag.service';

@Controller('/api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  async findOrAdd(
    @Request() req: Req,
    @Response() res: Res,
  ): Promise<Array<TagType>> {
    const { name } = req.query;

    if (typeof name !== 'string') {
      res
        .status(HttpStatus.Error)
        .send(new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet));
      return;
    }

    try {
      let foundTag = await this.tagService.findOne(name);

      if (!foundTag) {
        foundTag = this.tagService.create({
          label: name,
          value: name,
          score: 1,
        });
        res.status(HttpStatus.NewResource).json({ name: foundTag.name });
      } else {
        foundTag = await this.tagService.findOne(name);
        res.status(HttpStatus.OK).json({ name: foundTag.name });
      }
    } catch (err) {
      res.status(HttpStatus.InternalError).json(err);
    }
    return;
  }
}
