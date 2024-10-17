let nanoid;
import("nanoid").then(module => {
  nanoid = module.nanoid; // Store the nanoid function
});

const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Give a url in body" });
  }
  try{
    const result = await URL.findOne({
        redirectURL:body.url,
        })
        if(result){
          // return res.json({shortId: result.shortID});
          return res.render('home',{
            ID: result.shortID,
          });
        }

    const shortId = nanoid(8);
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    });
    // return res.json({shortId})
    return res.render('home',{
      ID: shortId,
    });
  }
  catch(error){
    console.error(error);
    return res.status(500).json({Error:"Internal server error"});
  }
}

async function handleGetShortURL(req, res) {
  const shortID = req.params.shortID;
  console.log("Received shortID:", shortID); // Log the received shortID

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      console.log("Short URL not found for shortID:", shortID); // Log if not found
      return res.status(404).send('Short URL not found');
    }

    console.log("Redirecting to:", entry.redirectURL); // Log the redirection URL
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error fetching or updating URL:', error);
    return res.status(500).send('Server error');
  }
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
      return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
      
    } catch (error) {
      // Catch and handle any potential errors
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
module.exports = {
    handleGenerateShortURL,
    handleGetShortURL,
    handleGetAnalytics
};

