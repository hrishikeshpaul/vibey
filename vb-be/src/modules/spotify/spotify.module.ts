import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SpotifyService } from '@modules/spotify/spotify.service';

@Module({
  imports: [HttpModule],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
