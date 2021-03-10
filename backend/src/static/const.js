export const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
export const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'streaming', 'user-read-currently-playing', 'user-read-playback-position', 'playlist-read-private', 'playlist-read-collaborative'];
export const STATE_KEY = 'spotify_auth_state';