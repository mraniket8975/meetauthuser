const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    uuid : String,
    password : String,
    varified : Boolean,
    userID : String,
    OTP : Number
})

const usermodel = new  mongoose.model('users' , UserSchema)

module.exports  = usermodel;