var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);
var mongoose = require('mongoose');
var port = 3030;
var bodyParser = require('body-parser');
var api = require('./server/routes/routes.js')();
var cors = require('cors');
var CONFIG = require('./config.json');

mongoose.connect(process.env.MONGOLAB_URI || CONFIG.mongo_uri,{useMongoClient:true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('connected to mongodb!');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
//app.use('/bootstrap',express.static(rootPath + '/node_modules/bootstrap/dist'));  this isn't fucking working for some reason
app.use('/api',api);

app.listen(process.env.PORT || port);

console.log('Listening on port ' + port);
