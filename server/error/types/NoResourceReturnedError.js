const CricketError = require('./CricketError');

function NoResourceReturnedError(message) {
  this.name = 'NoResourceReturnedError';
  this.message = message || 'No Resource was returned, please try a different search';
  this.stack = (new CricketError()).stack;
}

NoResourceReturnedError.prototype = new CricketError();

module.exports = NoResourceReturnedError;
