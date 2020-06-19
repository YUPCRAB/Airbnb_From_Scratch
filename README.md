# F2019_WEB322
MyAirBnb Project

This application was originally created as an assignment for one the courses I took in college. 
Until recently, I have continued to upgrade and test the code to incorporate new features 
and functions even after that course was finished. 
I kept it private out of the concern that other student would copy it and I might unkonwingly 
contribute to academic dishonesty. 

Features that will be added to the application
- Pagination
- Passport authentication



Website link: https://myairbnb-web322.herokuapp.com/

Login info for testing: 
- Admin: yxie68@myseneca.ca (PIN: Yushi123!)
- Regular User: xyt369@hotmail.com (PIN: Yushi123!)
- Please feel free to register as new user (regular user)



Please see following for details of this project.

All back-end functionality: Node JS and Express
Views: Express-Handlebars
Database: MongoDB
Cloud Application Platform (PaaS): Heroku


This application was structured according to the MVC Design pattern.

All sensitive credential information was stored in environment variables .
Examples include: sendgrid access token, MongoDB connection string, etc.

A session is created upon login to maintain the user state until they
logout of the application

Upon an unsuccessful authentication, the application displays the following
message: Sorry, you entered the wrong email and/or password

Also after successfully authenticating,the application determines if the person
logging in is an administrator or a regular user. Users will be redirected to the
appropriate dashboard.

The logout link destroys the session created when the user initially
authenticated.

Routes that can only be accessed when users are logged-in, and is protected.

All created rooms are populated on the front-end of the web application,
specifically on the room listing page, for users to view. A visitor to the web application does not need to be logged in
to view the rooms that was created by the administrator.
