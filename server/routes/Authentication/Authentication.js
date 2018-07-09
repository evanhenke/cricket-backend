const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

module.exports = function () {
  require('./passport')(authRouter);

  authRouter.route('/auth/login')
    /**
       * Req body requires username and password to authenticate
       * Sends a boolean value
       */
    .post(
      passport.authenticate('local'),
      (req, res) => {
        res.json(req.user);
      }
    );

  authRouter.route('/auth/logout')
  /**
   * Req body requires username and password to authenticate
   * Sends a boolean value
   */
    .post(
      (req, res) => {
        if (req.user) {
          req.logout();
          res.send('logged out');
        } else {
          res.send('no current login');
        }
      }
    );

  return authRouter;
};
