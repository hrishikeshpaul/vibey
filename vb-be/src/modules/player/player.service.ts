import { Injectable } from '@nestjs/common';

import { BASE_URL } from '@modules/spotify/spotify.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PlayerService {
  constructor(private readonly http: HttpService) {}
  play(deviceId: string, contextUri: string, accessToken: string) {
    return this.http.put(
      `${BASE_URL}/me/player/play`,
      {
        context_uri: contextUri,
      },
      {
        params: {
          device_id: deviceId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
