var passport= require('passport'),
LocalStrategy= require('passport-local').Strategy,
TwitterStrategy= require('passport-twitter').Strategy,
FacebookStrategy= require('passport-facebook').Strategy;
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
            cosonle.log(err);
            return done(err);
        }
        if (user) {
            user.twitter= profile;
            user.save(function(err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            })
        } else {
            new User({
                username: profile.username,
                name: profile.displayName,
                profileImg: "img/not-allowed-128.png",
                email: profile.email,
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

passport.use(new FacebookStrategy({
    clientID: '162496234385018',
    clientSecret: 'fcdb3bae5657ce389ff29aba0ceb631a',
    callbackURL: 'http://localhost:8000/auth/facebook/callback'
},
function(token, tokenSecret, profile, done) {
    User.findOne({
        username: profile.username
    }).exec(function(err, user) {
        if (err) {
            console.log(err);
            return done(err, user);
        }
        if (user) {
            user.facebook= profile;
            user.save(function(err, user) {
                if (err) {
                    return done(err);
                }
                done(null, user);
            })
        } else {
            new User({
                username: profile.displayName,
                name: profile.displayName,
                profileImg: "img/not-allowed-128.png",
                email: profile.email,
                facebook: profile
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