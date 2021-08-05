import { Controller, Get, Response } from '@nestjs/common';
import { SpotifyService } from '@modules/spotify/spotify.service';
import { Response as ExpResponse } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly spotify: SpotifyService,
  ) {}
}
