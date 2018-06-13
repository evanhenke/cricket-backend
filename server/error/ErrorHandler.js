let ErrorType = require('./types/ErrorType')();

module.exports = function ErrorHandler() {

    let handle = function(error,response){
        switch(error.name){
            case ErrorType.NO_RESOURCE_RETURNED:
                console.log('No resource found error ' + error);
                response.status(404).send(errorFormat(error));
                break;
            case ErrorType.ERROR:
                console.log('error ' + error);
                response.status(500).send(errorFormat(error));
                break;
            default:
                console.log('none of the above error ' + error);
                response.status(500).send(errorFormat(error));
                break;
        }
    };

    let errorFormat = function(error){
        return {
            "Error": {
                "name":error.name,
                "message":error.message,
                "stack":error.stack
            },
            "DateTime":new Date()
        };
    };

    return {
        handle:handle
    };
};