// utils/cache.js
const { promisify } = require("util");
const Memcached = require("memcached");
const memcachedIp = process.env.ENVIRONMENT === "production"? "10.0.0.23:11211": "localhost:11211"
const memcached = new Memcached(
  process.env.CACHE_HOST, // hostname from your dashboard
  {
    username: process.env.CACHE_USERNAME,
    password: process.env.CACHE_PASSWORD ,
    retries: 10,
    retry: 10000,
    remove: true,
  }
);

const memGet = promisify(memcached.get).bind(memcached);
const memSet = promisify(memcached.set).bind(memcached); // adjust host if needed

module.exports = {memGet, memSet};
