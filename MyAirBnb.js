/********************* IMPORT PACKAGES *********************/ 

const express = require("express");
const exphbs  = require('express-handlebars');

/********************* CREATE OBJECT *********************/ 

let app = express();

/********************* REQUESTS *********************/ 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

/********************* SET ROUTES *********************/ 

app.get("/", (req, res)=>
{
    res.render('home');
});

app.get("/roomList", (req, res)=>
{
    res.render('roomList');
});

app.get("/userReg", (req, res)=>
{
    res.render('userReg');
});

/********************* LISTEN *********************/ 

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>
{
    console.log(`Web Server is Connected to Port: ${PORT}`);
});