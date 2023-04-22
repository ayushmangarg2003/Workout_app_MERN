const express = require("express");
const app = express();

//.env
const dotenv = require("dotenv");
dotenv.config();

//Imports
const port = process.env.PORT || 4000;
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // Post aur Patch me data access karne ke liye use karte hai
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //Listen
    app.listen(port, () => {
      console.log(`Connected to Database and Listening on port:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error in Server.Js Ben Stokes ${error}`);
  });
