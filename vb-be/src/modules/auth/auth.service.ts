import { RedisService } from '@db/redis.module';
import { UserType } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ErrorHandler, ErrorText } from 'src/util/error';
import { promisify } from 'util';
import { HttpStatus } from 'src/util/http';

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
}
