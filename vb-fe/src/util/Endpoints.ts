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
