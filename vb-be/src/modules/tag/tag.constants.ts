import { TagType } from '@modules/tag/tag.schema';

export interface ICreateTag extends TagType {
  _id: string;
  __isNew__?: boolean;
}
