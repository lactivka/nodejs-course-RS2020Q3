const { logError } = require('../logger/winston');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.sendStatus(err.status);
  } else {
    console.log('error in db', err);
    res.sendStatus(500);
  }
  logError(req, res, err);
  next();
};

module.exports = errorHandler;
