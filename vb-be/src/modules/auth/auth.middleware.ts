import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { AuthService } from '@modules/auth/auth.service';
import { TokenTypes } from '@modules/auth/auth.constants';

/**
 * Validates access token with type, JWT, and redis
 * appends decoded token to headers, or throws 403
 */
@Injectable()
export class ValidateAccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['v-at'];

    // validate access token is in header & is correct type
    if (!accessToken || typeof accessToken !== 'string') {
      return res
        .status(HttpStatus.Error)
        .json({ error: ErrorText.InvalidDataSet });
    }

    // verify with jwt
    const decoded = await this.authService.verifyToken(
      accessToken,
      TokenTypes.Access,
    );
    // check white-list for token existence
    const cacheResult = await this.authService.getAsyncJwtClient(accessToken);

    if (decoded && typeof cacheResult === 'string') {
      req.headers['decoded'] = decoded;
      next();
    } else {
      return res
        .status(HttpStatus.Unauthorized)
        .json({ error: ErrorText.Unauthorized });
    }
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

    // verify with jwt, and validate JWT pair in whitelist
    const decoded = await this.authService.verifyToken(
      refreshToken,
      TokenTypes.Refresh,
    );
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
