'use strict';

import { Response } from 'express';

interface ErrorHandler {
 statusCode: number;
 message: string;
}

class ErrorHandler extends Error {
 statusCode: number;
 message: string;
 constructor(statusCode: number, message: string) {
  super();
  this.statusCode = statusCode;
  this.message = message;
 }
}

const handleError = (err: ErrorHandler, res: Response) => {
 const { statusCode, message } = err;
 res.status(statusCode).json({
  status: 'error',
  statusCode,
  message,
 });
};

module.exports = {
 ErrorHandler,
 handleError,
};
