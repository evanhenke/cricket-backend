var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = 3030;
var bodyParser = require('body-parser');
var api = require('./server/routes/routes.js')();
var cors = require('cors');
var CONFIG = require('./config.json');

mongoose.connect(process.env.MONGOLAB_URI || CONFIG.mongo_uri);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('connected to mongodb!');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use('/api',api);

app.listen(process.env.PORT || port);

console.log('Listening on port ' + port);
