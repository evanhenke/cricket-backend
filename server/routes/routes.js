const express = require('express');
const cors = require('cors');
const User = require('./User.js');
const Book = require('./Book.js');
const Authentication = require('./Authentication/Authentication');

const app = express.Router();

module.exports = function () {
  app.use(cors());
  app.use(User());
  app.use(Book());
  app.use(Authentication());

  return app;
};
