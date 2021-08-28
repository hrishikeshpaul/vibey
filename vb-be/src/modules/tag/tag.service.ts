import { Injectable } from '@nestjs/common';

import { TagModel, ITag, TagType } from '@modules/tag/tag.schema';
import { Types } from 'mongoose';
import { ErrorHandler, ErrorText } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

@Injectable()
export class TagService {
  private create(label: string): Promise<ITag> {
    return TagModel.create({
      label: label,
      value: label,
      score: 1,
    });
  }

  async updateScore(id: Types.ObjectId): Promise<ITag> {
    return TagModel.findByIdAndUpdate(
      { _id: id },
      { $inc: { score: 1 } },
      { returnOriginal: false },
    ).exec();
  }

  async updateOrInsert(tag: TagType) {
    if (tag._id) {
      return await this.updateScore(tag._id);
    } else if (tag.__isNew__) {
      return this.create(tag.label);
    } else {
      throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidDataSet);
    }
  }

  async insertNew(tag: TagType) {
    if (tag.__isNew__) {
      return this.create(tag.label);
    } else {
      return tag;
    }
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

  getOneById(id: Types.ObjectId) {
    return TagModel.findById(id);
  }
}
