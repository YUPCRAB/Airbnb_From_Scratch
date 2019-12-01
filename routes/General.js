const express = require('express')
const router = express.Router();
const Room = require("../models/Room");

router.get("/", (req, res)=>
{
    res.render('General/home');
});

router.get("/roomList", (req, res)=>
{
    Room.find()
    .then((rooms)=>{
        res.render('General/roomList',
        {
            rooms:rooms
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;
