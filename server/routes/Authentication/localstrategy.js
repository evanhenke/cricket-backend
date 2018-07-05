const passport = require('passport');
const { Strategy } = require('passport-local');

function localStrategy() {
  passport.use(new Strategy(
    {
      username:'username',
      password:'password'
    }, (username, password, done) => {
      const user = { username, password };
      done(null, user);
    }
  ));
}

module.exports = localStrategy;
