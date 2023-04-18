const express = require('express');
const app = express();

//.env
const dotenv = require('dotenv');
dotenv.config();

//Imports
const port = process.env.PORT || 4000;
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose');
const cors = require('cors');



// Middleware
app.use(cors())
app.use(express.json()); // Post aur Patch me data access karne ke liye use karte hai

//Routes
app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    //Listen
    app.listen(port, ()=>{
        console.log(`Connected to Database and Listening on port:${port}`);
    })
}
).catch((error)=>{
    console.log(`Error in Server.Js Ben Stokes ${error}`);
})

