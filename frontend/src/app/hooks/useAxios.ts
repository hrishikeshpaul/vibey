import axios from "axios";
import { BASE_URL } from "app/static/url";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
