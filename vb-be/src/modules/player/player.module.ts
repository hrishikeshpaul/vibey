import { SpotifyModule } from '@modules/spotify/spotify.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';

@Module({
  imports: [HttpModule, SpotifyModule],
  controllers: [PlayerController],
  providers: [],
  exports: [],
})
export class PlayerModule {}
