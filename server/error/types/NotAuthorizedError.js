const CricketError = require('./CricketError');

function NotAuthorizedError(message) {
  this.name = 'NotAuthorizedError';
  this.message = message || 'The given user is not authorized to perform the indicated action.';
  this.stack = (new CricketError()).stack;
}

NotAuthorizedError.prototype = new CricketError();

module.exports = NotAuthorizedError;
