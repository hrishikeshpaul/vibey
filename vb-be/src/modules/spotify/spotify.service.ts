import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

const BASE_URL = 'https://accounts.spotify.com';

@Injectable()
export class SpotifyService {
  private clientId = process.env.SPOTIFY_CLIENT_ID;
  private clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private redirectURI = process.env.SPOTIFY_REDIRECT_URI;

  constructor(private readonly http: HttpService) {}

  createAuthURL(scopes: string[], state: string, showDialog: boolean): Observable<any> {
    const url = `${BASE_URL}/authorize?response_type=code&scopes=${scopes.join(
      '%20',
    )}&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(
      this.redirectURI,
    )}`;

    return this.http.get(url);
  }
}
