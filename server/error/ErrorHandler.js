const ErrorType = require('./types/ErrorType')();

const NoResourceReturnedError = require('./../error/types/NoResourceReturnedError');
const CricketError = require('./../error/types/CricketError');

module.exports = function ErrorHandler() {
  const errorFormat = function (error) {
    return {
      Error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      DateTime: new Date(),
    };
  };

  /**
   * Wrapper for the callback to do error checking and applying
   * @param callback
   * @returns {Function}
   */
  const wrapCallbackForErrors = function (callback) {
    return function (error, result) {
      if (error) {
        callback(new CricketError(error.message));
      } else if (!result) {
        callback(new NoResourceReturnedError('No result from web service when a result is expected!'));
      } else {
        callback(null, result);
      }
    };
  };

  const handleNoResponse = function (error) {
    console.log(`no response object.. error is: ${error.stack}`);
  };

  const handle = function (error, response) {
    if (!response) {
      handleNoResponse(error);
    } else {
      switch (error.name) {
        case ErrorType.NOT_AUTHORIZED_ERROR:
          console.log(`Not Authorized Error ${error.stack}`);
          response.status(403).send(errorFormat(error));
          break;
        case ErrorType.NO_RESOURCE_RETURNED:
          console.log(`No resource found error ${error.stack}`);
          response.status(404).send(errorFormat(error));
          break;
        case ErrorType.CRICKET_ERROR:
          console.log(`Cricket Error ${error.stack}`);
          response.status(500).send(errorFormat(error));
          break;
        default:
          console.log(`none of the above error ${error.stack}`);
          response.status(500).send(errorFormat(error));
          break;
      }
    }
  };

  return {
    handle:handle,
    wrapCallbackForErrors:wrapCallbackForErrors
  };
};
