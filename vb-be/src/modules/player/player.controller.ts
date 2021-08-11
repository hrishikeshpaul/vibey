import {
  Controller,
  Put,
  Response,
  Query,
  Headers,
  Get,
  Post,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { firstValueFrom } from 'rxjs';

import { SpotifyService } from '@modules/spotify/spotify.service';
import { HttpStatus } from 'src/util/http';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Put('/play')
  async play(
    @Response() res: Res,
    @Query('context_uri') contextUri: string,
    @Query('device_id') deviceId: string,
    @Headers('v-s-at') accessToken: string,
  ) {
    try {
      await firstValueFrom(
        this.spotifyService.play(deviceId, contextUri, accessToken),
      );
      return res.status(HttpStatus.NoContent).send();
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.Error).send(err);
    }
  }

  @Post('/next')
  async next(
    @Response() res: Res,
    @Query('device_id') deviceId: string,
    @Headers('v-s-at') accessToken: string,
  ) {
    try {
      await firstValueFrom(this.spotifyService.playNext(deviceId, accessToken));
      return res.status(HttpStatus.NoContent).send();
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.Error).send(err);
    }
  }

  @Post('/previous')
  async previous(
    @Response() res: Res,
    @Query('device_id') deviceId: string,
    @Headers('v-s-at') accessToken: string,
  ) {
    try {
      await firstValueFrom(
        this.spotifyService.playPrevious(deviceId, accessToken),
      );
      return res.status(HttpStatus.NoContent).send();
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.Error).send(err);
    }
  }
}
