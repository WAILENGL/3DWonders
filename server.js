const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
const publicPath = path.join(__dirname, "public");
app.use("/public", express.static(publicPath));

app.use(express.static(path.join(__dirname, "dist")));
app.use(require("./config/checkToken").checkTokenMiddleware);
// Put API routes here, before the "catch all" route
app.get("/api", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/api/user", require("./routes/api/usersRouter"));
app.use("/api/product", require("./routes/api/productsRouter"));
app.use("/api/orders", require("./routes/api/ordersRouter"));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
