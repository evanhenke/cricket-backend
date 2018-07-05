const mongoose = require('mongoose');
const User = require('../schemas/UserSchema.js');
const Book = require('../schemas/BookSchema.js');
const Page = require('../schemas/PageSchema.js');

module.exports = function (app) {
  /**
     * Sends a response containing all books
     */
  app.get('/book', (req, res) => {
    Book.find((error, books) => {
      if (error) {
        res.send(error);
      } else {
        res.json(books);
      }
    });
  });

  /**
     * Sends a response containing all books written by a specified user by username
     */
  app.get('/book/:username', (req, res) => {
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

  /**
     * Creates a book for a specified author and sends a response of the book
     */
  app.post('/book', (req, res) => {
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
          }, (error) => {
            if (error) {
              res.json(error);
            }
          });
          res.json(book);
        }
      });
    }, (error) => {
      res.json(error);
    });
  });

  /**
     * Updates a book
     */
  app.put('/book', (req, res) => {
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
};
