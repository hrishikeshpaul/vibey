import { SpotifyService } from '@modules/spotify/spotify.service';
import { Controller, Get, Response, Request } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { generateRandomString, STATE_KEY } from '@modules/spotify/spotify';
import { firstValueFrom } from 'rxjs';
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly spotify: SpotifyService) {}

  @Get('/login')
  async login(@Response() res: Res) {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);
    const data = await firstValueFrom(this.spotify.createAuthURL(state));
    res.send(data.request.res.responseUrl);
  }

  @Get('/authorize')
  async authorize(@Request() req: Req, @Response() res: Res) {
    const { code, state } = req.query;

    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
    if (state === null || state !== storedState) {
      // res.redirect('http://localhost:8080/error?msg=state_mismatch');
    } else {
      // grant tokens function doesnt work
      const data = await this.spotify.grantTokens(code).toPromise();
      const { access_token, refresh_token } = data;
      // res.send({});
    }
  }
}
