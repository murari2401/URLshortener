const express = require('express');
const urlRoute = require('./routes/url');
const {connectToDB}=require('./connect');
const URL = require('./models/url');
const app = express();
require("dotenv").config();
const PORT = 8001;

connectToDB(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected!!");
})
app.use(express.json())

app.use('/url',urlRoute);

app.get('/:shortID',urlRoute);
app.get('/analytics/:shortID',urlRoute)
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})