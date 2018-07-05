const express = require('express');
const User = require('./User.js');
const Book = require('./Book.js');
const Page = require('./Page.js');
const Authenticator = require('./Authentication/Authentication');

const app = express();

module.exports = function () {
  User(app);
  Book(app);
  Page(app);
  Authenticator(app);

  return app;
};
