import { Injectable } from '@nestjs/common';

import { RedisService } from '@db/redis.module';
import { RoomModel, RoomType, IRoom } from '@modules/room/room.schema';
import { ISocketRedisRoom } from '@modules/room/room.constants';
import { Query } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(private readonly redis: RedisService) {}

  create(room: RoomType): Promise<IRoom> {
    return RoomModel.create(room);
  }

  getOneRoom(roomId: string): Query<IRoom, IRoom, {}, IRoom> {
    return RoomModel.findOne({ _id: roomId }).populate('tags').populate('host');
  }

  addRoomToRedis(room: ISocketRedisRoom): Promise<any> {
    const roomString = JSON.stringify(room);
    return this.redis.setAsyncSocketClient(roomString);
  }
}
