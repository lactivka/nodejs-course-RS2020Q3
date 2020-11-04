const usersRepo = require('../users/user.DB.repository');
const { checkHashedPassword } = require('../../common/hashHelper/hasher');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { ForbiddenError } = require('../../common/errors/customErrors');

const signToken = async (userLogin, password) => {
  const users = await usersRepo.getByProps({ login: userLogin });
  const user = users[0];

  if (!user) {
    throw new ForbiddenError('Wrong login or password');
  }

  const { password: hashedPassword } = user;
  const comparisonRes = await checkHashedPassword(password, hashedPassword);
  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
    return token;
  }

  throw new ForbiddenError('Wrong login or password');
};

module.exports = {
  signToken
};
