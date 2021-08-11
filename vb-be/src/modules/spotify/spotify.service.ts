import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse as A } from 'axios';

import { getQueryString, scopes } from '@modules/spotify/spotify';
import {
  SpotifyTokenResponse,
  SpotifyAuthResponse,
  SpotifyPublicUser,
  SpotifyGrantType,
  Playlist,
} from '@modules/spotify/spotify.constants';

const AUTH_BASE_URL = 'https://accounts.spotify.com';
export const BASE_URL = 'https://api.spotify.com/v1';

@Injectable()
export class SpotifyService {
  private clientId = process.env.SPOTIFY_CLIENT_ID;
  private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private redirectURI = process.env.SPOTIFY_REDIRECT_URI;
  private accessToken: string;
  private refreshToken: string;

  constructor(private readonly http: HttpService) {}

  reset(): void {
    this.setAccessToken('');
    this.setRefreshToken('');
  }

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

  createAuthURL(state: string): Observable<A<SpotifyAuthResponse>> {
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

  grantTokens(code: any): Observable<A<SpotifyTokenResponse>> {
    const params = new URLSearchParams({
      redirect_uri: this.redirectURI,
      grant_type: SpotifyGrantType.AuthorizationCode,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
    });

    return this.http.post(`${AUTH_BASE_URL}/api/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  refreshAccessToken(
    refreshToken: string,
  ): Observable<A<SpotifyTokenResponse>> {
    const params = new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: SpotifyGrantType.RefreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    return this.http.post(`${AUTH_BASE_URL}/api/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  me(): Observable<A<SpotifyPublicUser>> {
    return this.http.get(`${BASE_URL}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  }

  getUserPlaylists(
    spotifyAccessToken?: string,
    offset?: string,
    limit = 5,
  ): Observable<A<Playlist>> {
    return this.http.get(`${BASE_URL}/me/playlists`, {
      params: {
        offset,
        limit,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
  }

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

  playNext(deviceId: string, accessToken: string) {
    return this.http.post(
      `${BASE_URL}/me/player/next`,
      {},
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

  playPrevious(deviceId: string, accessToken: string) {
    return this.http.post(
      `${BASE_URL}/me/player/previous`,
      {},
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

  getPlaylistTracks(
    playlistId: string,
    accessToken: string,
  ): Observable<A<Playlist>> {
    const pid = playlistId.split(':')[2];
    return this.http.get(`${BASE_URL}/playlists/${pid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
