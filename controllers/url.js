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

module.exports = {
    handleGenerateShortURL,
    handleGetShortURL
};

