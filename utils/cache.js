// utils/cache.js
const { promisify } = require("util");
const Memcached = require("memcached");
const memcachedIp = process.env.ENVIRONMENT === "production"? "10.0.0.23:11211": "localhost:11211"
const memcached = new Memcached(memcachedIp);

const memGet = promisify(memcached.get).bind(memcached);
const memSet = promisify(memcached.set).bind(memcached); // adjust host if needed

module.exports = {memGet, memSet};
