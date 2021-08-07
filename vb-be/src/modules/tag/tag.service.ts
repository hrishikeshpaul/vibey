import { Injectable } from '@nestjs/common';
import { TagModel, ITag } from './tag.schema';

@Injectable()
export class TagService {
  create(label: string): Promise<ITag> {
    return TagModel.create({ label: label, value: label, score: 1 });
  }

  findOne(label: string) {
    return TagModel.findOne({ label: label });
  }

  find(str: string) {
    return TagModel.find(
      { label: { $regex: str, $options: 'i' } },
      { label: 1, value: 1, score: 1, _id: 0 },
      {},
      (err, doc) => {
        if (err) return err;
        if (doc) return doc;
      },
    );
  }
}
