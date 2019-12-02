/******** MONGOOSE.MODEL SETUP ********/
/* MUST DECLARE OUTSIDE OF ROUTE SETTING TO AVOID ERR: Cannot overwrite `User` model once compiled. */

const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Rooms = mongoose.Schema;

const RoomSchema = new Rooms({
    title: 
    {
        type: String,
        required: true
    },
    price: 
    {
        type: Number,
        required: true
    },
    detail: 
    {
        type: String,
        required: true
    },
    location: 
    {
        type: String,
        required: true
    },
    RoomPic:
    {
        type: String
    }
});

//const Room = mongoose.model('Room', RoomSchema);

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
    },
    BookedRooms:
    {
        type: [RoomSchema]
    }
});

// UserSchema.pre("save",function(next){
  
//     bcrypt.genSalt(10)
//     .then(salt=>{
//         bcrypt.hash(this.PWD,salt)
//         .then(hash=>{
//             this.PWD = hash
//             next();
//         })
//     })

// })

const User = mongoose.model('User', UserSchema);

module.exports=User;