const express = require('express')
const router = express.Router();

router.get("/", (req, res)=>
{
    res.render('General/home');
});

router.get("/roomList", (req, res)=>
{
    res.render('General/roomList');
});

module.exports=router;
