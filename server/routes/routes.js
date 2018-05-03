var express = require('express');
var app = express();

module.exports = function(){
    require('./User.js')(app);
    require('./Book.js')(app);
    require('./Page.js')(app);
    require('./Authentication/Authentication')(app);

    return app;
};
