const express = require('express');
const { getServerInfo } = require('../controllers/discordController');

const router = express.Router();

router.get('/guild-info', getServerInfo);

module.exports = router;
