export const BASE_URL = "http://localhost:8080";

export enum AuthEndpoints {
  LOGIN = "/api/auth/login",
  AUTHORIZE = "/api/auth/authorize",
  LOGOUT = "/api/auth/logout",
  REFRESH = "/api/auth/refresh",
  VALIDATE = "/api/auth/validate",
}

export enum TagEndpoints {
  SEARCH = "/api/tag/search",
}

export enum RoomEndpoints {
  GENERAL = "api/room/",
  PLAYLIST = "api/room/playlists",
}

export enum PlayerEndpoints {
  PLAY = "/api/player/play",
  NEXT = "/api/player/next",
  PREVIOUS = "/api/player/previous",
  PAUSE = "/api/player/pause",
  RESUME = "/api/player/resume",
  SHUFFLE = "/api/player/shuffle",
}
