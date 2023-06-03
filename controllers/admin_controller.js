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

// rendering edit employee page 

module.exports.editEmployee = async (req, res) => {
    try {
        if(req.isAuthenticated()) {
            if(req.user.isAdmin === true) {
                const employee = await User.findById(req.params.id);

                return res.render('edit_employee', {
                    title: 'ERS | Edit Employee',
                    employee: employee
                });
            }
        }
        req.flash('warning', 'please sign in....');
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('error', err);
        return res.redirect('back');
    }
}

// Updating employee details

module.exports.updateEmployee = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id);

        if(employee) {
            // updating the data
            employee.name = req.body.name;
            if(req.body.role == 'Admin') {
                employee.isAdmin = true
            }
            else {
                employee.isAdmin = false;
            }

            employee.save();
            req.flash('success', 'Employee details Updated....!');
            return res.redirect('/admin/admin-dashboard');
        }


    } catch (err) {
        console.log('error', err);
        return res.redirect('back');
    }
}


// delete an user

module.exports.deleteEmployee = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);
        
        // deleting the user
        if(!user) {
            req.flash('error', "Couldn't find Employee");
            return res.redirect('back');
        }

        await User.findByIdAndDelete(req.params.id);
        req.flash('success', 'Employee removed');
        return res.redirect('back');

    }catch (err) {
        console.log('error', err);
        return res.redirect('back');
    }
}

