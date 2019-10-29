/********************* IMPORT PACKAGES *********************/ 

const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/********************* CREATE OBJECT *********************/ 

let app = express();

/********************* REQUESTS *********************/ 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))

/********************* SET ROUTES *********************/ 

app.get("/", (req, res)=>
{
    res.render('home');
});

app.get("/roomList", (req, res)=>
{
    res.render('roomList');
});

app.get("/dashboard", (req, res)=>
{
    res.render('dash');
});

/*********** MONGOOSE ***********/

const DBURL = "mongodb+srv://Yushi:142358167@web322airbnb-auzwu.mongodb.net/AirBnbUsers?retryWrites=true&w=majority";
mongoose.connect(DBURL,  { useUnifiedTopology: true })
.then (() =>{
    console.log(`Database is connected`)
})
.catch(err=>{
    console.log(`Something went wrong : ${err}`);
})

/******** MONGOOSE END ********/

app.get("/SignUp", (req, res)=>
{
    res.render('regi');
});

/******** MONGOOSE.MODEL SETUP ********/
/* MUST DECLARE OUTSIDE OF ROUTE SETTING TO AVOID ERR: Cannot overwrite `User` model once compiled. */

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
    }
});

const User = mongoose.model('User', UserSchema);

/******** MONGOOSE.MODEL SETUP END ********/

app.post("/SignUp", (req, res)=>
{
    const errs = [];

    if (req.body.emailadd == "" || req.body.fname == "" || req.body.lname == "" || req.body.crtpassword == "" || req.body.bday == "")
    {
        errs.push("*** Please fill out all fields");
    }

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!((req.body.crtpassword).match(strongRegex)))
    {
        errs.push("*** Your password must be eight characters or longer and contain at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character.");
    }

    if (!((req.body.emailadd).match('@')))
    {
        errs.push("*** Please enter a valid email");
    }

    if(errs.length > 0)
    {
    res.render('regi',
    {
        message:errs
    })
    }

    else
    {
        /******** MONGOOSE DATA RETRIEVE & SAVE ********/

        const UserData = {
            Email: req.body.emailadd,
            FName: req.body.fname,
            LName: req.body.lname,
            PWD: req.body.crtpassword,
            BDAY: req.body.bday,
            SendMSG: req.body.noemail
        }

        const NewUser = new User(UserData);
        NewUser.save()
        .then (() =>{
            console.log('UserInfo was inserted into database')
        })
        .catch((err)=>{
            console.log(`UserInfo was not inserted into the database because ${err}`)
        })

        /******** SEND EMAIL ********/
        
        const nodemailer = require('nodemailer');
        const sgTransport = require('nodemailer-sendgrid-transport');

        const options = {
            auth: {
                api_key: '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'
            }
        }

        const mailer = nodemailer.createTransport(sgTransport(options));

        const email = {
            to: `${req.body.emailadd}`,
            from: 'yxie68@myseneca.ca',
            subject: 'Welcome to MyAirBnb',
            text: 'This MyAirBnb site is for Seneca College Fall 2019 WEB322 student (142358167) assignment delivery only. No commercial use.',
            html: `<b><h3>Dear ${req.body.fname}:</h3></b><p>This MyAirBnb site is for Seneca College Fall 2019 WEB322 student (142358167) assignment delivery only. No commercial use.</p><b><h2>Thank you for your support!</h2></b>`
        };
         
        mailer.sendMail(email, function(err, res) {
            if (err) { 
                console.log(err) 
            }
            console.log(res);
        });

        /******** REDIRECT ********/

        res.redirect("/dashboard");
    }

});

app.get("/Login", (req, res)=>
{
    res.render('Login');
});

app.post("/Login", (req, res)=>
{
    const err = [];

    if (req.body.l_emailadd == "" || req.body.l_password == "")
    {
        err.push("*** Login failed");
    }

    if(err.length > 0)
    {
    res.render('Login',
    {
        errmessage:err
    })
    }
});

/********************* LISTEN *********************/ 

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>
{
    console.log(`Web Server is Connected to Port: ${PORT}`);
});