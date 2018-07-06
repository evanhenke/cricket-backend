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
          ErrorHandler.handle(error);
        } else {
          res.json(books);
        }
      });
    })

    /**
       * Creates a book for a specified author and sends a response of the book
       */
    .post((req, res) => {
      User.findByUsername(req.body.username).then((author) => {
        Book.create({
          title:req.body.title,
          authorId:author._id,
          rating:req.body.rating,
        }, (error, book) => {
          if (error) {
            res.json(error);
          } else {
            Page.create({
              bookId:book._id,
              pageNumber:1,
              text:'This is the first page!'
            }, (err) => {
              if (err) {
                res.json(err);
              }
            });
            res.json(book);
          }
        });
      }, (error) => {
        res.json(error);
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

  bookRouter.route('/:username')
    /**
     * Sends a response containing all books written by a specified user by username
     */
    .get((req, res) => {
      User.findByUsername(req.params.username)
        .then((user) => {
          Book.findByAuthorId(user._id).then((books) => {
            res.json(books);
          }, (error) => {
            res.json(error);
          });
        }, (error) => {
          res.json(error);
        });
    });

  bookRouter.route('/:id/pages')
    .get((req, res) => {
      Page.findByBookId(req.params.id)
        .then((pages) => {
          res.json(pages);
        }, (error) => {
          res.json(error);
        });
    })
    // create a new page
    .post((req, res) => {
      Book.findById(req.body.bookId)
        .then((book) => {
          Page.findByBookId(book._id)
            .then((pages) => {
              Page.create({
                bookId:book._id,
                pageNumber:pages.length + 1,
                text:req.body.pageText
              }, (error, newPage) => {
                if (error) {
                  res.json(error);
                } else {
                  res.json(newPage);
                }
              });
            }, (error) => {
              res.json(error);
            });
        }, (error) => {
          res.json(error);
        });
    })

    .put((req, res) => {
      Page.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body.id),
        {
          $set:{
            text:req.body.text
          }
        },
        {
          new:true,
          runValidators:true
        },
        (error, page) => {
          if (error) {
            res.json(error);
          } else {
            res.json(page);
          }
        }
      );
    });

  return bookRouter;
};
