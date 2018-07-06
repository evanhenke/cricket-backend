const express = require('express');
const Authenticator = require('./Authenticator')();
const User = require('./../../schemas/UserSchema');
const ErrorHandler = require('./../../error/ErrorHandler')();

const authRouter = express.Router();

module.exports = function () {
  authRouter.route('/auth')
    /**
       * Req body requires username and password to authenticate
       * Sends a boolean value
       */
    .post((req, res) => {
      User.findByUsername(req.body.username,
        (error, user) => {
          if (error) {
            ErrorHandler.handle(error, res);
          } else {
            Authenticator.authenticate(user, req.body.password, (err, ok) => {
              if (err) { ErrorHandler.handle(err, res); } else { res.send(ok); }
            });
          }
        });
    });

  return authRouter;
};
