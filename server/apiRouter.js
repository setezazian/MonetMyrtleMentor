const router = require('express').Router();
const passport = require('passport');
const {
  getOfferings,
  getAllOfferings,
  getMultiOfferings,
  getProfile,
  getMessages,
  createAuthUser,
  postMessage,
  getSchedule,
} = require('./controller');

router.get('/offerings', getOfferings);

router.get('/allOfferings', getAllOfferings);

router.post('/multiOfferings', getMultiOfferings);

router.get('/profile', getProfile);

router.get('/messages', getMessages);

router.post('/messages', postMessage);
router.get('/schedule', getSchedule);

router.post('/user/new', createAuthUser);

router.post('/user/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
