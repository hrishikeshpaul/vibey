import { TagType } from '@modules/tag/tag.schema';

export interface ICreateRoom {
  roomObj: {
    name: string;
    description: string;
    tags: TagType[];
    host: string;
    maxUsers?: number;
  };
}
