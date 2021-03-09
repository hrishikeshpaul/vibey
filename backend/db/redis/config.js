const redis = require("redis");

module.exports = function connetRedis() {
  const client = redis.createClient();

  client.on("error", function(error) {
    console.error(error);
  });
}
