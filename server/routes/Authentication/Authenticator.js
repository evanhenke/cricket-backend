var bcrypt = require('bcrypt');

module.exports = function () {

    /**
     * Takes a String for the password and returns a hashed value
     * @param user
     * @param cb Callback function that takes an error param and the updated user
     */
    var encryptPassword = function (user, cb) {
        return bcrypt.hash(user.password, 10, function(error,hash) {
            if (error) {
                cb(error);
            } else {
                user.password = hash;
                cb(null,user);
            }
        });
    };

    /**
     * Takes a user and validates their login credentials
     * @param user used to get the hashed password
     * @param password to compare the hashed password to
     * @param cb Callback that takes an error param and the boolean result of the password and hash comparison
     */
    var authenticate = function (user, password, cb) {
        bcrypt.compare(password,user.password,function(error,result){
            if (error)
                cb(error);
            else
                cb(null,result);
        })
    };

    return {
        encryptPassword:encryptPassword,
        authenticate:authenticate
    };
};
