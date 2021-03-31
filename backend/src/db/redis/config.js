const redis = require('redis');
const connectRedis = require('connect-redis')
const session = require('express-session');


const initRedis = _ => {
  const client = redis.createClient();

  client.on('connect', function() {
    console.log('Redis connected');
  });

  client.on("error", function(error) {
    console.log('Redis connection error');
    console.error(error);
  });

  return client;
}

const redisClient = initRedis();
const redisStore = connectRedis(session);

module.exports = {
  redisClient,
  redisStore
}