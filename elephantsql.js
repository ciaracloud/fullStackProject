const pg = require("pg");
require("dotenv").config();
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
    console.log("connected to database");
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

module.exports = client;
