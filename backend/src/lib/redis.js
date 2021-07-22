'use strict';

const { promisify } = require('util');

const { redisJwtClient, redisSocketClient } = require('../db/redis/config');

const getAsyncJwtClient = promisify(redisJwtClient.get).bind(redisJwtClient);
const delAsyncJwtClient = promisify(redisJwtClient.del).bind(redisJwtClient);
const setAsyncJwtClient = promisify(redisJwtClient.set).bind(redisJwtClient);

const getAsyncSocketClient = promisify(redisSocketClient.get)
  .bind(redisSocketClient);
const delAsyncSocketClient = promisify(redisSocketClient.del)
  .bind(redisSocketClient);
const setAsyncSocketClient = promisify(redisSocketClient.set)
  .bind(redisSocketClient);

module.exports = {
  getAsyncJwtClient,
  delAsyncJwtClient,
  setAsyncJwtClient,
  getAsyncSocketClient,
  delAsyncSocketClient,
  setAsyncSocketClient,
};
