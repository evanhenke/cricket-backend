function ErrorType() {
  const ERROR = 'Error';
  const NO_RESOURCE_RETURNED = 'NoResourceReturnedError';
  const CRICKET_ERROR = 'CricketError';
  const NOT_AUTHORIZED_ERROR = 'NotAuthorizedError';

  return {
    ERROR:ERROR,
    NO_RESOURCE_RETURNED:NO_RESOURCE_RETURNED,
    CRICKET_ERROR:CRICKET_ERROR,
    NOT_AUTHORIZED_ERROR:NOT_AUTHORIZED_ERROR
  };
}

module.exports = ErrorType;
