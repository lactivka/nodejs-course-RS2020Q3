const ValidationError = require('mongoose/lib/error/validation');
const { logError } = require('../logger/winston');
const { NotFoundError } = require('./customErrors');
const { BAD_REQUEST } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  console.log('err is in catcher', err instanceof ValidationError);
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    res.sendStatus(err.status || BAD_REQUEST);
  } else {
    res.sendStatus(500);
  }
  logError(req, res, err);
  next();
};

module.exports = errorHandler;
