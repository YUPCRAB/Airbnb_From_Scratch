/*********************ADMIN ROUTES***************************/
const express = require('express')
const router = express.Router();
const path = require("path");
const hasAccessAdmin= require("../middleware/authAdmin");

//This allows you to pefrom CRUD operations on the User colections 
const Room = require("../models/Room");


router.get("/dashboard", hasAccessAdmin, (req, res)=>
{
    Room.find()
    .then((rooms)=>{
        res.render('Admin/AdminDash',
        {
            rooms:rooms
        });
    })
    .catch(err=>console.log(`Error : ${err}`));
});

router.get("/createRoom", hasAccessAdmin, (req, res)=>
{
    res.render('Admin/createRoom');
});

router.post("/createRoom", hasAccessAdmin, (req, res)=>
{
    const newRoom=
    {
        title: req.body.title,
        price: req.body.price,
        location: req.body.location,
        detail: req.body.detail
    }

    const errors= [];

    //Test to see if user did not upload file
    if(req.files==null)
    {
        errors.push("Sorry you must upload a file")
    }   

    //User uploaded file
    else
    {       //file is not an image
        if(req.files.RoomPic.mimetype.indexOf("image")==-1)
        {
            errors.push("Sorry you can only upload images : Example (jpg, gif, png) ")
        }
    }

    if(errors.length > 0)
    {
        res.render("Admin/createRoom",{
            errors:errors,
            title: newRoom.title,
            price: newRoom.price,
            location: newRoom.location,
            detail: newRoom.detail
        })
    }

    else 
    {
        const room = new Room(newRoom);
        //create  new user
        room.save()
        .then(room=>{
    
            //rename file to include the userid
            req.files.RoomPic.name = `db_${room._id}${path.parse(req.files.RoomPic.name).ext}`
            
            //upload file to server
            req.files.RoomPic.mv(`public/RoomPics/${req.files.RoomPic.name}`)
            .then(()=>{

                //Then is needed to refer to associate the uploaded image to the user
                Room.findByIdAndUpdate(room._id,{
                    RoomPic:req.files.RoomPic.name 
                })
                .then(()=>{
                    console.log(`File name was updated in the database`)
                    res.redirect("/admin/dashboard");  
                })
                .catch(err=>console.log(`Error :${err}`)); 
            });

        })
        .catch(err=>console.log(`Error :${err}`));
    }
});

router.get("/room/:id", hasAccessAdmin, (req,res)=>{

    Room.findById(req.params.id)
    .then((room)=>{
        res.render("Admin/RoomProfile",{
            room:room
        })
    })
    .catch(err=>console.log(`Error : ${err}`));
})


//Route to direct user to edit task form
router.get("/edit/:id", hasAccessAdmin, (req,res)=>
{
    Room.findById(req.params.id)
    .then((room)=>{

        res.render("Admin/editRoom",{
            room:room
        })

    })
    .catch(err=>console.log(`Error : ${err}`));
});

//Route to update a task based on the information entered in the task form
router.put("/edit/:id", hasAccessAdmin, (req,res)=>
{
    const errors= [];
    Room.findById(req.params.id)
    .then((room)=>{

        room.title = req.body.title,
        room.price = req.body.price,
        room.location = req.body.location,
        room.detail = req.body.detail

        if(req.files != null && req.files.RoomPicU.mimetype.indexOf("image") == -1)
        {
            errors.push("Sorry you can only upload images : Example (jpg, gif, png) ")
        }
  
        if(errors.length > 0)
        {
            res.render("Admin/createRoom",{
                errors: errors,
                title: room.title,
                price: room.price,
                location: room.location,
                detail: room.detail
            })
        }

        else if (req.files == null)
        {
            room.save()
            .then(()=>{
                res.redirect("/admin/dashboard") 
             })
             .catch(err=>console.log(`Error : ${err}`));
        }

        else 
        {
            room.save()
            .then(room=>{
        
                //rename file to include the userid
                req.files.RoomPicU.name = `db_${room._id}${path.parse(req.files.RoomPicU.name).ext}`
                
                //upload file to server
                req.files.RoomPicU.mv(`public/RoomPics/${req.files.RoomPicU.name}`)
                .then(()=>{

                    //Then is needed to refer to associate the uploaded image to the user
                    Room.findByIdAndUpdate(room._id,{
                        RoomPic:req.files.RoomPicU.name 
                    })
                    .then(()=>{
                        console.log(`File name was updated in the database`)
                        res.redirect("/admin/dashboard");  
                    })
                    .catch(err=>console.log(`Error :${err}`)); 
                });

            })
            .catch(err=>console.log(`Error :${err}`));
        }
    })
        
});

//Route used to delete task 
router.delete("/delete/:id", hasAccessAdmin, (req,res)=>
{
    Room.deleteOne({_id:req.params.id})
    .then((room)=>{

        res.redirect("/admin/dashboard");
    })
    .catch(err=>console.log(`Error : ${err}`));
});

module.exports=router;