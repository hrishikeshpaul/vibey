import { SocketEvents } from '@modules/socket/socket.constants';
import { HttpException } from '@nestjs/common';
import { Socket } from 'socket.io';

export enum ErrorText {
  InvalidAuthState = 'Invalid authentication state',
  InvalidRTArg = 'Invalid argument for refresh token',
  InvalidTokenPair = 'Invalid token pair',
  Generic = 'Something went wrong. Please try again later',
  TokenError = 'Cannot create tokens without user info',
  InvalidDataSet = 'Invalid dataset',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
  NotFound = 'Not found',
}

// https://docs.nestjs.com/exception-filters
export class ErrorHandler extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
    statusCode = statusCode;
    message = message;
  }

  public toString() {
    return this.message;
  }
}

export const handleError = (err: any, res: any) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export const socketError = (client: Socket, code: number, message: string) => {
  return client.emit(SocketEvents.Error, { code, message });
};
