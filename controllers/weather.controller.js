const geoip = require("geoip-lite");
const axios = require("axios");

async function getWeather(req, res) {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
      const geo = geoip.lookup(ip);
      console.log(geo, ip);
      const apiKey = "YOUR_API_KEY";
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.ll[0]}&longitude=${geo.ll[1]}&current_weather=true&timezone=auto`;
      const response = await axios.get(url);
      const weather = response.data;
      res.status(200).json({ weather });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error getting weather data" });
    }
}

module.exports = {
  getWeather,
};
