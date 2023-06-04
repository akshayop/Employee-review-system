const User = require('../models/user');

// assiging a review
module.exports.assignReview = async (req, res) => {
    try {

        if(req.isAuthenticated()) {
            
            if(req.user.isAdmin === true) {

                // populate all users
                let users = await User.find({});

                return res.render('add_review', {
                    title: 'ERS | Add Review',
                    users: users
                });
            } 
            
            else {
                return res.redirect('back');
            }
        } 
        else {
            return res.redirect('/users/sign-in');
        }

    } catch (err) {
        console.log('error', err);
        return res.redirect('back')
    }
}