import { User } from "./User";

export type SimplifiedArtist = {
  external_urls: ExternalURL;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
};

export type Restrictions = {
  reason: string;
};

export type SimplifiedAlbum = {
  album_group?: "album" | "single" | "compilation" | "appears_on";
  album_type: "album" | "ALBUM" | "single" | "SINGLE" | "compilation" | "COMPILATION";
  artists: SimplifiedArtist[];
  available_markets?: string[];
  external_urls: ExternalURL;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: Restrictions;
  total_tracks: number;
  type: "album";
  uri: string;
};

export type TrackLink = {
  external_urls: ExternalURL;
  href: string;
  id: string;
  type: "track";
  uri: string;
};

export interface ExternalID {
  [key: string]: string;
}

export type Track = {
  album: SimplifiedAlbum;
  artists: SimplifiedArtist[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  episode?: boolean;
  explicit: boolean;
  external_ids: ExternalID;
  external_urls: ExternalURL;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: TrackLink;
  name: string;
  popularity: number;
  preview_url: string | null;
  track?: boolean;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
  media_type: "audio" | "video";
};

export type PlaylistDetails = {
  name?: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
};

export type PlaylistItem = {
  added_at: string | null;
  added_by: User | null;
  is_local: boolean;
  primary_color?: string | null;
  track: Track;
};

export type Paging<T> = {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
};

export interface SpotifyImage {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface ExternalURL {
  [key: string]: string;
}

export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalURL;
  followers: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: User;
  primary_color?: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: Paging<PlaylistItem>;
  type: "playlist";
  uri: string;
}
