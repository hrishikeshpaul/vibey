import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { AuthEndpoints, BASE_URL } from "util/Endpoints";
import { store } from "_store/store";
import { SystemConstants } from "_store/system/SystemTypes";

export enum HttpStatus {
  OK = 200,
  NoContent = 204,
  Error = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500,
}

export enum TokenStorageKeys {
  AT = "v-at",
  RT = "v-rt",
  SpotifyAT = "v-s-at",
  SpotifyRT = "v-s-rt",
}

interface RTResponse {
  accessToken: string;
  refreshToken: string;
  spotifyAccessToken: string;
}

export const buildHeaders = (): any => ({
  [TokenStorageKeys.AT]: localStorage.getItem(TokenStorageKeys.AT) || "",
  [TokenStorageKeys.RT]: localStorage.getItem(TokenStorageKeys.RT) || "",
  [TokenStorageKeys.SpotifyAT]: localStorage.getItem(TokenStorageKeys.SpotifyAT) || "",
  [TokenStorageKeys.SpotifyRT]: localStorage.getItem(TokenStorageKeys.SpotifyRT) || "",
});

const setHeadersToLocalStorage = (
  accessToken: string,
  refreshToken: string,
  spotifyAccessToken: string,
  spotifyRefreshToken: string,
): void => {
  localStorage.setItem(TokenStorageKeys.AT, accessToken);
  localStorage.setItem(TokenStorageKeys.RT, refreshToken);
  localStorage.setItem(TokenStorageKeys.SpotifyAT, spotifyAccessToken);
  localStorage.setItem(TokenStorageKeys.SpotifyRT, spotifyRefreshToken);
};

export const Http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const setHeaders = (): void => {
  Http.defaults.headers.common = buildHeaders();
};

export const initHttp = async (): Promise<void> => {
  await new Promise((r) => {
    Http.interceptors.request.use((value: AxiosRequestConfig) => {
      const request = { ...value };
      request.headers = buildHeaders();
      return request;
    });

    Http.interceptors.response.use(
      (value: AxiosResponse): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
        return value;
      },
      (err: AxiosError): Promise<any> => {
        return new Promise((resolve, reject) => {
          const originalRequest = err.config;
          const { retry } = store.getState().system;

          if (err.response?.status === HttpStatus.Unauthorized && !retry) {
            store.dispatch({ type: SystemConstants.RETRY, payload: true });
            const response = Http.get<RTResponse>(AuthEndpoints.REFRESH).then((res) => {
              const { accessToken, refreshToken, spotifyAccessToken } = res.data;

              setHeadersToLocalStorage(
                accessToken,
                refreshToken,
                spotifyAccessToken,
                originalRequest.headers[TokenStorageKeys.SpotifyRT],
              );
              setHeaders();
              originalRequest.headers = buildHeaders();
              store.dispatch({ type: SystemConstants.RETRY, payload: false });

              return Http.request(originalRequest);
            });
            resolve(response);
          } else if (err.response?.status === HttpStatus.Unauthorized && retry) {
            store.dispatch({ type: SystemConstants.LOGIN, payload: false });
          }
          return reject(err);
        });
      },
    );

    r("");
  });

  store.dispatch({ type: SystemConstants.HTTP_CONNECTED, payload: true });
};
