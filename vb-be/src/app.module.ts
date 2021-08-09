import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { RedisModule } from '@db/redis.module';
import { MongoDBModule } from '@db/mongo.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TagModule } from '@modules/tag/tag.module';
import { SocketModule } from '@modules/socket/socket.module';
import { RoomModule } from '@modules/room/room.module';
import {
  RefreshTokensMiddleware,
  ValidateAccessTokenMiddleware,
} from '@modules/auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    RedisModule,
    MongoDBModule,
    AuthModule,
    TagModule,
    RoomModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [RedisModule, MongoDBModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateAccessTokenMiddleware)
      .exclude('/api/auth/authorize', '/api/auth/login', '/api/auth/refresh')
      .forRoutes({
        path: '/api',
        method: RequestMethod.ALL,
      });
  }
}
