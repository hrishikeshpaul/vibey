import { Module } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';
import { ErrorHandler } from 'src/util/error';
import { HttpStatus } from 'src/util/http';
import { promisify } from 'util';

const REDIS_HOST = process.env.REDIS_HOST;

export class RedisService {
  public redisJWTClient: RedisClient;
  public redisSocketClient: RedisClient;
  public setAsyncJwtClient: any;
  public getAsyncJwtClient: any;
  public delAsyncJwtClient: any;
  public setAsyncSocketClient: any;
  public getAsyncSocketClient: any;
  public delAsyncSocketClient: any;

  constructor() {
    this.redisJWTClient = createClient();
    this.redisSocketClient = createClient({
      port: parseInt(process.env.REDIS_SOCKET_PORT, 10),
      host: process.env.REDIS_HOST,
    });

    this.redisJWTClient.on('connect', () => {
      console.log('Redis JWT connected');
      this.setAsyncJwtClient = promisify(this.redisJWTClient.set).bind(
        this.redisJWTClient,
      );
      this.getAsyncJwtClient = promisify(this.redisJWTClient.get).bind(
        this.redisJWTClient,
      );
      this.delAsyncJwtClient = promisify(this.redisJWTClient.del).bind(
        this.redisJWTClient,
      );
    });

    this.redisSocketClient.on('connect', () => {
      console.log('Redis Socket connected');
      this.setAsyncSocketClient = promisify(this.redisSocketClient.set).bind(
        this.redisSocketClient,
      );
      this.getAsyncSocketClient = promisify(this.redisSocketClient.get).bind(
        this.redisSocketClient,
      );
      this.delAsyncSocketClient = promisify(this.redisSocketClient.del).bind(
        this.redisSocketClient,
      );
    });

    this.redisSocketClient.on('error', (err) => {
      throw new ErrorHandler(HttpStatus.InternalError, err);
    });

    this.redisJWTClient.on('error', (err) => {
      throw new ErrorHandler(HttpStatus.InternalError, err);
    });
  }
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
