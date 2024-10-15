const express=require('express')
const {handleGenerateShortURL,handleGetShortURL}=require('../controllers/url')
const router=express.Router();

router.post('/',handleGenerateShortURL);
router.get('/:shortID',handleGetShortURL);
module.exports=router;