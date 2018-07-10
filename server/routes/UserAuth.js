const express = require('express');
const User = require('../schemas/UserSchema.js');
const ErrorHandler = require('./../error/ErrorHandler')();
const NotAuthorizedError = require('./../error/types/NotAuthorizedError');

const userAuthRouter = express.Router();

module.exports = function () {
  userAuthRouter.route('/user')
  /**
   * Middleware to validate that there is a logged in user.
   * Sends error to error handler if no user is logged in.
   */
    .all((req, res, next) => {
      if (!req.user) {
        ErrorHandler.handle(new NotAuthorizedError('No logged in user present.'), res);
      } else {
        next();
      }
    })

  /**
   * PUT endpoint to update a user's information
   * Currently alterable attributes: First Name, Last Name, Email
   */
    .put((req, res) => {
      if (req.user._id === req.body._id) {
        User.updateUserById(
          req.body._id,
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email
            }
          },
          (error, user) => {
            if (error) {
              ErrorHandler.handle(error, res);
            } else {
              res.json(user);
            }
          }
        );
      } else {
        ErrorHandler.handle(new NotAuthorizedError(), res);
      }
    })

    /**
     * DELETE request to delete a user, sends the deleted user data back
     */
    .delete((req, res) => {
      if (req.user._id === req.body._id) {
        User.deleteUser(
          req.body.id,
          (error, result) => {
            if (error) {
              ErrorHandler.handle(error, res);
            } else {
              res.json(result);
            }
          }
        );
      } else {
        ErrorHandler.handle(new NotAuthorizedError(), res);
      }
    });

  return userAuthRouter;
};
