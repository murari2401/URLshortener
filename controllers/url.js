const { nanoid } = require("nanoid");
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
  module.exports = {
    handleGenerateShortURL,
  };
}
