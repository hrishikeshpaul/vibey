export interface SpotifyAuthResponse {
  request: {
    res: {
      responseUrl: string;
    };
  };
}

export interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface ExternalURL {
  [key: string]: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface SpotifyPublicUser {
  display_name?: string | null;
  external_urls: ExternalURL;
  followers?: Followers;
  href: string;
  id: string;
  images?: SpotifyImage[];
  type: 'user';
  uri: string;
  email: string;
}
