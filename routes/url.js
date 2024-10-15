const express = require('express')
const { handleGenerateShortURL, handleGetShortURL, handleGetAnalytics } = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateShortURL);
router.get('/:shortID', handleGetShortURL);
router.get('/analytics/:shortID', handleGetAnalytics)
module.exports = router;