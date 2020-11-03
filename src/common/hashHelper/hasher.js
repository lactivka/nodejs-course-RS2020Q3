const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('../constants');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const checkHashedPassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    console.log('err in hash checker');
    console.log(err);
  }
};

module.exports = {
  hashPassword,
  checkHashedPassword
};
