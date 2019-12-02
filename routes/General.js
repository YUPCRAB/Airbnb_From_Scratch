const express = require('express')
const router = express.Router();
const Room = require("../models/Room");
const User = require("../models/User");
const hasAccessUser= require("../middleware/authUser");


router.get("/", (req, res)=>
{
    res.render('General/home');
});

router.post("/", (req, res)=>
{
    Room.find({location:req.body.where})
    .then((rooms)=>{
        res.render('General/roomList',
        {
            rooms:rooms
        });
    })
});

router.get("/room/:id", (req,res)=>{

    Room.findById(req.params.id)
    .then((room)=>{
        res.render("General/RoomProfile",{
            room:room
        })
    })
    .catch(err=>console.log(`Error : ${err}`));
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

router.post("/roomList/book/:id", hasAccessUser, (req, res)=>
{
        Room.findById(req.params.id)
        .then((room) =>{
            //console.log(`${room}`)
            User.findById(req.session.userInfo._id)
                .then((user) =>{
                    //console.log(`${user}`)
                    user.BookedRooms.push(room)
                    user.save()
                    res.render('User/dash',
                    {
                        rooms:user.BookedRooms
                    });
                })
                
            //req.session.userInfo.BookedRooms.push(room)
        })
        .catch(err=>console.log(`Error : ${err}`));    
});

module.exports=router;
