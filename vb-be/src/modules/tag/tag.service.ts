import { Injectable } from '@nestjs/common';
import { TagModel, ITag } from './tag.schema';

@Injectable()
export class TagService {
  constructor() {
    // TBD
  }

  create(label: string): Promise<ITag> {
    return TagModel.create({ label: label, value: label, score: 1 });
  }

  findOne(label: string) {
    return TagModel.findOne({ label: label });
  }
}
