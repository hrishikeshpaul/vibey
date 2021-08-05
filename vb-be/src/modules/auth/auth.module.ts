import { SpotifyModule } from '@modules/spotify/spotify.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
@Module({
  imports: [SpotifyModule],
  controllers: [AuthController],
  exports: [SpotifyModule],
})
export class AuthModule {}
