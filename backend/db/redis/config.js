const redis = require("redis");

module.exports = function connetRedis() {
  const client = redis.createClient();

  client.on('connect', function() {
    console.log('Redis connected');
  });

  client.on("error", function(error) {
    console.log('Redis connection error');
    console.error(error);
  });
}
