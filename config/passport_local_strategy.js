const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


// authentication using passport

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },

    function(req, email, password, done) {
        // find the user and establish the identity
        User.findOne({email: email})
            .then( (user) => {
                if(!user || user.password != password) {
                    req.flash('error','Invalid Username/Password');
                    return done(null, false)
                }

                return done(null, user);
            }).catch( (err) => {
                req.flash('error', err);
                return done(err);
            });
    }
));


// seriallizing the user to decline  which key is to be kept in the cookies

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser( function(id, done) {
    User.findById(id)
        .then( (user) => {
            return done(null, user);
        }).catch( () => {
            console.log('error in finding user ----> passport');
            return done(err);
        });
});

// check if user is authenticated 

passport.checkAuthentication = function(req, res, next) {
    // if the user signed in, then pass on the request to the next function (cintrollers action)

    if(req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in 

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next) {

    if(req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookies and we are just sending this to the views 
        
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;