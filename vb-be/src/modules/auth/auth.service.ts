import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

import { ErrorHandler, ErrorText } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import { RedisService } from '@db/redis.module';
import { UserType } from '@modules/user/user.schema';

const accessOptions = {
  issuer: 'vibey',
  expiresIn: '15m',
};

const refreshOptions = {
  issuer: 'vibey',
  expiresIn: '7d',
};

@Injectable()
export class AuthService {
  private jwtSecret = process.env.JWT_SECRET;
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
  public setAsyncJwtClient: any;
  public getAsyncJwtClient: any;
  public delAsyncJwtClient: any;

  constructor(private readonly redis: RedisService) {
    this.setAsyncJwtClient = promisify(this.redis.redisJWTClient.set).bind(
      this.redis.redisJWTClient,
    );
    this.getAsyncJwtClient = promisify(this.redis.redisJWTClient.get).bind(
      this.redis.redisJWTClient,
    );
    this.delAsyncJwtClient = promisify(this.redis.redisJWTClient.del).bind(
      this.redis.redisJWTClient,
    );
  }

  async createTokens(user: UserType): Promise<string[]> {
    if (!user) {
      throw new ErrorHandler(HttpStatus.Error, ErrorText.TokenError);
    }

    try {
      const { email, id } = user;

      const payload = {
        subject: id,
        email: email,
        role: 'user',
      };

      const createAccessToken = jwt.sign(
        payload,
        this.jwtSecret,
        accessOptions,
      );

      const createRefreshToken = jwt.sign(
        payload,
        this.jwtRefreshSecret,
        refreshOptions,
      );

      // creates tokens and stores them in redis as a pair (whitelist)
      const [accessToken, refreshToken] = await Promise.all([
        createAccessToken,
        createRefreshToken,
      ]);

      await this.setAsyncJwtClient(
        accessToken,
        refreshToken,
        'EX',
        60 * 60 * 24 * 7,
      );

      return [accessToken, refreshToken];
    } catch (err) {
      throw new ErrorHandler(HttpStatus.InternalError, ErrorText.Generic);
    }
  }

  async refreshTokens(
    accessToken: string,
    userInfo: UserType,
  ): Promise<string[]> {
    if (!accessToken || !userInfo['email'] || !userInfo['id']) {
      throw new ErrorHandler(HttpStatus.Error, ErrorText.InvalidRTArg);
    }
    await this.delAsyncJwtClient(accessToken);
    return await this.createTokens(userInfo);
  }

  /**
   * Validates token with jwt.verify and redis active token whitelist
   * @return True if success, else 403 error
   */
  async validateToken(
    token: string,
    type: 'access' | 'refresh',
  ): Promise<boolean> {
    let secret: string;
    type === 'access'
      ? (secret = this.jwtSecret)
      : (secret = this.jwtRefreshSecret);

    try {
      const decoded = jwt.verify(token, secret);
      const cacheResult = await this.getAsyncJwtClient(token);

      if (typeof cacheResult === 'string' && decoded) {
        return true;
      } else {
        throw new ErrorHandler(HttpStatus.Forbidden, ErrorText.Unauthorized);
      }
    } catch (err) {
      // handle error thrown through jwt.verify
      throw new ErrorHandler(HttpStatus.Forbidden, ErrorText.Unauthorized);
    }
  }
}
