const express = require('express');
const { loginUser, signupUser } = require('../controller/userController');
const router = express.Router();

// Login
router.post('/login' , loginUser)

// SignUp 
router.post('/signup' , signupUser)


module.exports = router;