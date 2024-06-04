// dotenv set up
const dotenv = require("dotenv");
dotenv.config();
// express set up
const express = require("express");
const app = express();
const path = require("path");
// middleware

app.use(express.static(path.join(__dirname, "public")));

const methodOverride = require("method-override");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(methodOverride("_method"));
// parses body of http req coming from form req

app.use(express.urlencoded({extended: false}))
// require controller router obj
const authController = require("./controllers/auth");

// env vars
const PORT = process.env.PORT;

///////////////////////////
// Connect to DB
///////////////////////////
require("./config/db");

// set up our routers (controller router)
app.use("/auth", authController);

///////////////////////////
// Landing Page
///////////////////////////
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// run server on port
const port = PORT ? PORT : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
