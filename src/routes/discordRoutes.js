const express = require('express');
const { getServerInfo, getAuthUserDiscord } = require('../controllers/discordController');

const router = express.Router();

router.get('/guild-info', getServerInfo);

router.get('/user', getAuthUserDiscord);

module.exports = router;