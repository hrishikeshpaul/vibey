import { Module } from '@nestjs/common';

import { RoomModule } from '@modules/room/room.module';
import { RedisModule } from '@db/redis.module';
import { AuthModule } from '@modules/auth/auth.module';
import { EventsGateway } from '@modules/socket/socket.gateway';
import { SocketService } from '@modules/socket/socket.service';

@Module({
  imports: [AuthModule, RedisModule, RoomModule],
  providers: [EventsGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
