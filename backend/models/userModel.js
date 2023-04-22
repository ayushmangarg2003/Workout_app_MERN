const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

userSchema.statics.signup = async function(email, password){
    // Validating
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }
    const exists = await this.findOne({email})
    if (exists){
        throw Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email , password:hash})

    return user
}

// Login Method
userSchema.statics.login = async function(email, password){
    // Validating
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error('User does not exist')
    }
    const match = await bcrypt.compare(password , user.password)

    if (!match){
        throw Error()
    }

    return user
}



module.exports= mongoose.model('User', userSchema);