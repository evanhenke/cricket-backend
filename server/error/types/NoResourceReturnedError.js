function NoResourceReturnedError(message){
    this.name = "NoResourceReturnedError";
    this.message = message ? message : "No Resource was returned, please try a different search";
    this.stack = (new Error()).stack;
}

NoResourceReturnedError.prototype = new Error();

module.exports = NoResourceReturnedError;