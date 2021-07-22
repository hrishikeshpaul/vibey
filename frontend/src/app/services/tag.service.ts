/* Copyright (C) 2021 Vibey - All Rights Reserved */

import axios from "../hooks/useAxios";
import { SEARCH_TAG_URL } from "../static/url";

/**
 * Service to retirve the tags based on the input string
 */
export const searchTags = (substr = '') => {
  return axios.get(`${SEARCH_TAG_URL}?str=${substr}`);
}