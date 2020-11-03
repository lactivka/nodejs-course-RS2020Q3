const {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  UNAUTHORIZED,
  getStatusText
} = require('http-status-codes');
class NotValidError extends Error {
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

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden error';
    this.status = FORBIDDEN;
    this.text = getStatusText(this.status);
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized error';
    this.status = UNAUTHORIZED;
    this.text = getStatusText(this.status);
  }
}

module.exports = {
  NotValidError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError
};
