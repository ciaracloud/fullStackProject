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

app.get("/test_api", async (req, res) => {
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
  console.log(hotelData);
  res.send(hotelData);
});

app.listen(PORT, console.log(`listening on http://localhost${PORT}`));
