const router = require('express').Router();
const { getActivities, getProfile, getMessages } = require('./controller');

router.get('/activities', getActivities);

router.get('/profile', getProfile);

router.get('/messages', getMessages);

module.exports = router;
