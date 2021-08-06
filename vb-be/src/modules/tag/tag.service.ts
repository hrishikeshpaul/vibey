import { Injectable } from '@nestjs/common';
import { TagModel, TagType } from './tag.schema';

@Injectable()
export class TagService {
  constructor() {
    // TBD
  }

  create(label: string): Promise<TagType> {
    return new TagModel({ label: label, value: label, score: 1 });
  }

  findOne(name: string) {
    return TagModel.findOne({ name });
  }
}
