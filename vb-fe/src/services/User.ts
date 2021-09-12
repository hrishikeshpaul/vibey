import { AxiosResponse } from "axios";
import { UserEndpoints } from "util/Endpoints";
import { Http } from "util/Http";
import { User } from "util/User";

export const getMe = (): Promise<AxiosResponse<User>> => {
  return Http.get(UserEndpoints.ME);
};
