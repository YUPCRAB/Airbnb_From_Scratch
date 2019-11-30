/******** MONGOOSE.MODEL SETUP ********/
/* MUST DECLARE OUTSIDE OF ROUTE SETTING TO AVOID ERR: Cannot overwrite `User` model once compiled. */

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Users = mongoose.Schema;

const UserSchema = new Users({
    Email: 
    {
        type: String,
        required: true
    },
    FName: 
    {
        type: String,
        required: true
    },
    LName: 
    {
        type: String,
        required: true
    },
    PWD: 
    {
        type: String,
        required: true
    },
    BDAY: 
    {
        type: Date,
        required: true
    },
    SendMSG: 
    {
        type: String,
        required: false,
        default: 'No'
    },
    Admin:
    {
        type: Boolean,
        required: false,
        default: false
    }
});

UserSchema.pre("save",function(next){
  
    bcrypt.genSalt(10)
    .then(salt=>{
        bcrypt.hash(this.PWD,salt)
        .then(hash=>{
            this.PWD = hash
            // The below code is a call back function that does the following :
             //It forces the code of execution to  move onto the next code in the execution queue 
            next();
        })
    })

})

const User = mongoose.model('User', UserSchema);

module.exports=User;