var mongoose = require('mongoose');
var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');
var Page = require('../schemas/PageSchema.js');

module.exports = function(app){

    //get all pages for a book by it's id
    app.get('/book/:id/pages',function(req,res){
        Page.findByBookId(req.params.id)
            .then(function(pages){
                res.json(pages);
            },function(error){
                res.json(error);
            });
    });

    //create a new page
    app.post('/book/pages',function(req,res){
        Book.findById(req.body.bookId)
            .then(function(book){
                Page.findByBookId(book._id)
                    .then(function(pages){
                        Page.create({
                            bookId:book._id,
                            pageNumber:pages.length+1,
                            text:req.body.pageText
                        },function(error,newPage){
                            if(error){
                                res.json(error);
                            } else {
                                res.json(newPage);
                            }
                        });
                    },function(error){
                        res.json(error);
                    });
            },function(error){
                res.json(error);
            });
    });

    app.put('/book/pages',function(req,res){
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
            function(error,page){
                if(error){
                    res.json(error);
                } else {
                    res.json(page);
                }
            }
        );
    });
};
