const hasAccessUser = (req,res,next)=>
{
    if(req.session.userInfo != null && req.session.userInfo.Admin == false)
    {
        next();
    }
    else
    {
        res.redirect("/user/Login");
    }
}

module.exports=hasAccessUser;