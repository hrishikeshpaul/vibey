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
  private accessToken: string;
  private refreshToken: string;

  constructor(private readonly http: HttpService) {}

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  createAuthURL(state: string): Observable<any> {
    const builtURL = buildURL({
      state,
      show_dialog: true,
      redirect_uri: this.redirectURI,
      client_id: this.clientId,
      response_type: 'code',
      scope: scopes,
    });
    const url = `${BASE_URL}/authorize?${builtURL}`;

    return this.http.get(url);
  }

  // https://github.com/thelinmichael/spotify-web-api-node/blob/master/src/server-methods.js#L65
  grantTokens(code: any): Observable<any> {
    const params = new URLSearchParams();
    params.append('redirect_uri', this.redirectURI);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    
    return this.http.post(
      `${BASE_URL}/api/token`,

      {
        params: params,
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(this.clientId + ':' + this.clientSecret).toString(
              'base64',
            ),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
