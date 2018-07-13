const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('./../../schemas/UserSchema');
const Authenticator = require('./Authenticator')();

function localStrategy() {
  passport.use(new Strategy((username, password, done) => {
    User.findByUsername(username, (error, user) => {
      if (error) {
        done(error);
      } else {
        Authenticator.authenticate(user, password, (err, authentic) => {
          if (err) {
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
