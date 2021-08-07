import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorText } from 'src/util/error';
import { AuthService } from './auth.service';

/**
 * Validates accessToken's existence and type
 * Verifies token with jwt.verify and the redis whitelist
 * @returns next if all validation succeeds
 */
@Injectable()
export class ValidateAccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['v-at'];

    if (!accessToken || typeof accessToken !== 'string') {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }

    try {
      const isValid = await this.authService.validateToken(
        accessToken,
        'access',
      );
      if (isValid) return next();
    } catch (err) {
      return next(err);
    }
  }
}
