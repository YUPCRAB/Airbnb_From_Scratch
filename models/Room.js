/******** MONGOOSE.MODEL SETUP ********/
/* MUST DECLARE OUTSIDE OF ROUTE SETTING TO AVOID ERR: Cannot overwrite `User` model once compiled. */

const mongoose = require('mongoose');

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



const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;