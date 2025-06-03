const router = require("express").Router();
const weathercontroller = require("../controllers/weather.controller");

router.get("/", weathercontroller.getWeather);

module.exports = router;