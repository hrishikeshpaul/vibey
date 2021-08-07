import { TagType } from '@modules/tag/tag.schema';

export interface ICreateRoom {
  room: {
    name: string;
    description: string;
    tags: TagType[];
    maxUsers?: number;
  };
}
