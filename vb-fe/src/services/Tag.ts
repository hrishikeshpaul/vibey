/* Copyright (C) 2021 Vibey - All Rights Reserved */

import { Http } from "util/Http";
import { TagEndpoints } from "util/Endpoints";

/**
 * Service to retrieve the tags based on the input string
 */
export const searchTags = (substr = "") => {
  return Http.get(`${TagEndpoints.SEARCH}?label=${substr}`);
};
