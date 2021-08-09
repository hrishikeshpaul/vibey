import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';

import { ErrorHandler, ErrorText } from 'src/util/error';
import { HttpStatus } from 'src/util/http';

import { RedisService } from '@db/redis.module';
import { ITokenUser, TokenTypes } from '@modules/auth/auth.constants';

const accessOptions = {
  issuer: 'vibey',
  expiresIn: '1h',
};

const refreshOptions = {
  issuer: 'vibey',
  expiresIn: '365d',
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

  async createTokens(user: ITokenUser): Promise<string[]> {
    if (!user) {
      throw new ErrorHandler(HttpStatus.Error, ErrorText.TokenError);
    }

    try {
      const { email, id } = user;

      const payload = {
        id,
        email,
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
    user: ITokenUser,
  ): Promise<string[]> {
    await this.delAsyncJwtClient(accessToken);
    return await this.createTokens(user);
  }

  async verifyToken(
    token: string,
    type: TokenTypes.Access | TokenTypes.Refresh,
  ): Promise<any> {
    let secret: string;
    type === TokenTypes.Access
      ? (secret = this.jwtSecret)
      : (secret = this.jwtRefreshSecret);

    try {
      return jwt.verify(token, secret);
    } catch (err) {
      throw new ErrorHandler(HttpStatus.Unauthorized, ErrorText.Unauthorized);
    }
  }

  async getJwtWhitelist(accessToken: string): Promise<any> {
    return await this.getAsyncJwtClient(accessToken);
  }
}
