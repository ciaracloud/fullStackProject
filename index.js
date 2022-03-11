const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const pg = require("pg");
const { Console } = require("console");
const PORT = 3000;
require("dotenv").config();

const imp_api_key = process.env.IMP_API_KEY;
const pg_pw = process.env.PG_PW;

const conString = `postgres://ixbnmsph:${pg_pw}@otto.db.elephantsql.com/ixbnmsph`; //Can be found in the Details page
const client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

app.listen(PORT, console.log(`listening on http://localhost${PORT}`));
