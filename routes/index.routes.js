const router = require('express').Router();
const weatherrouter = require('./home.routes');
const errorrouter = require('./error.routes')

router.use('/', weatherrouter);
router.use('/error', errorrouter)

module.exports = router;