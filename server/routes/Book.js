var mongoose = require('mongoose');
var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');
var Page = require('../schemas/PageSchema.js');

module.exports = function(app){

    /**
     * Sends a response containing all books
     */
    app.get('/book',function(req,res){
        Book.find(function(error,books){
            if(error){
                res.send(error);
            } else {
                res.json(books);
            }
        });
    });

    /**
     * Sends a response containing all books written by a specified user by username
     */
    app.get('/book/:username',function(req,res){
        User.findByUsername(req.params.username)
            .then(function(user){
                Book.findByAuthorId(user._id).then(function(books){
                    res.json(books);
                },function(error){
                    res.json(error);
                });
            },function(error){
                res.json(error);
            });
    });

    /**
     * Creates a book for a specified author and sends a response of the book
     */
    app.post('/book',function(req,res){
        User.findByUsername(req.body.username).then(function(author){
            Book.create({
                title:req.body.title,
                authorId:author._id,
                rating:req.body.rating,
            },function(error,book){
                if(error){
                    res.json(error);
                } else {
                    Page.create({
                        bookId:book._id,
                        pageNumber:1,
                        text:"This is the first page!"
                    },function(error){
                        if(error){
                            res.json(error);
                        }
                    });
                    res.json(book);
                }
            });
        },function(error){
            res.json(error);
        });
    });

    /**
     * Updates a book
     */
    app.put('/book',function(req,res){
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
            function(error,book){
                if(error){
                    res.json(book);
                } else {
                    res.json(book);
                }
            }
        );
    });
};
