import { Injectable } from '@nestjs/common';

import { TagModel, ITag } from '@modules/tag/tag.schema';

@Injectable()
export class TagService {
  create(label: string): Promise<ITag> {
    return TagModel.create({
      label: label,
      value: label,
      score: 1,
    });
  }

  findOne(label: string) {
    return TagModel.findOne({ label: label });
  }

  find(str: string) {
    return TagModel.find(
      { label: { $regex: str, $options: 'i' } },
      { label: 1, value: 1, score: 1, _id: 1 },
      {},
      (err, doc) => {
        if (err) return err;
        if (doc) return doc;
      },
    );
  }

  updateScore(id: string): Promise<ITag> {
    return TagModel.findByIdAndUpdate(
      { _id: id },
      { $inc: { score: 1 } },
      { returnOriginal: false },
    ).exec();
  }
}
