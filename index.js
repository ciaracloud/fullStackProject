const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const app = express();
const path = require("path");
const ejs = require("ejs");
const db = require("./models");
const { Console } = require("console");
const PORT = 3000;
app.use(express.json());
require("dotenv").config();
const client = require("./elephantsql");
const { createSecretKey } = require("crypto");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
app.use(express.static("./public"));

app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

const imp_api_key = process.env.IMP_API_KEY;
const yel_api_key = process.env.YEL_API_KEY;
const sg_api_key = process.env.SG_API_KEY;

// app.get("/home", async (req, res) => {
//   let users = await db.Vacations.findAll();
//   // res.render("home.html", {
//   //   locals: {
//   //     users: users,
//   //   },
//   // });
// });

app.get("/home", async (req, res) => {
  let vacationsData = await db.Vacations.findAll();
  const data = vacationsData;
  // this route will create asomething in your database
  res.render("home.html", { locals: { data: data } }); //only use this when you are trying to render a page or make them go to a page
});

app.post("/create_vacation", async (req, res) => {
  const { firstName, lastName, startDate, endDate, city } = req.body;
  const newVacation = {
    firstName: firstName,
    lastName: lastName,
    startDate: startDate,
    endDate: endDate,
    city: city,
  };
  const addVacation = await db.Vacations.create(newVacation);
  if (addVacation) {
    res.status(200).send("User was created");
  } else {
    res.status(400).send(addVacation);
  }
});

app.get("/hotels", (req, res) => {
  res.render("hotels.html");
});

// app.get("/get_hotels", async (req, res) => {
//   res.send(hotelData);
//   console.log("This is hotel data:", hotelData);
// });

// app.get("/get_events", async (req, res) => {
//   const getEvents = "get Events";
//   res.send(getEvents);
//   console.log(getEvents);
// });

// app.get("/get_excursions", async (req, res) => {
//   const getExcursions = "get Excursions";
//   res.send(getExcursions);
//   console.log(getExcursions);
// });

// app.get("/get_restaurants", async (req, res) => {
//   const getRestaurants = "get Restaurants";
//   res.send(getRestaurants);
//   console.log(getRestaurants);
// });

// app.get("/create_vacation", async (req, res) => {
//   let vacationsData = await db.Vacations.findAll();
//   const data = vacationsData;
//   // this route will create asomething in your database
//   res.render("home.html", { locals: { data: data } }); //only use this when you are trying to render a page or make them go to a page
// });

// app.get("/db", async (req, res) => {
//   let vacationsData = await db.Vacations.findAll();
//   const data = vacationsData;
//   res.render("home.html", { locals: { data: data } });
// });

app.listen(PORT, console.log(`LISTENING on http://localhost${PORT}`));
