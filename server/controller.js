const getActivities = (page = 1, count = 10) => {
  // use Model to retrieve [all?] activities
  // page and count?
  // shape the data and return
};

const getProfile = (userId) => {
  // use a model to retrieve information about a user
  // shape and return data
};

const getMessages = (userId, withId = null, page = 1, count = 10) => {
  // model to retrieve messages
  // shape and return data
};

const createUser = () => {

};

const getUserAuth = () => {

};

module.exports = {
  getActivities,
  getProfile,
  getMessages,
};
