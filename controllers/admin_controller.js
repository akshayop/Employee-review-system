const User = require('../models/user');

// rendering admin dashboard
module.exports.adminDashboard = async (req, res) => {
    try {

        // checking if users is authenticated or not 

        // if user is authenticated 
        if(req.isAuthenticated()) {

            // checking user is admin or not 

            // if user is admin
            if(req.user.isAdmin === true) {

                // populating the users
                let users = await User.find({}).populate('name');

                // filter currently logged in user
                let filterdUser = users.filter(
                    (user) => user.email !== req.user.email
                );

                return res.render('admin_dashboard', {
                    title: 'ERS | Admin Dashboard',
                    users: filterdUser
                });
            } 
            
            // if user is not admin
            else {
                return res.redirect('/');
            }
        }

        // if user is not Authenticated 
        else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}