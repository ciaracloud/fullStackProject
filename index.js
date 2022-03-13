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

app.get("/get_data", async (req, res) => {
  const getEventsData = async () => {
    let url = `https://api.seatgeek.com/2/events?client_id=${sg_api_key}&lat=25.7617&lon=-80.1918&datetime_utc=2022-03-20`;
    let events = await fetch(url);
    let eventsJson = await events.json();
    return eventsJson;
  };
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
  const eventsData = await getEventsData();
  const hotelData = await getHotelData();
  res.send(eventsData);
  console.log("this is event data:", eventsData);
});

app.get("/get_yelp/", async (req, res) => {
  const getYelpData = async () => {
    let url = `https://api.yelp.com/v3/businesses/search?location="Houston"&term="excursion"`;
    let yelpInfo = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${yel_api_key}`,
      },
    });
    let yelpJson = await yelpInfo.json();
    return yelpJson;
  };
  const yelpData = await getYelpData();
  res.send(yelpData);
  console.log("This is Yelp Data", yelpData);
});

console.log("i am adding this to test if you can pull");

app.listen(PORT, console.log(`listening on http://localhost${PORT}`));
