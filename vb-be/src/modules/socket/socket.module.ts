import { RedisModule } from '@db/redis.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { EventsGateway } from './socket.gateway';
import { SocketService } from './socket.service';

@Module({
  imports: [AuthModule, RedisModule],
  providers: [EventsGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
