const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const { Console } = require("console");
const PORT = 3000;
require("dotenv").config();
const client = require("./elephantsql");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const imp_api_key = process.env.IMP_API_KEY;
const yel_api_key = process.env.YEL_API_KEY;
const sg_api_key = process.env.SG_API_KEY;

app.get("/get_hotels", async (req, res) => {
  const getHotelData = async () => {
    let url = `https://api.impala.travel/v1/hotels?end=2022-07-05&latitude=40.7128&longitude=-74.0060&radius=5000&sortBy=distance_m:desc&start=2022-07-01`;
    let hotels = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${imp_api_key}`,
      },
    });
    let hotelJson = await hotels.json();
    return hotelJson;
  };
  const hotelData = await getHotelData();
  res.send(hotelData);
  console.log("This is hotel data:", hotelData);
});

app.get("/get_events", async (req, res) => {
  const getEventsData = async () => {
    let url = `https://api.seatgeek.com/2/events?client_id=${sg_api_key}&lat=25.7617&lon=-80.1918&datetime_utc=2022-03-20`;
    let events = await fetch(url);
    let eventsJson = await events.json();
    return eventsJson;
  };
  const eventsData = await getEventsData();
  res.send(eventsData);
  console.log("This is event data:", eventsData);
});

app.get("/get_excursions", async (req, res) => {
  const getExcursions = async () => {
    let url = `https://api.yelp.com/v3/businesses/search?location="Houston"&term="excursion"`;
    let excursionInfo = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${yel_api_key}`,
      },
    });
    let excursionJson = await excursionInfo.json();
    return excursionJson;
  };
  const excursionData = await getExcursions();
  res.send(excursionData);
  console.log("This is excursion data:", excursionData);
});

app.get("/get_restaurants", async (req, res) => {
  const getRestaurants = async () => {
    let url = `https://api.yelp.com/v3/businesses/search?location="Houston"&term="restaurant"`;
    let restaurantInfo = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${yel_api_key}`,
      },
    });
    let restaurantJson = await restaurantInfo.json();
    return restaurantJson;
  };
  const restaurantData = await getRestaurants();
  res.send(restaurantData);
  console.log("This is restaurant data:", restaurantData);
});

app.listen(PORT, console.log(`listening on http://localhost${PORT}`));
