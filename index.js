const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const { Console } = require("console");
const PORT = 3000;
require("dotenv").config();
//need to require elephantsql.js

const imp_api_key = process.env.IMP_API_KEY;

app.listen(PORT, console.log(`listening on http://localhost${PORT}`));
