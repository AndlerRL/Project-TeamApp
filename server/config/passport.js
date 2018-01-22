var passport= require('passport'),
LocalStrategy= require('passport-local').Strategy,
TwitterStrategy= require('passport-twitter').Strategy;
var User= require('../models/users');

passport.serializeUser(function(user, done) {
   if (user) {
      done(null, user);
   }
});

passport.deserializeUser(function(user, done) {
   User.findOne({ _id: user._id })
       .exec((err, user)=> {
          if (user) { return done(null, user); } else { return done(null, false); }
       });
});

passport.use('local', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }).exec((err, user)=> {
        if (user && user.authenticate(password)) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

passport.use(new TwitterStrategy({
    consumerKey: 'QodwuCsUfuWTpJTbH7Aa1O5Tl',
    consumerSecret: 'EL3v7e7RHkTDr961Hx00UsmZK8vLPJeGluRjSyOL2YaGOoNQff',
    callbackURL: 'http://localhost:8000/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
    User.findOne({
        username: profile.username
    }).exec(function(err, user) {
        if (err) {
            cosole.log(err);
            return done(err);
        }
        if (user) {
            user.twitter= profile;
            user.save(function(err, user) {
                if (err) {
                    return done(err);
                }
                done(nul, user);
            })
        } else {
            new User({
                username: profile.username,
                name: profile.displayName,
                twitter: profile
            }).save(function(err, user) {
                if (!err) {
                    return done(null, user);
                } else {
                    return done(err);
                }
            });
        }
    });
}));

module.exports= passport;