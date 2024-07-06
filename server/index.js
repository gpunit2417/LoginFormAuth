const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://punitgoyal106:login12345@cluster0.pholiph.mongodb.net/",
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Welcome to the Login Authentication Page");
});

const salt = bcrypt.genSaltSync(10);
const secret = "fajhjjjsfahuikjakh";


//post request to send the database of the user after successful signup to the database. 
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmpassword } = req.body;
  console.log(req.body)
  try {

    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, salt),
      confirmpassword: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc); 
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//post request to match the user credentials from the database for the existing user.
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(400).json({ message: "User not found" });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
        });
      });
    } else { 
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (e) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// Define a fallback error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//password = login12345