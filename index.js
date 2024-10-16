const express = require('express');
const path = require('path');
const cookieParser=require('cookie-parser')
const URL = require('./models/url');
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require("./routes/user");
const {connectToDB}=require('./connect');
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')
const app = express();
require("dotenv").config();
const PORT = 8001;

connectToDB(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected!!");
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

app.use('/url', restrictToLoggedinUserOnly, urlRoute); 
app.use('/', staticRouter);
app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})