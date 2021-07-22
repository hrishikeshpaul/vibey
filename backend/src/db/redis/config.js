'use strict';

const redis = require('redis');

const initRedis = _ => {
  const jwtClient = redis.createClient();
  const socketClient = redis.createClient(process.env.REDIS_SOCKET_PORT);

  jwtClient.on('connect', () => {
    console.log('Redis JWT connected');
  });
  socketClient.on('connect', () => {
    console.log('Redis Socket connected');
  });

  jwtClient.on('error', function(error) {
    console.log('Redis JWT connection error');
    console.error(error);
  });

  socketClient.on('error', function(error) {
    console.log('Redis JWT connection error');
    console.error(error);
  });
  return [jwtClient, socketClient];
};

const [redisJwtClient, redisSocketClient] = initRedis();

module.exports = {
  redisJwtClient,
  redisSocketClient,
};
