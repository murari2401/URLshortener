let nanoid;
import("nanoid").then(module => {
  nanoid = module.nanoid; // Store the nanoid function
});

const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    res.status(400).json({ error: "Give a url in body" });
  }
  const shortId = nanoid(8);
  await URL.create({
    shortID: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.json({shortId})
}

async function handleGetShortURL(req,res){
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID,
    },{$push:{
        visitHistory:{
            timeStamp:Date.now(),
        }
    }})
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortID;
  
    try {
      // Find the document by shortID
      const result = await URL.findOne({ shortID });
  
      // If no document is found, return a 404 error
      if (!result) {
        return res.status(404).json({ error: "ShortID not found" });
      }
  
      // Return the analytics data
      res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
      
    } catch (error) {
      // Catch and handle any potential errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
module.exports = {
    handleGenerateShortURL,
    handleGetShortURL,
    handleGetAnalytics
};

