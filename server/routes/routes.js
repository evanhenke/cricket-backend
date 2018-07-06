const express = require('express');
const User = require('./User.js');
const Book = require('./Book.js');
const Authenticator = require('./Authentication/Authentication');

const app = express();

module.exports = function () {
  User();
  Book();
  Authenticator();

  return app;
};
