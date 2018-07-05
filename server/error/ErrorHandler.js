const ErrorType = require('./types/ErrorType')();

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

  const handle = function (error, response) {
    switch (error.name) {
      case ErrorType.NO_RESOURCE_RETURNED:
        console.log(`No resource found error ${error}`);
        response.status(404).send(errorFormat(error));
        break;
      case ErrorType.CRICKET_ERROR:
        console.log(`error ${error}`);
        response.status(500).send(errorFormat(error));
        break;
      default:
        console.log(`none of the above error ${error}`);
        response.status(500).send(errorFormat(error));
        break;
    }
  };

  return {
    handle:handle
  };
};
