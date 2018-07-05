function CricketError(message) {
  this.name = 'CricketError';
  this.message = message || 'Generic Cricket Error';
  this.stack = (new Error()).stack;
}

CricketError.prototype = new Error();

module.exports = CricketError;
