import { Module } from '@nestjs/common';
import * as JSONSchema from 'fast-json-stringify';
import { RedisClient, createClient } from 'redis';

import { RedisRoom } from '@modules/room/room.constants';
import { ErrorHandler } from 'src/util/error';
import { HttpStatus } from 'src/util/http';
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
  public keysAsyncSocketClient: any;
  public mGetAsyncSocketClient: any;

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
      this.setAsyncSocketClient = promisify(this.redisSocketClient.set).bind(
        this.redisSocketClient,
      );
      this.getAsyncSocketClient = promisify(this.redisSocketClient.get).bind(
        this.redisSocketClient,
      );
      this.delAsyncSocketClient = promisify(this.redisSocketClient.del).bind(
        this.redisSocketClient,
      );
      this.keysAsyncSocketClient = promisify(this.redisSocketClient.keys).bind(
        this.redisSocketClient,
      );
      this.mGetAsyncSocketClient = promisify(this.redisSocketClient.mget).bind(
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

  stringify(roomData: RedisRoom) {
    const stringify = JSONSchema({
      type: 'object',
      definitions: {
        name: { type: 'string' },
        uri: { type: 'string' },
        image: { type: 'string' },
        artist: { type: 'string' },
        position: { type: 'number' },
        paused: { type: 'boolean' },
      },
      properties: {
        track: { $ref: '#/definitions' },
        users: { type: 'array' },
        host: { type: 'string' },
      },
    });

    return new Promise((resolve) => resolve(stringify(roomData)));
  }

  parse(roomData: string) {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(roomData));
      } catch (err) {
        reject(err);
      }
    });
  }
}

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
