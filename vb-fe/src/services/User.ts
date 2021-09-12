import { UserEndpoints } from "util/Endpoints";
import { Http } from "util/Http";

export const getMe = () => {
  return Http.get(UserEndpoints.ME);
};
