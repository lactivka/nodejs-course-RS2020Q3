const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('../constants');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkHashedPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  checkHashedPassword
};
