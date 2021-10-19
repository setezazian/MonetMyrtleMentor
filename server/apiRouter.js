const router = require('express').Router();
const passport = require('passport');
const {
  getOfferings,
  getProfile,
  getMessages,
  createUser,
} = require('./controller');

router.get('/offerings', getOfferings);

router.get('/profile', getProfile);

router.get('/messages', getMessages);

router.post('/user/new', createUser);

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
