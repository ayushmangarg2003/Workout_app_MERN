const express = require('express');

// Callback Functions are defined in workoutControllers
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controller/workoutController');
const router = express.Router();

// Get all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id', getWorkout)

// Post a new Workout
router.post('/', createWorkout)

// Delete a Workout
router.delete('/:id', deleteWorkout)

// Update a new Workout
router.patch('/:id',updateWorkout)

module.exports = router;