const express = require('express');
const passport = require('passport');

const authRouter = express.Router();
const userAuthRouter = require('./../UserAuth');
const bookAuthRouter = require('./../BookAuth');
const passportConfig = require('./passport');

module.exports = function () {
  passportConfig(authRouter);

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

  authRouter.use('/auth', userAuthRouter());
  authRouter.use('/auth', bookAuthRouter());
  return authRouter;
};
