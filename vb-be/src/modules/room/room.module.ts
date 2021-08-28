import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { RoomController } from '@modules/room/room.controller';
import { RoomService } from '@modules/room/room.service';
import { ValidateAccessTokenMiddleware } from '@modules/auth/auth.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { ValidateRoomRequestBody } from '@modules/room/room.middleware';
import { TagModule } from '@modules/tag/tag.module';
import { RedisModule } from '@db/redis.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [AuthModule, TagModule, RedisModule, UserModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateAccessTokenMiddleware)
      .forRoutes({ path: '/api/room', method: RequestMethod.POST });
    consumer
      .apply(ValidateRoomRequestBody)
      .forRoutes({ path: '/api/room', method: RequestMethod.POST });
  }
}
