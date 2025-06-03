const geoip = require("geoip-lite");
const { fetchWeatherApi } = require("openmeteo");
const axios = require("axios");

async function getWeather(req, res) {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Get location info from IP
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // Handle IPv6 localhost
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8"; // fallback IP
    }
    const geoRes = await axios.get(`http://ip-api.com/json/${ip}`);
    const { city, lat, lon } = geoRes.data;
    console.log("Geo location response:", geoRes.data);

    const params = {
      latitude: lat,
      longitude: lon,
      hourly: "temperature_2m",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const hourly = response.hourly();

    const times = [
      ...Array(
        (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
      ),
    ].map(
      (_, i) =>
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000
        )
    );

    const temps = hourly.variables(0).valuesArray();

    const forecast = times.map((time, index) => ({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      temp: temps[index],
      icon: "☀️", // still hardcoded unless you want to use weather codes
    }));

    const weather = {
      city: city || "Unknown City",
      date: new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      temperature: temps[0],
      description: "Sunny", // you can map Open-Meteo weather codes for this
      forecast: forecast.slice(0, 4),
    };

    res.render("weather", { weather });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", { error: err.message });
  }
}

module.exports = {
  getWeather,
};
