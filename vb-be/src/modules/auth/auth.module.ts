import { Module } from '@nestjs/common';

import { RedisModule } from '@db/redis.module';
import { SpotifyModule } from '@modules/spotify/spotify.module';
import { UserModule } from '@modules/user/user.module';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [SpotifyModule, UserModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [SpotifyModule, AuthService],
})
export class AuthModule {}
