const profileModel = require('./models/profile.js');
const offeringsModel = require('./models/offerings.js');
const messagesModel = require('./models/messages.js');
const AuthModel = require('./models/AuthModel.js');

const getOfferings = (req, res) => {
  // Read req params into vars
  // const page = 1;
  // const count = 10;
  offeringsModel.getOfferings() // (count, page)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving offerings from model: ', err));
};

const getProfile = (req, res) => {
  if (req.body.id === undefined) {
    res.status(400).send('Profile ID required');
  }

  profileModel.getById(req.body.id)
    .then((data) => {
      console.log('successfully retrieved profile');
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving profile: ', err));
};

const getMessages = (req, res) => {
  messagesModel.getMessages() // (userId, withId = null, page = 1, count = 10)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving messages from model: ', err));
};

const postMessage = (req, res) => {
  messagesModel.postMessage(req.body)
    .then(() => {
      res.status(201).send('posted message');
    })
    .catch((err) => console.log('Error creating message ', err));
};

const createProfile = (req, res) => {
  profileModel.create(req.body)
    .then(() => {
      res.status(201).send('Created');
    })
    .catch((err) => console.log('Error creating user" ', err));
};

const createAuthUser = (req, res) => {
  profileModel.create(req.body)
    .then(() => AuthModel.create(req.body))
    .then((dbResponse) => {
      console.log('Response from adding to auth table: ', dbResponse);
      res.status(201).send('Created');
    })
    .catch((err) => {
      console.log('Error adding an entry to auth table: ', err);
      res.status(500).send('Internal server error');
    });
};

module.exports = {
  getOfferings,
  getProfile,
  getMessages,
  createProfile,
  createAuthUser,
  postMessage,
};
