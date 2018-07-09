const passport = require('passport');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  require('./localstrategy')();

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
