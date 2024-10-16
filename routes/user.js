const express=require("express");
const { handleSignUp,handleLoginUser } = require("../controllers/user");
const router=express.Router();

router.post('/',handleSignUp);
router.post('/login',handleLoginUser)
module.exports=router;