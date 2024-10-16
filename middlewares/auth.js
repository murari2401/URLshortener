const {getUser}=require('../service/auth')

function restrictToLoggedinUserOnly(req, res, next) {
const { uid } = req.cookies;

if (!uid || !getUser(uid)) {
    // If the user is not logged in, redirect to login page
    console.log("No session or invalid session. Redirecting to login.");
    return res.redirect("/login");
}

// Otherwise, continue to the next middleware or route
console.log("Session is valid. Proceeding to home.");
next();
}

  
module.exports={
    restrictToLoggedinUserOnly,
}