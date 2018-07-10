const mongoose = require('mongoose');
const express = require('express');
const User = require('../schemas/UserSchema.js');
const Book = require('../schemas/BookSchema.js');
const Page = require('../schemas/PageSchema.js');
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
    })
    /**
       * Updates a book
       */
    .put((req, res) => {
      Book.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body.id),
        {
          $set:{
            title:req.body.title,
            rating:req.body.rating
          }
        },
        {
          new:true,
          runValidators:true
        },
        (error, book) => {
          if (error) {
            res.json(book);
          } else {
            res.json(book);
          }
        }
      );
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

  bookRouter.route('/:id/pages')
  /**
   * GET all pages given by a book id
   */
    .get((req, res) => {
      Page.findPagesByBookId(req.body._id, (error, pages) => {
        if (error) {
          ErrorHandler.handle(error);
        } else {
          res.json(pages);
        }
      });
    });

  return bookRouter;
};
