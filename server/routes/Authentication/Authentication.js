var Authenticator = require('./Authenticator')();
var User = require('./../../schemas/UserSchema');
var ErrorHandler = require('./../../error/ErrorHandler')();

module.exports = function(app){

    /**
     * Req body requires username and password to authenticate
     * Sends a boolean value
     */
    app.post('/user/auth',function(req,res){
        User.findByUsername(req.body.username,
            function(error,user){
                if(error) {
                    ErrorHandler.handle(error,res);
                }
                else Authenticator.authenticate(user,req.body.password,function(err,ok){
                    if(err)
                        ErrorHandler.handle(err,res);
                    else
                        res.send(ok);
                });
            });
    });
};