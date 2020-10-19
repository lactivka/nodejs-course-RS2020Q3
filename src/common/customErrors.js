const { BAD_REQUEST, NOT_FOUND, getStatusText } = require('http-status-codes');
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'validation error';
    this.status = BAD_REQUEST;
    this.text = getStatusText(this.status);
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Not found error';
    this.status = NOT_FOUND;
    this.text = getStatusText(this.status);
  }
}

module.exports = { ValidationError, NotFoundError };
