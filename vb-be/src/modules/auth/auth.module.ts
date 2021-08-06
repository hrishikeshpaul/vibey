import { RedisModule } from '@db/redis.module';
import { SpotifyModule } from '@modules/spotify/spotify.module';
import { UserModule } from '@modules/user/user.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoggerMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';

@Module({
  imports: [SpotifyModule, UserModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [SpotifyModule, AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/auth/login');
  }
}
