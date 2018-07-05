const mongoose = require('mongoose');

const { Schema } = mongoose;

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

pageSchema.statics.findByBookId = function (bookId) {
  return this.findOne({ bookId:bookId },
    (error) => {
      if (error) {
        console.log(error);
      }
    });
};

module.exports = mongoose.model('Page', pageSchema);
