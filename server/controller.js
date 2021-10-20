const profileModel = require('./models/profile.js');
const offeringsModel = require('./models/offerings.js');
const messagesModel = require('./models/messages.js');
const AuthModel = require('./models/AuthModel.js');
// const ScheduleModel = require('./models/bookings.js');

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

const getSchedule = (req, res) => {
  console.log(req.query);
  const dateStr = req.query.date;
  const date = new Date(dateStr);
  if (Date.UTC(2021, 9, 31) === Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) {
    res.json([{
      start_time: '2021-10-31 01:15:00',
      end_time: '2021-10-31 02:15:00',
      offering_name: 'painting',
      offering_description: 'painting is fun. I will teach you to become Van Gogh!',
    }, {
      start_time: '2021-10-31 04:15:00',
      end_time: '2021-10-31 05:15:00',
      offering_name: 'carpentry',
      offering_description: 'With over a decade experience in the field, I will teach you the craft of carpentry',
    }]);
  } else {
    res.send('no data for this date');
  }
  // ScheduleModel.getSchedule()
  //   .then((data) => {
  //     console.log('successfully retrieved schedule');
  //     res.status(200).send(data);
  //   })
  //   .catch((err) => console.log('Error retrieving schedule: ', err));
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
  getSchedule,
};
