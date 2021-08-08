import { Controller, Put, Response, Query, Headers } from '@nestjs/common';
import { Response as Res } from 'express';

import { HttpStatus } from 'src/util/http';
import { ErrorHandler, ErrorText } from 'src/util/error';

import { TagService } from '@modules/tag/tag.service';
import { PlayerService } from './player.service';
import { firstValueFrom } from 'rxjs';

@Controller('/api/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Put('/play')
  async play(
    @Response() res: Res,
    @Query('context_uri') contextUri: string,
    @Query('device_id') deviceId: string,
    @Headers('v-s-at') accessToken: string,
  ) {
    try {
      await firstValueFrom(
        this.playerService.play(deviceId, contextUri, accessToken),
      );
      res.status(HttpStatus.NoContent).send();
    } catch (err) {
      console.log(err);
    }
  }
}
