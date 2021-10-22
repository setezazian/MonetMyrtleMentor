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
  searchOfferings,
} = require('./controller');

router.get('/offerings', getOfferings);

router.get('/allOfferings', getAllOfferings);

router.post('/multiOfferings', getMultiOfferings);

router.post('/searchOfferings', searchOfferings);

router.post('/profile', getProfile);

router.get('/messages', getMessages);

router.post('/getMessages', getMessages);

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
  res.status(200).send('Logged out');
});

router.get('/me', (req, res) => {
  let user = 'null';
  if (req.user !== undefined) {
    user = req.user;
  }
  console.log('=== This is in the request\'s \'session\' property: \n', req.session);
  console.log('=== This is the user: ', user);
  res.status(200).send(user);
});

module.exports = router;
