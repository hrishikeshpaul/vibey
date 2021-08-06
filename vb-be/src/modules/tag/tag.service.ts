import { Injectable } from '@nestjs/common';
import { TagModel, TagType, ITag } from './tag.schema';

@Injectable()
export class TagService {
  constructor() {
    // TBD
  }

  create(tag: TagType): Promise<ITag> {
    return TagModel.create(tag);
  }

  findOne(name: string) {
    return TagModel.findOne({ name });
  }
}
