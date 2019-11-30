/********************* IMPORT PACKAGES *********************/ 

const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const methodOverride = require('method-override');
// const fileupload = require("express-fileupload");
const session = require("express-session");

//This loads all our environment variables from the keys.env
require("dotenv").config();

const userRoutes = require("./routes/User");
const generalRoutes = require("./routes/General");
const adminRoutes = require("./routes/Admin");

/********************* CREATE OBJECT *********************/ 

let app = express();

/********************* REQUESTS *********************/ 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    secret: 'This is my secret key. This should not be shown to everyone',
    resave: true,
    saveUninitialized: true
  }))

app.use((req,res,next)=>{

    //This is a global variable that can be accessed by templates
    res.locals.user= req.session.userInfo;
    next();
})

/********************* SET ROUTES *********************/ 

app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/admin",adminRoutes);

/*********** MONGOOSE ***********/

const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@web322airbnb-auzwu.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_DB_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
.then (() =>{
    console.log(`Database is connected`)
})
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})


/********************* LISTEN *********************/ 

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>
{
    console.log(`Web Server is Connected to Port: ${PORT}`);
});