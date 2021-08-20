import { Injectable } from '@nestjs/common';
import { Query, Types } from 'mongoose';

import { RedisService } from '@db/redis.module';
import { RoomModel, IRoom } from '@modules/room/room.schema';
import { RedisRoom, RoomForm } from '@modules/room/room.constants';

@Injectable()
export class RoomService {
  constructor(private readonly redis: RedisService) {}

  create(room: RoomForm): Promise<IRoom> {
    return RoomModel.create(room);
  }

  getOneRoom(
    roomId: Types.ObjectId | string,
  ): Query<IRoom, IRoom, Record<string, unknown>, IRoom> {
    return RoomModel.findOne({ _id: roomId })
      .populate('tags')
      .populate('host')
      .populate('currentUsers');
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

  async addRoomToRedis(roomId: Types.ObjectId, hostId: string): Promise<any> {
    const roomData: RedisRoom = {
      track: {
        name: '',
        uri: '',
        image: '',
        artist: '',
        position: 0,
        paused: false,
      },
      host: hostId,
      users: [],
    };
    const roomString = await this.redis.parse(roomData);

    return this.redis.setAsyncSocketClient(roomId.toString(), roomString);
  }
}
