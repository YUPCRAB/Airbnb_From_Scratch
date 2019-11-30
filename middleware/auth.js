const hasAccess = (req,res,next)=>
{
    if(req.session.userInfo == null)
    {
        res.redirect("/user/Login");
    }
    else
    {
        next();
    }
}

module.exports=hasAccess;