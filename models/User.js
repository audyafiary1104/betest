const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema;

const UserSchema = new schema({
    userName:{
        type:String,
        required:true, 
        unique: true
    },
    accountNumber:{
        type:String,
        required:true, 
        unique: true
    },
    identityNumber:{
        type:String,
        required:true, 
        unique: true
    },
    emailAddress:{
        type:String,
        required:true, 
        unique: true
        
    },
    password:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});
UserSchema.plugin(uniqueValidator, { message: 'Error,  {PATH} must be unique.' })
module.exports = User = mongoose.model("users",UserSchema);