var Authenticator = require('./Authenticator')();
var User = require('./../../schemas/UserSchema');

module.exports = function(app){

    /**
     * Req body requires username and password to authenticate
     * Sends a boolean value
     */
    app.post('/user/auth',function(req,res){
        var error = null;
        User.findOne({usernameLowerCase:req.body.username.toLowerCase()},
            function(err,user){
                if(err) error = err;
                Authenticator.authenticate(user,req.body.password,function(err,ok){
                    if(err) error = err;
                    res.send(ok);
                });
            });
    });
};