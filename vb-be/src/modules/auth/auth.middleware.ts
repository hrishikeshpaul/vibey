import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { AuthService } from '@modules/auth/auth.service';

/**
 * Validates accessToken's existence and type
 * Verifies token with jwt.verify and the redis whitelist
 * @returns next if all validation succeeds
 */
@Injectable()
export class ValidateAccessTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['v-at'];

    if (!accessToken || typeof accessToken !== 'string') {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }
    next();
  }
}
@Injectable()
export class RefreshTokensMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['v-at'];
    const refreshToken = req.headers['v-rt'];

    if (
      !accessToken ||
      !refreshToken ||
      typeof accessToken !== 'string' ||
      typeof refreshToken !== 'string'
    ) {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }

    const decoded = await this.authService.verifyToken(refreshToken, 'refresh');
    const cacheResult = await this.authService.getAsyncJwtClient(accessToken);
    if (cacheResult !== refreshToken) {
      throw new ErrorHandler(
        HttpStatus.Unauthorized,
        ErrorText.InvalidTokenPair,
      );
    }
    req.headers['decoded'] = decoded;
    next();
  }
}
