import { SpotifyService } from '@modules/spotify/spotify.service';
import { Controller, Get, Response, Request } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { generateRandomString, STATE_KEY } from '@modules/spotify/spotify';
import { firstValueFrom } from 'rxjs';
import { UserService } from '@modules/user/user.service';
import { UserType } from '@modules/user/user.schema';
import { AuthService } from './auth.service';
import { ErrorHandler } from 'src/util/error';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly spotify: SpotifyService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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
      res.send(400).send(new ErrorHandler(400, 'Invalid state.'));
    } else {
      try {
        const response = await firstValueFrom(this.spotify.grantTokens(code));
        const { access_token, refresh_token } = response.data;

        this.spotify.setAccessToken(access_token);
        this.spotify.setRefreshToken(refresh_token);

        const user = await firstValueFrom(this.spotify.me());
        const userObject: UserType = {
          displayName: user.data.display_name,
          email: user.data.email,
          href: user.data.href,
          uri: user.data.uri,
          image: user.data.images.length > 0 ? user.data.images[0].url : null,
          username: user.data.id,
        };

        let vbUser = await this.userService.findOne(userObject.email);
        if (!vbUser) await this.userService.create(userObject);

        const [accessToken, refreshToken] = await this.authService.createToken(
          userObject,
        );
        res.status(200).json({
          user: vbUser,
          spotifyAccessToken: this.spotify.getAccessToken(),
          spotifyRefreshToken: this.spotify.getRefreshToken(),
          accessToken,
          refreshToken,
        });
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
}
