const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UnauthorizedError } = require('../errors/customErrors');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('authHeader is');
  console.log(authHeader);
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedError('Unauthorized user!');
    } else {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }
  }
  throw new UnauthorizedError('Unauthorized user!');
};
