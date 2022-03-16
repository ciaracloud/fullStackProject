const express = require("express");
const router = express.Router();
const db = require("../models");
const cors = require("cors");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

const es6Renderer = require("express-es6-template-engine");

app.set("views", path.join(__dirname, "views"));
app.use(express.static("./public"));
app.use(express.json());
app.use(cors());
app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

router.get("/home", async (req, res) => {
  let vacationsData = await db.Vacations.findAll();
  const data = vacationsData;
  // this route will create asomething in your database
  res.render("home.html", { locals: { data: data } }); //only use this when you are trying to render a page or make them go to a page
});

router.post("/create_vacation", async (req, res) => {
  const { firstName, lastName, startDate, endDate, city } = req.body;
  const newVacation = {
    firstName: firstName,
    lastName: lastName,
    startDate: startDate,
    endDate: endDate,
    city: city,
  };
  const addVacation = await db.Vacations.create(newVacation);
  console.log(addVacation.id);

  if (addVacation) {
    res.status(200).send(addVacation);
  } else {
    res.status(400).send(addVacation);
  }
});

router.post("/get_hotels", async (req, res) => {
  const { yel_api_key, url } = req.body;
  console.log(req.body);
  let restaurantInfo = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${yel_api_key}`,
    },
  });
  let restaurantJson = await restaurantInfo.json();
  // console.log(restaurantJson?.businesses);
  res.status(200).send(restaurantJson?.businesses);
});

module.exports = router;
