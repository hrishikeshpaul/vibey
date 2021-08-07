import { RedisService } from '@db/redis.module';
import { RoomModel, RoomType } from '@modules/room/room.schema';
import { RoomForm, UserType } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  constructor(private readonly redis: RedisService) {}

  saveRoomToMongo(room: RoomForm, userId: string) {
    const roomObj: RoomType = {
      name: room.name,
      tags: room.tags,
      description: room.description,
      host: userId,
    };

    return RoomModel.create(roomObj);
  }

  addRoomToRedis(room: any) {
    this.redis.redisSocketClient.lpush('rooms', JSON.stringify(room));
  }
}
