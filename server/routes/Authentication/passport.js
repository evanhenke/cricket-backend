const passport = require('passport');
const localStrategy = require('./localstrategy');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  localStrategy();

  passport.serializeUser((user, done) => {
    console.log(`serialize user ${user}`);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log(`deserialize user ${user}`);
    done(null, user);
  });
}

module.exports = passportConfig;
