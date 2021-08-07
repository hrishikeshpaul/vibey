import { Injectable } from '@nestjs/common';

import { RoomModel, RoomType, IRoom } from '@modules/room/room.schema';

@Injectable()
export class RoomService {
  create(room: RoomType): Promise<IRoom> {
    return RoomModel.create(room);
  }
}
