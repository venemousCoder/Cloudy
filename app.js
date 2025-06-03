const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const memcached = require("./utils/cache");
const layouts = require("express-ejs-layouts");
const path = require("path");
const routes = require("./routes/index.routes");

app.use(layouts);
app.set("layout", "layout"); 

app.set("view engine", "ejs");
app.use("/public",express.static(path.join(__dirname, "public")));

app.use('/',routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
