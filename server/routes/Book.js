const mongoose = require('mongoose');
const express = require('express');
const User = require('../schemas/UserSchema.js');
const Book = require('../schemas/BookSchema.js');
const ErrorHandler = require('./../error/ErrorHandler')();

const bookRouter = express.Router();

module.exports = function () {
  bookRouter.route('/book')
  /**
     * Sends a response containing all books
     */
    .get((req, res) => {
      Book.findAll((error, books) => {
        if (error) {
          ErrorHandler.handle(error, res);
        } else {
          res.json(books);
        }
      });
    });

  bookRouter.route('/book/:username')
    /**
     * Sends a response containing all books written by a specified user by username
     */
    .get((req, res) => {
      User.findByUsername(req.params.username, (error, user) => {
        if (error) {
          ErrorHandler.handle(error, res);
        } else {
          Book.findByAuthorId(user._id, (err, books) => {
            if (error) {
              ErrorHandler.handle(err, res);
            } else {
              res.json(books);
            }
          });
        }
      });
    });

  return bookRouter;
};
