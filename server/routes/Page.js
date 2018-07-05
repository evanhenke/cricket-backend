const mongoose = require('mongoose');
const Book = require('../schemas/BookSchema.js');
const Page = require('../schemas/PageSchema.js');

module.exports = function (app) {
  // get all pages for a book by it's id
  app.get('/book/:id/pages', (req, res) => {
    Page.findByBookId(req.params.id)
      .then((pages) => {
        res.json(pages);
      }, (error) => {
        res.json(error);
      });
  });

  // create a new page
  app.post('/book/pages', (req, res) => {
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
  });

  app.put('/book/pages', (req, res) => {
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
};
