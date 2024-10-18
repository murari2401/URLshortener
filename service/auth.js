const jwt = require('jsonwebtoken')
require("dotenv").config(); 
const SECRET = process.env.SECRET;

function setUser(user) {
    const payload = { id: user._id, email: user.email };  // Only include essential fields
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });  // Sign with expiration
}



function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch (err) {
        console.error("JWT verification error:", err.message);
        return null;
    }
}


module.exports={
    getUser,
    setUser
}