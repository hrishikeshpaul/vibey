import { Types } from 'mongoose';

export interface ITokenUser {
  id?: Types.ObjectId;
  email: string;
}

export interface IDecodedToken {
  email: string;
  role: string;
  id: Types.ObjectId;
  subject: string;
}

export enum TokenTypes {
  Access = 'access',
  Refresh = 'refresh',
}
