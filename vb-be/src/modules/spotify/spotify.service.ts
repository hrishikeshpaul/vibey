import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { buildURL, scopes } from '@modules/spotify/spotify';

const BASE_URL = 'https://accounts.spotify.com';

@Injectable()
export class SpotifyService {
  private clientId = process.env.SPOTIFY_CLIENT_ID;
  private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private redirectURI = process.env.SPOTIFY_REDIRECT_URI;

  constructor(private readonly http: HttpService) {}

  createAuthURL(
    state: string,
  ): Observable<any> {
    const built = buildURL({
      state,
      show_dialog: true,
      redirect_uri: this.redirectURI,
      client_id: this.clientId,
      response_type: 'code',
      scope: scopes,
    });
    const url = `${BASE_URL}/authorize?${built}`;
    console.log(url);

    return this.http.get(url);
  }
}
