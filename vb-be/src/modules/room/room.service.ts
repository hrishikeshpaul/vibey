import { Injectable } from '@nestjs/common';
import { Query, Types } from 'mongoose';

import { RedisService } from '@db/redis.module';
import { RoomModel, RoomType, IRoom } from '@modules/room/room.schema';
import { IRedisRoom, RoomForm } from './room.constants';

@Injectable()
export class RoomService {
  constructor(private readonly redis: RedisService) {}

  create(room: RoomForm): Promise<IRoom> {
    return RoomModel.create(room);
  }

  getOneRoom(
    roomId: Types.ObjectId | string,
  ): Query<IRoom, IRoom, Record<string, unknown>, IRoom> {
    return RoomModel.findOne({ _id: roomId }).populate('tags').populate('host');
  }

  addUserToRoom(
    roomId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
  ) {
    return RoomModel.updateOne(
      { _id: roomId },
      { $addToSet: { currentUsers: userId } },
    );
  }

  addRoomToRedis(roomId: Types.ObjectId): Promise<any> {
    return this.redis.setAsyncSocketClient(roomId.toString(), 0);
  }
}
