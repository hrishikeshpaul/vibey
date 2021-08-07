export enum ErrorText {
  InvalidAuthState = 'Invalid authentication state',
  InvalidRTArg = 'Invalid argument for refresh token',
  Generic = 'Something went wrong. Please try again later',
  TokenError = 'Cannot create tokens without user info',
  InvalidDataSet = 'Invalid dataset',
}

export class ErrorHandler extends Error {
  constructor(statusCode: number, message: string) {
    super();
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
