import { Injectable } from '@nestjs/common';

import { RedisService } from '@db/redis.module';
import { ISocketRedisRoom } from '@modules/room/room.constants';

@Injectable()
export class SocketService {
  constructor(private readonly redis: RedisService) {}

  addRoomToRedis(room: ISocketRedisRoom): Promise<any> {
    const roomString = JSON.stringify(room);
    return this.redis.setAsyncSocketClient(roomString);
  }
}
