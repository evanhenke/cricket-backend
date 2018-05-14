var Authenticator = require('./Authenticator')();
var User = require('./../../schemas/UserSchema');

module.exports = function(app){

    /**
     * Req body requires username and password to authenticate
     * Sends a boolean value
     */
    app.post('/user/auth',function(req,res){
        User.findByUsername(req.body.username.toLowerCase(),
            function(error,user){
                if(error) {
                    console.log(error);
                }
                else
                    Authenticator.authenticate(user, req.body.password, function (err, ok) {
                        res.send(ok);
                    });
            });
    });
};