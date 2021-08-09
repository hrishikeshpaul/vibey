import { Injectable } from '@nestjs/common';
import { Query, Types } from 'mongoose';

import { RedisService } from '@db/redis.module';
import { RoomModel, RoomType, IRoom } from '@modules/room/room.schema';
import { IRedisRoom } from './room.constants';

@Injectable()
export class RoomService {
  constructor(private readonly redis: RedisService) {}

  create(room: RoomType): Promise<IRoom> {
    return RoomModel.create(room);
  }
  
  getOneRoom(
    roomId: Types.ObjectId,
  ): Query<IRoom, IRoom, Record<string, unknown>, IRoom> {
    return RoomModel.findOne({ _id: roomId }).populate('tags').populate('host');
  }

  addRoomToRedis(roomId: string): Promise<any> {
    console.log(roomId);
    return this.redis.setAsyncSocketClient(roomId, 0);
  }
}
