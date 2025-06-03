// utils/cache.js
const { promisify } = require("util");
const Memcached = require("memcached");
const memcached = new Memcached("localhost:11211");

const memGet = promisify(memcached.get).bind(memcached);
const memSet = promisify(memcached.set).bind(memcached); // adjust host if needed

module.exports = {memGet, memSet};
