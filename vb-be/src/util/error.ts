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
