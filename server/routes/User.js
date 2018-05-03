var User = require('../schemas/UserSchema.js');
var mongoose = require('mongoose');
var Authentication = require('./Authentication/Authenticator');

module.exports = function(app){

    //get all users
    app.get('/user',function(req,res){
        User.find(function(error,users){
            if (error){
                console.log(error);
            } else {
                res.json(users);
            }
        })
    });

    //get a single user by their username
    app.get('/user/:username',function(req,res){
        User.findByUsername(req.params.username).then(function(user){
            res.json(user);
        },function(error){
            console.log(error);
        });
    });

    //create a user
    app.post('/user',function(req,res){
        User.create({
            username:req.body.username,
            usernameLowerCase:req.body.username.toLowerCase(),
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email
        }, function(error,user){
            if (error){
                console.log(error);
            } else {
                User.findByUsername(user.username).then(function(u){
                    res.json(u);
                },function(error){
                    console.log(error);
                });
            }
        });
    });

    //update a user using the user's id
    //currently only first and lastname are changeable
    app.put('/user',function(req,res){
        User.findByIdAndUpdate(
            mongoose.Types.ObjectId(req.body.id),
            {
                $set:{
                    firstName:req.body.firstName,
                    lastName:req.body.lastName
                }
            },
            {
                new:true,
                runValidators:true
            },
            function(error,user){
                if(error){
                    res.json(error);
                } else {
                    res.json(user);
                }
            });
    });

    //delete a user
    app.delete('/user',function(req,res){
        User.findByIdAndDelete(
            req.body.id,
            function(error){
                console.log(error);
            }
        );
    });
};
