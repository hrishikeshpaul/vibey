/**
 * Interface to store the errors
 */
export interface Error {
  /**
   * Error code
   */
  statusCode?: number;
  /**
   * Body which will have the error and teh error description
   */
  body?: any;
  /**
   * Headers in the error specified by Spotify
   */
  headers?: any;
}