const { ValidationError, NotFoundError } = require('./customErrors');
const { logError } = require('../logger/winston');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    res.sendStatus(err.status);
  } else {
    res.sendStatus(500);
  }
  logError(req, res, err);
  next();
};

module.exports = errorHandler;
