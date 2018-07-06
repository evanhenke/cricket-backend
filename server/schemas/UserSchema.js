const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Authenticator = require('../routes/Authentication/Authenticator')();
const { wrapCallbackForErrors } = require('./../error/ErrorHandler')();

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type:String,
    maxlength:[
      30,
      'Maximum length for a username is thirty (30) characters!'
    ],
    minlength:[
      8,
      'Minimum length for a username is eight (8) characters!'
    ],
    required:true,
    unique:true,
    uniqueCaseInsensitive:true,
    match:[
      new RegExp('^[a-zA-Z0-9_.-]*$'),
      'Username only allows letters and numbers!'
    ]
  },
  usernameLowerCase: {
    type:String,
    lowercase:true,
    required:true,
    match:[
      new RegExp('^[a-z0-9_.-]*$'),
      'Username only allows letters and numbers!'
    ]

  },
  password: {
    type:String,
    required:true,
    maxlength:[
      30,
      'Maximum length for a password is thirty (30) characters!'
    ],
    minlength:[
      8,
      'Minimum length for a password is eight (8) characters!'
    ],
    match:[
      new RegExp('^[a-zA-Z0-9!@#$%^&*_+=-]*$'),
      'Password only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,- '
    ]
  },
  firstName: {
    type:String,
    required:true,
    match:[
      new RegExp('^[a-zA-Z]*$'),
      'First name only allows letters!'
    ]
  },
  lastName: {
    type:String,
    required:true,
    match:[
      new RegExp('^[a-zA-Z]*$'),
      'Last name only allows letters!'
    ]
  },
  email: {
    type:String,
    required:true,
    match:[
      new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@'
                + '((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
      'Email format is invalid!'
    ]
  },
  createDate: {
    type: Date,
    default:Date.now
  }
}, { collection:'User' });

userSchema.plugin(uniqueValidator);

/**
 * Dumb wrapper for finding all users.
 * @param callback
 * @returns {Query|void|index|number|*|T}
 */
userSchema.statics.findAll = function (callback) {
  return this.find(wrapCallbackForErrors(callback));
};

/**
 * Makes a call to the database to find a user given by a username.
 * @param username string to search by
 * @param callback: first parameter is error, second is the user
 * @returns {Query|void}
 */
userSchema.statics.findByUsername = function (username, callback) {
  return this.findOne({ usernameLowerCase:username.toLowerCase() },
    wrapCallbackForErrors(callback));
};

/**
 * Create wrapper to create a user
 * @param obj holds parameters for the user, .create should handle missing entries,
 *          consider checking first to throw custom errors
 * @param callback with error and result parameters
 * @returns {obj}
 */
userSchema.statics.createUser = function (obj, callback) {
  if (!obj.usernameLowerCase) { obj.usernameLowerCase = obj.username.toLowerCase(); }
  return this.create(obj, wrapCallbackForErrors(callback));
};

/**
 * Update wrapper for updating a user's information
 * @param id
 * @param update change to be made
 * @param callback with error and result parameters
 * @returns {Query}
 */
userSchema.statics.updateUserById = function (id, update, callback) {
  return this.findByIdAndUpdate(
    Schema.Types.ObjectId(id),
    update,
    {
      new:true,
      runValidators:true
    },
    wrapCallbackForErrors(callback)
  );
};


userSchema.statics.deleteUser = function (id, callback) {
  return this.findByIdAndDelete(
    Schema.Types.ObjectId(id),
    {},
    wrapCallbackForErrors(callback)
  );
};

/**
 * Mongoose pre-save middleware to encrypt the user's password
 */
userSchema.pre('save', function (next) {
  Authenticator.encryptPassword(this, (error) => {
    if (error) console.log(error);
    next();
  });
});

module.exports = mongoose.model('User', userSchema);
