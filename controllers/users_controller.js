const User = require('../models/user');


// render the signup page
module.exports.signUp = (req, res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_up', {
        title: 'ERS | Sign Up'
    });
}

// render the sign in page

module.exports.signIn = (req, res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_in', {
        title: 'ERS | Sign In'
    });
}  

// get the sign up data
module.exports.create = async (req, res) => {
    try {

        if(req.body.password != req.body.confirmPassword) {
            req.flash('error',"Password Didn't matched. try Again...!");
            return res.redirect('back');
        }

        let user = await User.findOne({email: req.body.email}); //find the User using email

        // if not found 
        if(!user) {
            // create a new user

            await User.create(req.body);
            req.flash('success','successfully signed up');
            return res.redirect('/users/sign-in');
        }

        else {
            req.flash('warning','user already exists');
            return res.redirect('back')
        }

    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {
    req.flash('success','Successfully signed in ');
    return res.redirect('/');
}