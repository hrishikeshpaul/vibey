import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';


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

export const redisClient = initRedis();
export const redisStore = connectRedis(session);