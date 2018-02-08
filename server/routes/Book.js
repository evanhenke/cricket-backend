var mongoose = require('mongoose');
var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');
var Page = require('../schemas/PageSchema.js');

module.exports = function(app){
    //get all books... not sure why anyone would do this, it'd be a huge number
    app.get('/book',function(req,res){
        Book.find(function(error,books){
            if(error){
                res.send(error);
            } else {
                res.json(books);
            }
        });
    });

    //get all books by an author's username
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

    //create a book for a user
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

    //update book
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
