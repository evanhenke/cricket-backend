var bcrypt = require('bcrypt');

module.exports = function () {

    /**
     * Takes a String for the password and returns a hashed value
     * @param password
     */
    var encryptPassword = function (user, cb) {
        return bcrypt.hash(user.password, 10, function(error,hash) {
            if (error) {
                console.log(error);
                cb(error);
            } else {
                user.password = hash;
                cb(null,user);
            }
        });
    };

    /**
     * Takes a user and validates their login credentials
     * @param user
     */
    var authenticate = function (user, password, cb) {
        bcrypt.compare(password,user.password,function(error,result){
            if (error) {
                console.log(error);
                cb(error);
            } else {
                cb(null,result);
            }
        })
    };

    return {
        encryptPassword:encryptPassword,
        authenticate:authenticate
    }
};
