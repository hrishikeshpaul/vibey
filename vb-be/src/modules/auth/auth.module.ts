import { Module } from '@nestjs/common';

import { RedisModule } from '@db/redis.module';
import { SpotifyModule } from '@modules/spotify/spotify.module';
import { UserModule } from '@modules/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SpotifyModule, UserModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [SpotifyModule, AuthService],
})
export class AuthModule {}
