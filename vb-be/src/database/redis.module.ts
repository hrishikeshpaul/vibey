import { Module } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';
import { promisify } from 'util';

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
    });
  }

  setAsync;
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
