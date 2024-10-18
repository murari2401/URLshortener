const {getUser}=require('../service/auth')

function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("Token from cookie:", userUid);  // Log the token value
    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("Token from cookie:", userUid);  // Log the token value
    const user = getUser(userUid);
    req.user = user;
    next();
}



module.exports={
    restrictToLoggedinUserOnly,
    checkAuth
}