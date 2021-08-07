import {
  Controller,
  Get,
  Response,
  Request,
  Post,
  Headers,
} from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse as A } from 'axios';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { SpotifyService } from '@modules/spotify/spotify.service';
import { generateRandomString, STATE_KEY } from '@modules/spotify/spotify';
import {
  SpotifyTokenResponse,
  SpotifyAuthResponse,
  SpotifyPublicUser,
} from '@modules/spotify/spotify.constants';
import { UserService } from '@modules/user/user.service';
import { UserType } from '@modules/user/user.schema';
import { AuthService } from '@modules/auth/auth.service';
import { IDecodedToken, TokenTypes } from '@modules/auth/auth.constants';

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
    const data: A<SpotifyAuthResponse> = await firstValueFrom(
      this.spotify.createAuthURL(state),
    );
    res.send(data.request.res.responseUrl);
  }

  @Get('/authorize')
  async authorize(@Request() req: Req, @Response() res: Res) {
    const { code, state } = req.query;
    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;

    if (state === null || state !== storedState) {
      res.send(400).send(new ErrorHandler(400, ErrorText.InvalidAuthState));
    } else {
      try {
        const response: A<SpotifyTokenResponse> = await firstValueFrom(
          this.spotify.grantTokens(code),
        );
        const { access_token, refresh_token } = response.data;

        this.spotify.setAccessToken(access_token);
        this.spotify.setRefreshToken(refresh_token);

        const user: A<SpotifyPublicUser> = await firstValueFrom(
          this.spotify.me(),
        );
        const userObject: UserType = {
          displayName: user.data.display_name,
          email: user.data.email,
          href: user.data.href,
          uri: user.data.uri,
          image: user.data.images.length > 0 ? user.data.images[0].url : null,
          username: user.data.id,
        };

        let vbUser = await this.userService.findOne(userObject.email);
        if (!vbUser) vbUser = await this.userService.create(userObject);

        const [accessToken, refreshToken] = await this.authService.createTokens(
          vbUser,
        );

        return res.status(HttpStatus.OK).json({
          user: vbUser,
          spotifyAccessToken: this.spotify.getAccessToken(),
          spotifyRefreshToken: this.spotify.getRefreshToken(),
          accessToken,
          refreshToken,
        });
      } catch (err) {
        return res.status(HttpStatus.Error).send(err);
      }
    }
  }

  /**
   * Validates AT here and in middleware
   * jwt verify AT & ensures AT is white-listed in Redis
   * @return 403 (unauthorized) or 204 no content
   */
  @Get('/validate')
  async validate(
    @Headers('v-at') accessToken: string,
    @Request() req: Req,
    @Response() res: Res,
  ) {
    try {
      const decoded = await this.authService.verifyToken(
        accessToken,
        TokenTypes.Access,
      );
      const cacheResult = await this.authService.getAsyncJwtClient(accessToken);

      // cache returns null if non-existent
      if (decoded && typeof cacheResult === 'string') {
        return res.status(HttpStatus.NoContent).send();
      } else {
        res
          .status(HttpStatus.Forbidden)
          .json({ error: ErrorText.Unauthorized });
      }
    } catch (err) {
      res.status(HttpStatus.Forbidden).json({ error: ErrorText.Unauthorized });
    }
  }

  /**
   * @param decoded Passed in by middleware
   * middleware verifies refresh and ensures correct token pair via Redis whitelist
   * @return 200, { accessToken, refreshToken, spotifyAccessToken }
   */
  @Get('/refresh')
  async refresh(
    @Headers('decoded') decoded: IDecodedToken,
    @Headers('v-at') accessToken: string,
    @Headers('v-s-rt') spotifyRefreshToken: string,
    @Response() res: Res,
  ) {
    const user = { email: decoded.email };
    const [refreshedAT, refreshedRT] = await this.authService.refreshTokens(
      accessToken,
      user,
    );
    const response = await firstValueFrom(
      this.spotify.refreshAccessToken(spotifyRefreshToken),
    );
    const refreshedSpotifyAT = response.data.access_token;

    res.status(HttpStatus.OK).json({
      accessToken: refreshedAT,
      refreshToken: refreshedRT,
      spotifyAccessToken: refreshedSpotifyAT,
    });
  }

  @Post('/logout')
  async logout(@Request() req: Req, @Response() res: Res) {
    const accessToken = req.headers['v-at'];

    if (accessToken) {
      try {
        await this.authService.delAsyncJwtClient(accessToken);
      } catch (err) {
        return res
          .status(HttpStatus.Error)
          .send(new ErrorHandler(HttpStatus.Error, JSON.stringify(err)));
      }

      this.spotify.reset();
    }
    return res.status(HttpStatus.NoContent).send();
  }
}
