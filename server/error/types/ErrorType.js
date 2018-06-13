function ErrorType() {

    let ERROR = 'Error';
    let NO_RESOURCE_RETURNED = 'NoResourceReturnedError';

    return {
        ERROR:ERROR,
        NO_RESOURCE_RETURNED:NO_RESOURCE_RETURNED
    };
}

module.exports = ErrorType;