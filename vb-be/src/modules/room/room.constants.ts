import { ICreateTag } from '@modules/tag/tag.constants';

export interface ICreateRoom {
  name: string;
  description?: string;
  tags?: ICreateTag[];
  host: string;
  maxUsers?: number;
}
