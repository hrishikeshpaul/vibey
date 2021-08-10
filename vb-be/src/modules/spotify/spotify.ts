interface Params {
  [key: string]: string | number | boolean | string[];
}

export const generateRandomString = (N: number) =>
  (Math.random().toString(36) + Array(N).join('0')).slice(2, N + 2);

export const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'streaming',
  'user-read-currently-playing',
  'user-read-playback-position',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-modify-playback-state',
];

export const STATE_KEY = 'spotify_auth_state';

export const getQueryString = (params: Params) => {
  const parameters: string[] = [];
  Object.keys(params).forEach((keys: string) => {
    parameters.push(`${keys}=${params[keys]}`);
  });
  return parameters.join('&');
};
