const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

// TODO: (shafeen) set it up so that we use an User repository instead of mongoose directly

module.exports = function (passport) {

    // passport session setup
    // ----------------------
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id).exec().then(function(user) {
            done(null, user);
        }).then(null, function (err) {
            done(err);
        });
    });

    // local-signup strategy
    // ---------------------
    // if the strategies weren't named, they would default to "local"
    passport.use('local-signup', new LocalStrategy({
            // local strategy uses username and password by default
            // -> override with email and password
            usernameField: 'email',
            passwordfield: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            // asynchronous
            process.nextTick(function () {
                User.findOne({'local.email': email}).exec().then(function (user) {
                    if (user) {
                        let failMsg = 'Email already taken!';
                        console.log(`passport: ${failMsg}`);
                        return done(null, false, req.flash('signupMsg', failMsg));
                    } else {
                        let newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                }).then(null, function (err) {
                    return done(err);
                });
            });
        }
    ));

    // local-login strategy
    // --------------------
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({'local.email': email}).exec().then(function (user) {
                if (!user) {
                    let failMsg = 'No user found.';
                    console.log(`passport: ${failMsg}`);
                    return done(null, false, req.flash('loginMsg', failMsg));
                } else if (!user.validPassword(password)) {
                    let failMsg = 'Wrong password.';
                    console.log(`passport: ${failMsg}`);
                    return done(null, false, req.flash('loginMsg', failMsg));
                } else {
                    return done(null, user);
                }
            }).then(null, function (err) {
                return done(err);
            });
        }
    ));

};