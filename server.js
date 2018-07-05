const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug')('server');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const api = require('./server/routes/routes.js')();
const CONFIG = require('./config.json');

const app = express();
const port = process.env.PORT || 3030;
const mongoPort = process.env.MONGOLAB_URI || CONFIG.mongo_uri;

mongoose.connect(mongoPort);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  debug('connected to mongodb!');
});

require('./server/routes/Authentication/passport')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(session({ secret: 'stuff' }));
app.use(cors());
app.use('/api', api);

app.listen(port, () => { debug(`Listening on port ${chalk.green(port)}!`); });
