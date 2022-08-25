var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var alert= require('alert');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
module.exports = function (passport) {
  passport.use(new GoogleStrategy({
  clientID:'1016736664716-mbmtnijl2ihb64c68agj8crlsmcu9ih3.apps.googleusercontent.com',
  clientSecret:'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',
  callbackURL:'http://localhost:3000/',
  passReqToCallback:true
},
function(request, accessToken, refreshToken, user, done) {
  console.log(user)
  return done(null, user);
}
));

    passport.use(new LocalStrategy(function (email, password, done) {

        User.findOne({email: email}, function (err, user) {
            if (err)
                console.log(err);
                alert(err);

            if (!user) {
                return done(null, false);
                alert('No user found!');
                  console.log(message);
            }

           bcrypt.compare(password, user.password, function (err, isMatch) {
               if (err)
                    console.log(err);

                if (isMatch) {
                    return done(null, user);
                      console.log("ohk");
                }
                else {
                    return done(null, false);
                    console.log(message);
                    alert('Incorrect Password');
                }
        });
      });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
