const profileModel = require('./models/profile.js');
const offeringsModel = require('./models/offerings.js');
const messagesModel = require('./models/messages.js');
const AuthModel = require('./models/AuthModel.js');
const AvailabilityModel = require('./models/AvailabilityModel.js');

const getOfferings = (req, res) => {
  // Read req params into vars
  // const page = 1;
  // const count = 10;
  const { id } = req.body;
  offeringsModel.getOfferings(id) // (count, page)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving offerings from model: ', err));
};

const getAllOfferings = (req, res) => {
  // Read req params into vars
  // const page = 1;
  // const count = 10;
  offeringsModel.getAllOfferings() // (count, page)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving offerings from model: ', err));
};

const getMultiOfferings = (req, res) => {
  console.log(req.body);
  const { filterArr } = req.body;
  offeringsModel.getMultiOfferings(filterArr) // (count, page)
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
  console.log('req.body: ', req.body);
  const profile = {
    name: `${req.body.firstName} ${req.body.lastName}`,
    photo: req.body.photoUrl,
    mentor: req.body.isMentor,
  };

  profileModel.create(profile)
    .then((profileModelResults) => {
      console.log('Results from profiles insertion: ', profileModelResults);
      const authUser = {
        profileId: profileModelResults.insertId,
        email: req.body.email,
        password: req.body.password,
      };
      AuthModel.create(authUser)
        .then((authModelResults) => {
          console.log(`Inserted ${authModelResults.affectedRows} rows into auth table`);
          if (!req.body.isMentor) {
            res.status(201).send('Created mentee');
            return null;
          }
        })
        .catch((err) => {
          res.status(500).send('Internal server error');
          console.log('Error inserting into auth table: ', err);
        });

      if (!req.body.isMentor) {
        return null;
      }

      const offering = {
        name: req.body.offeringName,
        description: req.body.offeringDesc,
        mentor_id: profileModelResults.insertId,
      };
      return offeringsModel.insertOne(offering);
    })
    .then((offeringModelResults) => {
      if (!req.body.isMentor) {
        return null;
      }

      console.log('Response from adding to offerings table: ', offeringModelResults);
      return AvailabilityModel.insertMany(offeringModelResults.insertId, req.body.availabilities);
    })
    .then((availabilityModelResults) => {
      if (!req.body.isMentor) {
        return null;
      }

      console.log(`Inserted ${availabilityModelResults.affectedRows} row(s) into availabilities table`);
      res.status(201).send('Created mentor');
      return null;
    })
    .catch((err) => {
      console.log('Error inserting new user: ', err);
      res.status(500).send('Internal server error');
    });
};

module.exports = {
  getOfferings,
  getAllOfferings,
  getMultiOfferings,
  getProfile,
  getMessages,
  createProfile,
  createAuthUser,
  postMessage,
};
