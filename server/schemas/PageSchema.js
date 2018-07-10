const mongoose = require('mongoose');

const { Schema } = mongoose;
const { wrapCallbackForErrors } = require('./../error/ErrorHandler')();

const pageSchema = new Schema({
  bookId:{
    type:Schema.ObjectId,
    ref:'Book',
    required:true
  },
  pageNumber:{
    type:Number,
    required:true,
    min:1
  },
  text:{
    type:String,
    required:true,
    match:[
      new RegExp("[a-zA-Z0-9!@#$%^&*_+=\"'-]"),
      "Pages only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,-,\", and '"
    ]
  },
  createDate:{
    type:Date,
    default:Date.now
  }
}, { collection:'Page' });


pageSchema.statics.findPagesByBookId = function (bookId, callback) {
  return this.find({ bookId:bookId }, wrapCallbackForErrors(callback));
};

/**
 * Delete a single page from a book.  NEED TO COME BACK TO THIS TO
 * HANDLE UPDATING PAGE NUMBERS
 * @param pageId
 * @param callback
 * @returns {Query}
 */
pageSchema.statics.deleteSinglePage = function (pageId, callback) {
  return this.findOneAndRemove({ _id:pageId }, wrapCallbackForErrors(callback));
};

/**
 * Delete all of the pages for a book
 * @param bookId
 * @param callback
 * @returns {Query}
 */
pageSchema.statics.deleteAllPages = function (bookId, callback) {
  return this.deleteMany({ bookId:bookId }, wrapCallbackForErrors(callback));
};

module.exports = mongoose.model('Page', pageSchema);
