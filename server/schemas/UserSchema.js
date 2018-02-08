var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    username: {
        type:String,
        maxlength:30,
        required:true,
        unique:true,
        uniqueCaseInsensitive:true,
        match:[
            new RegExp("[a-zA-Z0-9]"),
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
        maxlength:30,
        minlength:8,
        match:[
            new RegExp("[a-zA-Z0-9!@#$%^&*_+=-]"),
            "Password only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,- "
        ]
    },
    firstName: {
        type:String,
        required:true,
        match:[
            new RegExp("[a-zA-Z]"),
            "First name only allows letters!"
        ]
    },
    lastName: {
        type:String,
        required:true,
        match:[
            new RegExp("[a-zA-Z]"),
            "Last name only allows letters!"
        ]
    },
    createDate: {
        type: Date,
        default:Date.now
    }
},{collection:'User'});

userSchema.plugin(uniqueValidator);

userSchema.statics.findByUsername = function(username){
    return this.findOne({usernameLowerCase:username.toLowerCase()},
        function(error,result){
            if(error){
                console.log(error);
            }
        });
};

module.exports = mongoose.model('User', userSchema);
