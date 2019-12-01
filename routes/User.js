/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const bcrypt= require("bcryptjs");
const hasAccessUser= require("../middleware/authUser");

//This allows you to pefrom CRUD operations on the User colections 
const User = require("../models/User");


router.get("/SignUp", (req, res)=>
{
    res.render('User/regi');
});


router.post("/SignUp", (req, res)=>
{
    const errs = [];

    const UserData = {
        Email: req.body.emailadd,
        FName: req.body.fname,
        LName: req.body.lname,
        PWD: req.body.crtpassword1,
        BDAY: req.body.bday,
        SendMSG: req.body.noemail
    }

    User.findOne({Email:UserData.Email})
    .then(user => {
        if (user != null)
        {
            errs.push("Sorry this email has been registered!");
            res.render('User/regi',
            {
                message:errs
            })
        }
        else
        {
    
            if (req.body.emailadd == "" )
            {
                errs.push("*** Please enter your Email Address");
            }
            else if (req.body.fname == "")
            {
                errs.push("*** Please enter your First Name");
            }
            else if (req.body.lname == "")
            {
                errs.push("*** Please enter your Last Name");
            }
            else if (req.body.crtpassword1 == "")
            {
                errs.push("*** Please enter your Password");
            }
            else if (req.body.crtpassword2 == "")
            {
                errs.push("*** Please confirm your Password");
            }
            else if (req.body.bday == "")
            {
                errs.push("*** Please enter your birthday");
            }

            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

            if (!((req.body.crtpassword1).match(strongRegex)))
            {
                errs.push("*** Your password must be eight characters or longer and contain at least 1 lowercase, 1 uppercase, 1 numeric, and 1 special character.");
            }

            if (!((req.body.crtpassword1).match(req.body.crtpassword2)))
            {
                errs.push("*** Your passwords do not match");
            }

            if (!((req.body.emailadd).match('@')))
            {
                errs.push("*** Please enter a valid email");
            }

            if(errs.length > 0)
            {
                res.render('User/regi',
                {
                    message:errs
                })
            }

            else
            {
                /******** MONGOOSE DATA RETRIEVE & SAVE ********/

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
                        api_key: `${process.env.SENDGRID_API_KEY}`
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
                req.session.userInfo = NewUser;
                res.redirect("/user/dashboard");
            }
        }
    })

});


router.get("/Login", (req, res)=>
{
    res.render('User/Login');
});

router.post("/Login", (req, res)=>
{
    const err = [];

    const UserData = {
        Email: req.body.l_emailadd,
        PWD: req.body.l_password
    }

    User.findOne({Email:UserData.Email})
    .then(user=>{

        //This means that there was no matching email in the database
        if(user == null)
        {
            err.push("Sorry, you entered the wrong email and/or password");
            res.render('User/Login',
            {
                errmessage:err
            })
        }

        //This reprsents tha the email exists
        else
        {
            bcrypt.compare(UserData.PWD,user.PWD)
            .then(isMatched => {
                if(isMatched == true)
                {
                    //It means that the user is authenticated 
                    //Create session 
                    req.session.userInfo = user;
                    if (user.Admin == true){res.redirect("/admin/dashboard");}
                    else {res.redirect("/user/dashboard");}
                }

                else
                {
                    err.push("Sorry, you entered the wrong email and/or password");
                    res.render('User/Login',
                    {
                        errmessage:err
                    })
                }

            })
            .catch(err => console.log(`Error :${err}`));
        }
    })
    .catch(err => console.log(`Something occured ${err}`));
});


router.get("/dashboard", hasAccessUser, (req, res)=>
{
    res.render('User/dash');
});


router.get("/logout",(req,res)=>{

    //This destorys the session
    req.session.destroy();
    res.redirect("/user/Login");

});


module.exports=router;