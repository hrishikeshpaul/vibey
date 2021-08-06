import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { getQueryString, scopes } from '@modules/spotify/spotify';

const AUTH_BASE_URL = 'https://accounts.spotify.com';
const BASE_URL = 'https://api.spotify.com/v1';

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
    const query = getQueryString({
      state,
      show_dialog: true,
      redirect_uri: this.redirectURI,
      client_id: this.clientId,
      response_type: 'code',
      scope: scopes,
    });

    return this.http.get(`${AUTH_BASE_URL}/authorize?${query}`);
  }

  grantTokens(code: any): Observable<any> {
    const params = new URLSearchParams({
      redirect_uri: this.redirectURI,
      code: code,
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    return this.http.post(`${AUTH_BASE_URL}/api/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  me(): Observable<any> {
    return this.http.get(`${BASE_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  }
}
