'use strict';

const { promisify } = require('util');

const { redisJwtClient } = require('../db/redis/config');

const getAsyncJwtClient = promisify(redisJwtClient.get).bind(redisJwtClient);
const delAsyncJwtClient = promisify(redisJwtClient.del).bind(redisJwtClient);
const setAsyncJwtClient = promisify(redisJwtClient.set).bind(redisJwtClient);

module.exports = {
  getAsyncJwtClient,
  delAsyncJwtClient,
  setAsyncJwtClient,
};
