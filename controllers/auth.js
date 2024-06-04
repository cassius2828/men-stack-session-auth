const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
// express router
const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  try {
    const userDoc = await UserModel.findOne({ username: req.body.username });
    // if no user is found, userDoc is undefined
    if (userDoc) {
      return res.send("username already taken");
    }
    // compare passwords
    if (req.body.password !== req.body.confirmPassword) {
      return res.send(`Password and Confirm Password must match`);
    }
    // hash passwords then store in db
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    req.body.password = hashedPassword;
    console.log(hashedPassword, " <-- hashed password");
    console.log(req.body.password, " <-- password");
    const newUser = await UserModel.create(req.body);
    console.log(newUser, " <-- new user");
    return res.send(`thank you for signing up ${newUser.username}`);
  } catch (error) {
    console.log(`Error occured in sign up process: `, error);
  }
});
// this is an obj with the router http endpoint connected to it
module.exports = router;
