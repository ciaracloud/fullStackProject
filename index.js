const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const app = express();
const path = require("path");
const db = require("./models");
const { Console } = require("console");
const PORT = 3000;
app.use(express.json());
require("dotenv").config();
const client = require("./elephantsql");
const { createSecretKey } = require("crypto");
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// template engine connection
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./public"));
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

// routes
const vacations = require("./routes/vacations");
const hotels = require("./routes/hotels");

// routes connections
app.use("", vacations);
app.use("", hotels);

// env passwords
const yel_api_key = process.env.YEL_API_KEY;
const sg_api_key = process.env.SG_API_KEY;

app.listen(PORT, console.log(`LISTENING on http://localhost${PORT}`));
