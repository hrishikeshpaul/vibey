import { Injectable } from '@nestjs/common';
import { Query, Types } from 'mongoose';

import { RedisService } from '@db/redis.module';
import { RoomModel, IRoom } from '@modules/room/room.schema';
import {
  RedisRoom,
  RedisRoomTrack,
  IUpdateRoom,
  RoomForm,
} from '@modules/room/room.constants';
import { UserService } from '@modules/user/user.service';
import { ErrorText } from 'src/util/error';

@Injectable()
export class RoomService {
  constructor(
    private readonly redis: RedisService,
    private readonly userService: UserService,
  ) {}

  create(room: RoomForm): Promise<IRoom> {
    return RoomModel.create(room);
  }

  getOneRoom(
    roomId: Types.ObjectId | string,
  ): Query<IRoom, IRoom, Record<string, unknown>, IRoom> {
    return RoomModel.findOne({ _id: roomId }).populate('tags').populate('host');
  }

  async getAllRooms(offset: number, limit: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const keys = (await this.redis.keysAsyncSocketClient('*')) as string[];
        if (!keys.length) {
          resolve([]);
        }
        const values = (await this.redis.mGetAsyncSocketClient(
          keys,
        )) as string[];
        const parsedValues = [];

        const data = (await Promise.all([
          ...values.map((v) => this.redis.parse(v)),
          ...keys.map((k) => this.getOneRoom(k)),
        ])) as any[];

        for (let i = 0; i < data.length / 2; i++) {
          parsedValues.push({
            ...data[i],
            ...data[i + data.length / 2].toObject(),
          });
        }

        const paginatedValues = parsedValues.slice(
          (offset - 1) * limit,
          offset * limit,
        );

        resolve(paginatedValues);
      } catch (err) {
        reject(err);
      }
    });
  }

  updateRoomAndReturn(room: IUpdateRoom) {
    console.log(room.tags);
    return RoomModel.findByIdAndUpdate({ _id: room._id }, room, {
      new: true,
    })
      .populate('tags')
      .exec();
  }

  addUserToRoom(
    roomId: Types.ObjectId | string,
    userId: Types.ObjectId | string,
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        // get the room string from redis
        const roomString = await this.redis.getAsyncSocketClient(roomId);

        // parse the room string into the object
        const roomObj = (await this.redis.parse(roomString)) as RedisRoom;

        // find the user object from the user id
        const user = await this.userService.findOneById(userId);

        // if the user isn't found return an error
        if (!user) reject(ErrorText.UserNotFound);

        // if the user isn't part of the room, add the user to the room
        if (roomObj.users.findIndex((u) => u._id === userId) === -1)
          roomObj.users.push({
            _id: userId.toString() as string,
            username: user.username,
            image: user.image,
          });

        // stringify the updated room object
        const newRoomString = await this.redis.stringify(roomObj);

        // add the room object to redis
        await this.redis.setAsyncSocketClient(roomId, newRoomString);

        resolve(roomObj);
      } catch (err) {
        reject(err);
      }
    });
  }

  async addRoomToRedis(roomId: Types.ObjectId, hostId: any): Promise<any> {
    const roomData: RedisRoom = {
      track: {
        name: '',
        uri: '',
        image: '',
        artist: '',
        contextUri: '',
        position: 0,
        paused: false,
      },
      host: hostId,
      users: [],
    };
    const roomString = await this.redis.stringify(roomData);

    return this.redis.setAsyncSocketClient(roomId.toString(), roomString);
  }

  async updateTrackInRoom(
    roomId: string,
    hostId: string,
    data: RedisRoomTrack,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      /**
       * TODO: hostId will be used later to check if its the HOST that is actually
       * making the request.
       */
      try {
        // get the room string from redis
        const roomString = await this.redis.getAsyncSocketClient(roomId);

        // parse the room string into the object
        const roomObj = (await this.redis.parse(roomString)) as RedisRoom;

        const updatedRoom = {
          ...roomObj,
          track: { ...data },
        };

        // stringify the updated room object
        const newRoomString = await this.redis.stringify(updatedRoom);

        // add the room object to redis
        await this.redis.setAsyncSocketClient(roomId, newRoomString);

        resolve(updatedRoom);
      } catch (err) {
        reject(err);
      }
    });
  }
}
