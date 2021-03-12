import { LOGIN_URL, AUTHORIZE_URL } from "app/static/url";
import axios from "app/hooks/useAxios";

export const login = async (): Promise<string> => {
  return await axios.get(LOGIN_URL);
};

export const authorize = async (code: string, state: string): Promise<any> => {
  return await axios.get(AUTHORIZE_URL, {
    params: {
      code: code,
      state: state,
    },
  });
};
