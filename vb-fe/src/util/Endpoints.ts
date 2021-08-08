export const BASE_URL = "http://localhost:8080";

export enum AuthEndpoints {
  LOGIN = "/api/auth/login",
  AUTHORIZE = "/api/auth/authorize",
  CHECK = "/api/auth/check",
  LOGOUT = "/api/auth/logout",
}

export enum TagEndpoints {
  SEARCH = "/api/tag/search",
}

export enum RoomEndpoints {
  CREATE = "api/room/",
}
