import socketio from 'socket.io-client';

import { BASE_URL } from 'app/static/url';

export const socket = socketio.connect(BASE_URL);
