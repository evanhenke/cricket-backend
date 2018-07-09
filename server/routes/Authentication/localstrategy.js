const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./../../schemas/UserSchema');
const ErrorHandler = require('./../../error/ErrorHandler')();
const Authenticator = require('./Authenticator')();

function localStrategy() {
  passport.use(new Strategy((username, password, done) => {
    User.findByUsername(username, (error, user) => {
      if (error) {
        ErrorHandler.handle(error, res);
      } else {
        Authenticator.authenticate(user, password, (err, authentic) => {
          if (err) {
            ErrorHandler.handle(err, res);
            return done(err);
          }
          if (!authentic) {
            return done(null, false, { message:'Nothing matches those credentials' });
          }
          return done(null, user);
        });
      }
    });
  }));
}

module.exports = localStrategy;
