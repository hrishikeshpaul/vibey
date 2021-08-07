import { RedisModule } from '@db/redis.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { EventsGateway } from './socket.gateway';

@Module({
  imports: [AuthModule, RedisModule],
  providers: [EventsGateway],
})
export class SocketModule {}
