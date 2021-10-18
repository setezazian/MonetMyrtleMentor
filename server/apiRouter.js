const router = require('express').Router();
const { getActivities, getProfile, getMessages } = require('./controller');

router.get('/activities', (req, res) => {
  // get activities from database, finalize shape, respond
  getActivities()
    .then((dbData) => {
      res.status(200).send(dbData);
    })
    .catch(err => console.log('Error retrieving from database: ', err));
});

router.get('/profile', (req, res) => {
  // get and finalize data, finalize shape, respond
  getProfile()
    .then((dbData) => {
      res.status(200).send(dbData);
    })
    .catch(err => console.log('Error retrieving from database: ', err));
});

router.get('/messages', (req, res) => {
  // get and finalize data, finalize shape, respond
  getMessages()
    .then((dbData) => {
      res.status(200).send(dbData);
    })
    .catch(err => console.log('Error retrieving from database: ', err));
});

module.exports = router;
