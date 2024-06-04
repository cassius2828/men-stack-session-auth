// dotenv set up
const dotenv = require('dotenv');
dotenv.config();
// express set up
const express = require("express");
const app = express();

// middleware
const methodOverride = require("method-override");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// env vars
const PORT = process.env.PORT;

///////////////////////////
// Connect to DB
///////////////////////////
require("./config/db");

///////////////////////////
// Landing Page
///////////////////////////
app.get('/', (req,res) => {
res.render('index.ejs')
})

// run server on port
const port = PORT ? PORT : 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${port}`);
});
