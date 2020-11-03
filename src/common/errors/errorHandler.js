const ValidationError = require('mongoose/lib/error/validation');
const { logError } = require('../logger/winston');
const {
  NotFoundError,
  NotValidError,
  ForbiddenError,
  UnauthorizedError
} = require('./customErrors');
const { BAD_REQUEST } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof ValidationError ||
    err instanceof NotFoundError ||
    err instanceof ForbiddenError ||
    err instanceof UnauthorizedError ||
    err instanceof NotValidError
  ) {
    res.sendStatus(err.status || BAD_REQUEST);
  } else {
    res.sendStatus(500);
  }
  logError(req, res, err);
  next();
};

module.exports = errorHandler;
