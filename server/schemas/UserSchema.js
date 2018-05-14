var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var Authenticator = require('../routes/Authentication/Authenticator')();

var userSchema = new Schema({
    username: {
        type:String,
        maxlength:[
            30,
            "Maximum length for a username is thirty (30) characters!"
        ],
        minlength:[
            8,
            "Minimum length for a username is eight (8) characters!"
        ],
        required:true,
        unique:true,
        uniqueCaseInsensitive:true,
        match:[
            new RegExp("^[a-zA-Z0-9_.-]*$"),
            "Username only allows letters and numbers!"
        ]
    },
    usernameLowerCase: {
        type:String,
        lowercase:true
    },
    password: {
        type:String,
        required:true,
        maxlength:[
            30,
            "Maximum length for a password is thirty (30) characters!"
        ],
        minlength:[
            8,
            "Minimum length for a password is eight (8) characters!"
        ],
        match:[
            new RegExp("^[a-zA-Z0-9!@#$%^&*_+=-]*$"),
            "Password only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,- "
        ]
    },
    firstName: {
        type:String,
        required:true,
        match:[
            new RegExp("^[a-zA-Z]*$"),
            "First name only allows letters!"
        ]
    },
    lastName: {
        type:String,
        required:true,
        match:[
            new RegExp("^[a-zA-Z]*$"),
            "Last name only allows letters!"
        ]
    },
    email: {
        type:String,
        required:true,
        match:[
            new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@" +
                "((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"),
            "Email format is invalid!"
        ]
    },
    createDate: {
        type: Date,
        default:Date.now
    }
},{collection:'User'});

userSchema.plugin(uniqueValidator);

userSchema.statics.findByUsername = function(username,callback){
    if(!callback) throw "findByUsername needs a callback!";
    return this.findOne({usernameLowerCase:username.toLowerCase()},
        function(error,result){
            if(!error && !result)
                callback(new Error('No user was returned with the given username.'));
            else
                callback(null,result);
        });
};

userSchema.pre('save', function(next) {
    Authenticator.encryptPassword(this,function(error){
        if(error) console.log(error);
        next();
    });
});

module.exports = mongoose.model('User', userSchema);
