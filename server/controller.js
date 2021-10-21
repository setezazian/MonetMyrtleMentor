const profileModel = require('./models/profile.js');
const offeringsModel = require('./models/offerings.js');
const messagesModel = require('./models/messages.js');
const AuthModel = require('./models/AuthModel.js');
const AvailabilityModel = require('./models/AvailabilityModel.js');
const ScheduleModel = require('./models/schedules.js');

const getOfferings = (req, res) => {
  const { id } = req.body;
  offeringsModel.getOfferings(id) // (count, page)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => console.log('Error retrieving offerings from model: ', err));
};

const getAllOfferings = (req, res) => {
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
  console.log(req.body.id);
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
      console.log(data);
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

const getSchedule = (req, res) => {
  const dateStr = req.query.date;
  const date = new Date(dateStr);

  ScheduleModel.getOfferingSchedule(date.toISOString().slice(0, 10),
    req.query.offeringId, (err, data) => {
      if (err) {
        console.log('error getting offering schedule', err);
        res.status(500);
      } else {
        console.log(data);
        res.json(data.map((item) => ({
          availability_id: item.availability_id,
          start_time: item.start_time.toTimeString().slice(0, 8),
          end_time: item.end_time.toTimeString().slice(0, 8),
        })));
      }
    });
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
  const user = {};

  profileModel.create(profile)
    .then((profileModelResults) => {
      console.log('Results from profiles insertion: ', profileModelResults);
      const authUser = {
        profileId: profileModelResults.insertId,
        email: req.body.email,
        password: req.body.password,
      };
      user.profile_id = profileModelResults.insertId;
      AuthModel.create(authUser)
        .then((authModelResults) => {
          console.log(`Inserted ${authModelResults.affectedRows} rows into auth table`);
          user.id = authModelResults.insertId;
          req.login({ user }, (err) => {
            if (err) console.log('Error logging new user in: ', err);
            console.log('This is the req.login callback. req.user should be: ', req.user);
          });
          if (!req.body.isMentor) {
            res.status(201).send('Created mentee');
          }
          return null;
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
  getSchedule,
};
