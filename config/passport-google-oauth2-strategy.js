const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


//tell passposrt to use a new startegy for google Auth
passport.use(new googleStrategy({
        clientID : "1023200451763-6646qdn8edcmscrsech6f21nqvl3sk0k.apps.googleusercontent.com",
        clientSecret : "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",
        callbackURL : "http://localhost:8000/users/auth/google/callback"
    },
        function(accessToken, refreshToken,profile, done){
            //find a suer
            User.findOne({email: profile.emails[0].value}).exec(function(err,user){   //array of emials, a user can have multiple mails
                if(err){console.log('error in Google Startegy Passport',err); return;}
                
                console.log(profile)

                if(user){
                    //if found set this user as req.user
                    return done(null,user);
                }else{
                    //if not found,create the user and set it as req.user(sign in that user)
                    User.create({
                        name : profile.displayName,
                        email : profile.email[0].value,
                        password : crypto.randomBytes(20).toString('hex') //gen. random pass
                    },function(err,user){
                        if(err){console.log('error in  creating user Google Startegy Passport',err); return;}
                        
                        return done(null,user);
                    });
                }
            })  ;
        }




))