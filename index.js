const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const {connectToDB}=require('./connect');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const app = express();
require("dotenv").config();
const PORT = 8001;

connectToDB(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected!!");
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json())

app.use('/url', urlRoute); 
app.use('/', staticRouter);
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})