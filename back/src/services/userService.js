const User = require('../db');

const userSearch = async () => {
  const user = await User.findByEmail();
  return user;
};

module.exports = userSearch;
