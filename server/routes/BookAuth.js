const express = require('express');
const User = require('./../schemas/UserSchema');
const Book = require('./../schemas/BookSchema');
const Page = require('./../schemas/PageSchema');
const ErrorHandler = require('./../error/ErrorHandler')();
const NotAuthorizedError = require('./../error/types/NotAuthorizedError');

const bookAuthRouter = express.Router();

module.exports = function () {
  bookAuthRouter.route('/book')
  /**
   * Middleware to check if there is a logged in user.
   * Sends error to error handler if no user.
   */
    .all((req, res, next) => {
      if (!req.user) {
        ErrorHandler.handle(new NotAuthorizedError('No logged in user present.'), res);
      } else {
        next();
      }
    })

    /**
     * Creates a book for a specified author and sends a response of the book.
     */
    .post((req, res) => {
      if (req.user._id === req.body.authorId) {
        User.findByUsername(req.user.username, (error) => {
          if (error) {
            ErrorHandler.handle(error, res);
          } else {
            Book.create({
              title: req.body.title,
              authorId: req.user._id,
            }, (err, book) => {
              if (err) {
                ErrorHandler(err, res);
              } else {
                Page.create({
                  bookId: book._id,
                  pageNumber: 1,
                  text: 'This is the first page!'
                }, (e, page) => {
                  if (e) {
                    ErrorHandler.handle(e, res);
                  } else {
                    console.log(JSON.stringify(page));
                    res.json(book);
                  }
                });
              }
            });
          }
        });
      } else {
        ErrorHandler.handle(new NotAuthorizedError(), res);
      }
    });

  bookAuthRouter.route('/book/:id')
    .put((req, res) => {
      if (req.user._id === req.body.authorId) {
        Book.updateBook(
          req.params.id,
          {
            $set: {
              title:req.body.title
            }
          },
          (error, book) => {
            if (error) {
              ErrorHandler.handle(error);
            } else {
              res.json(book);
            }
          }
        );
      } else {
        ErrorHandler.handle(new NotAuthorizedError(), res);
      }
    })

    /**
     * DELETE request to delete a book, sends the deleted book data back
     */
    .delete((req, res) => {
      if (req.user._id === req.body.authorId) {
        Book.deleteBook(
          req.body._id,
          (error, result) => {
            if (error) {
              ErrorHandler.handle(error, res);
            } else {
              Page.deleteAllPages(req.body._id, (err) => {
                if (err) {
                  ErrorHandler.handle(err, res);
                } else {
                  res.json(result);
                }
              });
            }
          }
        );
      } else {
        ErrorHandler.handle(new NotAuthorizedError(), res);
      }
    });

  return bookAuthRouter;
};
