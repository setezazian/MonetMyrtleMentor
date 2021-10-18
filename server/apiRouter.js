const router = require('express').Router();
const { getOfferings, getProfile, getMessages } = require('./controller');

router.get('/offerings', getOfferings);

router.get('/profile', getProfile);

router.get('/messages', getMessages);

module.exports = router;
