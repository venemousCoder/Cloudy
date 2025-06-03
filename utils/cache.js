// utils/cache.js
const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211'); // adjust host if needed

module.exports = memcached;
