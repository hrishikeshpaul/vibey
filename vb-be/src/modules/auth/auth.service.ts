import { RedisService } from '@db/redis.module';
import { UserType } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ErrorHandler } from 'src/util/error';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  jwtSecret = process.env.JWT_SECRET;
  jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

  constructor(private readonly redis: RedisService) {}

  async createToken(user: UserType) {
    if (!user) {
      throw new ErrorHandler(400, 'Cannot create tokens without user info');
    }
    const { email, id } = user;
    const payload = {
      subject: id,
      email: email,
      role: 'user',
    };
    const accessOptions = {
      issuer: 'vibey',
      expiresIn: '15m',
    };
    const refreshOptions = {
      issuer: 'vibey',
      expiresIn: '7d',
    };
    const createToken = jwt.sign(payload, this.jwtRefreshSecret, accessOptions);
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

  setAsyncJwtClient(
    accessToken: string,
    refreshToken: string,
    action: string,
    time: number,
  ) {
    return this.redis.redisJWTClient.set(
      accessToken,
      refreshToken,
      action,
      time,
    );
  }
}
