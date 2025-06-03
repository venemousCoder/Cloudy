const router = require('express').Router();
const weathercontroller = require('../controllers/weather.controller');

router.use('/', weathercontroller.getWeather);

module.exports = router;