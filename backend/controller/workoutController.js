// Schema Model Import
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async(req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get a single workout
const getWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Workout'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error:"No Such Workout"})
    }
    res.status(200).json(workout)
}

// Post a new Workout
const createWorkout = async(req,res)=>{
    const {title, load, reps} = req.body

    let emptyField = []

    if(!title){
        emptyField.push('title')
    }
    if(!load){
        emptyField.push('load')
    }
    if(!reps){
        emptyField.push('reps')
    }
    if(emptyField.length > 0){
        res.status(400).json({error: "Please fill in all the fields" , emptyField})
    }

    // Adding document to database
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
        console.log(`workoutsjs me Post Req me err hai ${error}`);
    }
}

// Delete a Workout
const deleteWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Workout'})
    }
    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(400).json({error:"No Such Workout"})
    }
    res.status(200).json(workout)
    
}

// Update a new Workout
const updateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No Such Workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id:id} , {
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error:"No Such Workout"})
    }
    res.status(200).json(workout)

}


module.exports={
    createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout
}

