const express = require('express');
const User = require('../schemas/UserSchema.js');
const ErrorHandler = require('./../error/ErrorHandler')();

const userRouter = express.Router();

module.exports = function () {
  userRouter.route('/user')
    /**
     * GET request that returns all users
     */
    .get((req, res) => {
      User.findAll((error, users) => {
        if (error) {
          ErrorHandler.handle(error, res);
        } else {
          res.json(users);
        }
      });
    })

    /**
       * POST Request to create a user
       */
    .post((req, res) => {
      User.createUser({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email
      }, (error, user) => {
        if (error) {
          ErrorHandler.handle(error, res);
        } else {
          res.json(user);
        }
      });
    });

  userRouter.route('/user/:username')
  /**
   * GET request that returns a single user based on a given username.
   * Sends NoResourceReturnedError if no result is returned
   */
    .get((req, res) => {
      User.findByUsername(req.params.username, (error, result) => {
        if (error) { ErrorHandler.handle(error, res); } else { res.json(result); }
      });
    });

  return userRouter;
};
