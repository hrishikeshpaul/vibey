/* Copyright (C) 2021 Vibey - All Rights Reserved */
import { AxiosResponse } from "axios";

import { Http } from "util/Http";
import { TagEndpoints } from "util/Endpoints";
import { Tag } from "util/Tags";

/**
 * Service to retrieve the tags based on the input string
 */
export const searchTags = (substr = ""): Promise<AxiosResponse<Tag[]>> => {
  return Http.get(`${TagEndpoints.SEARCH}?label=${substr}`);
};
