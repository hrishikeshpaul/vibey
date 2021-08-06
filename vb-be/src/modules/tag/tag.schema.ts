import { model, Schema, Model, Document } from 'mongoose';

export interface TagType {
  label: string;
  value: string;
  score: number;
}

export interface ITag extends Document {
  // TBD
}

const TagSchema: Schema = new Schema({
  label: {
    type: String,
    required: true,
    index: {
      /**
       * Testing for case-insensitive uniqueness
       * collation: treat different characters as the same character
       * locale: establishes ENGLISH chars are considered to be the same
       * strength: 2 (1 and 2 indicate case-insensitive)
       * https://docs.mongodb.com/manual/core/index-case-insensitive/
       */
      unique: true,
      collation: { locale: 'en', strength: 2 },
    },
  },
  /**
   * React select REQUIRES value.  This is (in our case) the same as
   * the label
   */
  value: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

export const TagModel = model('tag', TagSchema);
