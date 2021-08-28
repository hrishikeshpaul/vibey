import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';

import { RoomController } from '@modules/room/room.controller';
import { RoomService } from '@modules/room/room.service';
import { ValidateAccessTokenMiddleware } from '@modules/auth/auth.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { ValidateRoomRequestBody } from '@modules/room/room.middleware';
import { TagModule } from '@modules/tag/tag.module';
import { RedisModule } from '@db/redis.module';
import { UserModule } from '@modules/user/user.module';
import { SocketModule } from '@modules/socket/socket.module';

@Module({
  imports: [
    AuthModule,
    TagModule,
    RedisModule,
    UserModule,
    forwardRef(() => SocketModule),
  ],
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
      .forRoutes(
        { path: '/api/room', method: RequestMethod.POST },
        { path: '/api/room/:id', method: RequestMethod.PUT },
      );
  }
}
