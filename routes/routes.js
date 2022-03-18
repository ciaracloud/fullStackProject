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
  res.render("home.html", { locals: { data: data } });
});

router.get("/check_vacation", (req, res) => {
  res.render("final.html");
});

// GET DATA ROUTES
router.post("/get_hotels", async (req, res) => {
  const { yel_api_key, url } = req.body;
  console.log(req.body);
  let hotelInfo = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${yel_api_key}`,
    },
  });
  let hotelJson = await hotelInfo.json();
  res.status(200).send(hotelJson?.businesses);
});

router.post("/get_restaurants", async (req, res) => {
  const { yel_api_key, url } = req.body;
  console.log(req.body);
  let restaurantInfo = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${yel_api_key}`,
    },
  });
  let restaurantJson = await restaurantInfo.json();
  res.status(200).send(restaurantJson?.businesses);
});

router.post("/get_excursions", async (req, res) => {
  const { yel_api_key, url } = req.body;
  console.log(req.body);
  let excursionInfo = await fetch(url, {
    method: "get",
    headers: {
      Authorization: `Bearer ${yel_api_key}`,
    },
  });
  let excursionJson = await excursionInfo.json();
  // console.log(restaurantJson?.businesses);
  res.status(200).send(excursionJson?.businesses);
});

router.post("/get_events", async (req, res) => {
  const { url } = req.body;
  console.log(req.body);
  let eventInfo = await fetch(url);
  let eventJson = await eventInfo.json();
  // console.log(restaurantJson?.businesses);
  res.status(200).send(eventJson?.events);
});

// CREATE ROUTES
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

router.post("/create_hotel", async (req, res) => {
  const { name, imageUrl, rating, price, address, phoneNumber, vacationId } =
    req.body;
  const newHotel = {
    name: name,
    imageUrl: imageUrl,
    rating: rating,
    price: price,
    address: address,
    phoneNumber: phoneNumber,
    vacationId: vacationId,
  };
  const addHotel = await db.Lodgings.create(newHotel);
  if (addHotel) {
    res.status(200).send(addHotel);
  } else {
    res.status(400).send(addHotel);
  }
});

router.post("/create_restaurant", async (req, res) => {
  const { name, imageUrl, rating, price, address, phoneNumber, vacationId } =
    req.body;
  const newRestaurant = {
    name: name,
    imageUrl: imageUrl,
    rating: rating,
    price: price,
    address: address,
    phoneNumber: phoneNumber,
    vacationId: vacationId,
  };
  const addRestaurant = await db.Restaurants.create(newRestaurant);
  if (addRestaurant) {
    res.status(200).send(addRestaurant);
  } else {
    res.status(400).send(addRestaurant);
  }
});

router.post("/create_excursion", async (req, res) => {
  const { name, imageUrl, rating, address, phoneNumber, vacationId } = req.body;
  const newExcursion = {
    name: name,
    imageUrl: imageUrl,
    rating: rating,
    address: address,
    phoneNumber: phoneNumber,
    vacationId: vacationId,
  };
  const addExcursion = await db.Excursions.create(newExcursion);
  if (addExcursion) {
    res.status(200).send(addExcursion);
  } else {
    res.status(400).send(addExcursion);
  }
});

// GRAB DATA FROM DB ROUTES
router.post("/find_vacation", async (req, res) => {
  const { resId } = req.body;
  const findVacation = await db.Vacations.findAll({
    where: { id: resId },
  });
  if (findVacation) {
    res.status(200).send(findVacation);
  } else {
    res.status(400).send(findVacation);
  }
});

router.post("/find_hotel", async (req, res) => {
  const { resId } = req.body;
  const findHotel = await db.Lodgings.findAll({
    where: { vacationId: resId },
  });
  if (findHotel) {
    res.status(200).send(findHotel);
  } else {
    res.status(400).send(findHotel);
  }
});

router.post("/find_restaurants", async (req, res) => {
  const { resId } = req.body;
  const findRestaurants = await db.Restaurants.findAll({
    where: { vacationId: resId },
  });
  if (findRestaurants) {
    res.status(200).send(findRestaurants);
  } else {
    res.status(400).send(findRestaurants);
  }
});

router.post("/find_excursions", async (req, res) => {
  const { resId } = req.body;
  const findExcursions = await db.Excursions.findAll({
    where: { vacationId: resId },
  });
  if (findExcursions) {
    res.status(200).send(findExcursions);
  } else {
    res.status(400).send(findExcursions);
  }
});

// DELETE ROUTES
router.post("/delete_hotel", async (req, res) => {
  const { name } = req.body;
  const deleteHotel = await db.Lodgings.destroy({
    where: { name: name },
  });
  if (deleteHotel) {
    res.status(200).send("deleted hotels");
  } else {
    res.status(400).send("error");
  }
});

router.post("/delete_restaurant", async (req, res) => {
  const { name } = req.body;
  const deleteRestaurant = await db.Restaurants.destroy({
    where: { name: name },
  });
  if (deleteRestaurant) {
    res.status(200).send("deleted restaurant");
  } else {
    res.status(400).send("error");
  }
});

router.post("/delete_excursion", async (req, res) => {
  const { name } = req.body;
  const deleteRestaurant = await db.Excursions.destroy({
    where: { name: name },
  });
  if (deleteRestaurant) {
    res.status(200).send("deleted excursion");
  } else {
    res.status(400).send("error");
  }
});

module.exports = router;
