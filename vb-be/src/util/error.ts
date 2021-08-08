import { HttpException } from '@nestjs/common';

export enum ErrorText {
  InvalidAuthState = 'Invalid authentication state',
  InvalidRTArg = 'Invalid argument for refresh token',
  InvalidTokenPair = 'Invalid token pair',
  Generic = 'Something went wrong. Please try again later',
  TokenError = 'Cannot create tokens without user info',
  InvalidDataSet = 'Invalid dataset',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
}

// https://docs.nestjs.com/exception-filters
export class ErrorHandler extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
    statusCode = statusCode;
    message = message;
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
