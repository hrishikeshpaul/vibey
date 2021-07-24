import axios from "axios";
import { BASE_URL } from "app/static/url";

// TODO add access token and refresh token to headers
export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
