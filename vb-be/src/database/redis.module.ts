import { Module } from '@nestjs/common';
import { RedisClient, createClient } from 'redis';

export class RedisService {
  public redisJWTClient: RedisClient;
  public redisSocketClient: RedisClient;

  constructor() {
    this.redisJWTClient = createClient();
    this.redisSocketClient = createClient({
      port: parseInt(process.env.REDIS_SOCKET_PORT, 10),
    });

    this.redisJWTClient.on('connect', () => {
      console.log('Redis JWT connected');
    });

    this.redisSocketClient.on('connect', () => {
      console.log('Redis Socket connected');
    });
  }
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
