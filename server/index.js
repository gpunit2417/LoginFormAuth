const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const GoogleUser = require("./models/Google")
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
const admin = require("firebase-admin");
const serviceAccount = require("../server/login-form-auth-f93cc-firebase-adminsdk-fbsvc-998cb81bb2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // Attach user data to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

app.get("/protected-route", verifyToken, (req, res) => {
  res.json({ message: "You have access!", user: req.user });
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


// Google Auth Route
app.post("/auth/google", async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    let user = await GoogleUser.findOne({ email });

    if (!user) {
      user = new GoogleUser({ name, email, profilePic });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Facebook Auth Route
app.post("/auth/facebook", async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, profilePic });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
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