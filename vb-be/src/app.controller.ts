import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { first, map } from 'rxjs';

@Controller('/api/auth/login')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly spotify: SpotifyService,
  ) {}

  @Get()
  getHello() {
    return this.spotify
      .createAuthURL(['user-read-private'], '1234', true)
      .pipe(map((data) => data.request.res.responseUrl));
  }
}
