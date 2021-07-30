import axios from "axios";
import { BASE_URL } from "util/Endpoints";

export enum Status {
  OK = 200,
  Error = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalError = 500,
}

// TODO add access token and refresh token to headers
export const Http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
