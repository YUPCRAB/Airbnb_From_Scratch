const hasAccessAdmin = (req,res,next)=>
{
    if(req.session.userInfo != null && req.session.userInfo.Admin == true)
    {
        next();
    }
    else
    {
        res.redirect("/user/Login");
    }
}

module.exports=hasAccessAdmin;