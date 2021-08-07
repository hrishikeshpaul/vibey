import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { RedisModule } from '@db/redis.module';
import { SpotifyModule } from '@modules/spotify/spotify.module';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { ValidateAccessTokenMiddleware } from '@modules/auth/auth.middleware';

@Module({
  imports: [SpotifyModule, UserModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [SpotifyModule, AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateAccessTokenMiddleware)
      .forRoutes({ path: '/api/auth/validate', method: RequestMethod.GET });
  }
}
