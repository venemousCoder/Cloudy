const geoip = require("geoip-lite");
const axios = require("axios");

async function getWeather(req, res) {
  try {
    const ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
    const geo = geoip.lookup(ip);

    let latitude, longitude;

    if (!geo) {
      // Fallback to Nairobi
      latitude = -1.2921;
      longitude = 36.8219;
      console.warn("Geo lookup failed. Using default location. IP:", ip);
    } else {
      [latitude, longitude] = geo.ll;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const response = await axios.get(url);
    const weather = response.data;

    res.status(200).json({ weather });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting weather data" });
  }
}

module.exports = {
  getWeather,
};
