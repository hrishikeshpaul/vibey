export interface ITokenUser {
  id?: string;
  email: string;
}

export interface IDecodedToken {
  email: string;
  role: string;
  subject: string;
}

export enum TokenTypes {
  Access = 'access',
  Refresh = 'refresh',
}
