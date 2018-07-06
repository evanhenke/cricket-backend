const mongoose = require('mongoose');
const { Schema } = mongoose;
const { wrapCallbackForErrors } = require('./../error/ErrorHandler')();

const bookSchema = new Schema({
  title: {
    type:String,
    required:true,
    maxlength:[
      100,
      'Maximum length for a book title is one hundred (100) characters!'
    ],
    match:[
      new RegExp("[a-zA-Z0-9!@#$%^&*_+=\"'-]"),
      "Title only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,-,\", and '"
    ]
  },
  authorId: {
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  rating: {
    type:Number,
    min:1,
    max:5
  },
  createDate: {
    type:Date,
    default:Date.now
  }
}, { collection: 'Book' });


bookSchema.statics.findAll = function (callback) {
  return this.find(wrapCallbackForErrors(callback));
};

// returns a single Book
bookSchema.statics.findById = function (id) {
  return this.findOne({ _id:id },
    (error) => {
      if (error) {
        console.log(error);
      }
    });
};

// returns a list of Books that share the same title
bookSchema.statics.findByTitle = function (title) {
  return this.find({ title:title },
    (error) => {
      if (error) {
        console.log(error);
      }
    });
};

// returns a list of Books by a single author
bookSchema.statics.findByAuthorId = function (authorId) {
  return this.find({ authorId:authorId },
    (error) => {
      if (error) {
        console.log(error);
      }
    });
};

/*
Ideally returns a list of Books with the same rating,
needs thought due to how ratings will work?

bookSchema.statics.findByRating = function(rating){
    return this.find({rating:rating},
        function(error){
            console.log(error);
        });
} */

module.exports = mongoose.model('Book', bookSchema);
