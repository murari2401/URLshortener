const {v4:uuidv4}=require('uuid');
const User = require('../models/user');
const {setUser, getUser} = require('../service/auth')
async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  try {
    await User.create({
      name,
      email,
      password,
    });
    return res.render('home');
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).send('Server error');
  }
}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log(user);
    if (!user)
      return res.render("login", {error: "Invalid Username or Password",});
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);
    return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleLoginUser
};
