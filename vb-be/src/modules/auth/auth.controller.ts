import { SpotifyService } from '@modules/spotify/spotify.service';
import { Controller, Get, Response } from '@nestjs/common';
import { Response as ExpResponse } from 'express';
import { generateRandomString, STATE_KEY } from '@modules/spotify/spotify';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly spotify: SpotifyService) {}

  @Get('/login')
  async login(@Response() res: ExpResponse) {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    const data = await this.spotify.createAuthURL(state).toPromise();
    res.send(data.request.res.responseUrl);
  }
}
