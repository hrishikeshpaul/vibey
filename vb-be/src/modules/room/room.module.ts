import { Module } from '@nestjs/common';

import { RoomController } from '@modules/room/room.controller';
import { RoomService } from '@modules/room/room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
