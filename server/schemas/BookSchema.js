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
  pages: [{
    type:String,
    required:true
  }],
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

/**
 * Finds all books
 * @param callback
 * @returns {Query|void|index|number|*|T}
 */
bookSchema.statics.findAll = function (callback) {
  return this.find(wrapCallbackForErrors(callback));
};

/**
 * Returns a single book given by the book id
 * @param id
 * @returns {Query|void}
 */
bookSchema.statics.findById = function (id, callback) {
  return this.findOne({ _id:id },wrapCallbackForErrors(callback));
};

/**
 * Return list of books that share the same title
 * @param title
 * @returns {Query|void|index|number|*|T}
 */
bookSchema.statics.findByTitle = function (title, callback) {
  return this.find({ title:title }, wrapCallbackForErrors(callback));
};

/**
 * Returns a list of all books given by an author id
 * @param authorId
 * @returns {Query|void|index|number|*|T}
 */
bookSchema.statics.findByAuthorId = function (authorId, callback) {
  return this.find({ authorId:authorId }, wrapCallbackForErrors(callback));
};

/**
 * Wrapper for updating a book
 * @param bookId
 * @param update
 * @param callback
 * @returns {*}
 */
bookSchema.statics.updateBookById = function (bookId, update, callback) {
  return this.findByIdAndUpdate(
    bookId,
    update,
    {
      new:true,
      runValidators:true
    },
    wrapCallbackForErrors(callback)
  );
};

/**
 * Deletes the book indicated by the id
 * @param id
 * @param callback
 * @returns {*}
 */
bookSchema.statics.deleteBookById = function (id, callback) {
  return this.findByIdAndRemove(
    id,
    {},
    wrapCallbackForErrors(callback)
  );
};

module.exports = mongoose.model('Book', bookSchema);
