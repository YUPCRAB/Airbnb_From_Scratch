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
            User.findById(req.session.userInfo._id)
                .then((user) =>{
                    if(user.BookedRooms.length==0)
                    {
                        user.BookedRooms.push(room)
                        user.save()
                        res.render('User/dash',
                        {
                            rooms:user.BookedRooms
                        });
                    }
                    else
                    {
                        let flag = true;
                        for (let i = 0; i < user.BookedRooms.length; i++)
                        {
                            if(req.params.id==user.BookedRooms[i]._id)
                            {
                                flag = false;
                            }
                        }
                        if(flag)
                        {
                            user.BookedRooms.push(room)
                            user.save()
                            res.render('User/dash',
                            {
                                rooms:user.BookedRooms
                            });
                        }
                        else
                        {
                            const errs = [];
                            errs.push("You have already booked this room~");
                            Room.find()
                            .then((rooms)=>{
                                res.render('General/roomList',
                                {
                                    message:errs,
                                    rooms:rooms
                                });
                            })
                        }
                    }
                })
        })
        .catch(err=>console.log(`Error : ${err}`));    
});

module.exports=router;
