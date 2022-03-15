const express = require("express");
const router = express.Router();
const db = require("../models");
const app = express();
const path = require("path");

const es6Renderer = require("express-es6-template-engine");

app.set("views", path.join(__dirname, "views"));
app.use(express.static("./public"));
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

router.get("/hotels", (req, res) => {
  res.render("hotels.html");
});

module.exports = router;
