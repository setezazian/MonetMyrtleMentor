const router = require('express').Router();
const { getOfferings, getAllOfferings, getProfile, getMessages } = require('./controller');

router.get('/offerings', getOfferings);

router.get('/allOfferings', getAllOfferings);

router.get('/profile', getProfile);

router.get('/messages', getMessages);

module.exports = router;
