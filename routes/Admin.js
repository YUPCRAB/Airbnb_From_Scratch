/*********************ADMIN ROUTES***************************/
const express = require('express')
const router = express.Router();
const hasAccess= require("../middleware/auth");

//This allows you to pefrom CRUD operations on the User colections 
const Admin = require("../models/User");

router.get("/dashboard", hasAccess, (req, res)=>
{
    res.render('Admin/AdminDash');
});

module.exports=router;