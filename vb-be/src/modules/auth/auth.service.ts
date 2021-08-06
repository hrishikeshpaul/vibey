import { RedisService } from '@db/redis.module';
import { UserType } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ErrorHandler } from 'src/util/error';
import { accessOptions, refreshOptions } from './auth.constants';
import { promisify } from 'util';

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
      throw new ErrorHandler(400, 'Cannot create tokens without user info');
    }
    const { email, id } = user;

    const payload = {
      subject: id,
      email: email,
      role: 'user',
    };

    const createToken = jwt.sign(payload, this.jwtSecret, accessOptions);

    const createRefreshToken = jwt.sign(
      payload,
      this.jwtRefreshSecret,
      refreshOptions,
    );

    // creates tokens and stores them in redis as a pair (whitelist)
    const [accessToken, refreshToken] = await Promise.all([
      createToken,
      createRefreshToken,
    ]);

    await this.setAsyncJwtClient(
      accessToken,
      refreshToken,
      'EX',
      60 * 60 * 24 * 7,
    );

    return [accessToken, refreshToken];
  }
}
