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

// render add employee page

module.exports.addEmployee = (req, res) => {
    if(req.isAuthenticated()) {
        if(req.user.isAdmin === true) {
            return res.render('add_employee', {
                title: 'ERS | Add Employee'
            })
        }
    }

    return res.redirect('/users/sign-in')
}

module.exports.createEmployee = async (req, res) => {
    try {
        if(req.body.password != req.body.confirmPassword) {
            req.flash('error',"Password Didn't matched. try Again...!");
            return res.redirect('back');
        }

        let user = await User.findOne({email: req.body.email}); //find the User using email

        // if not found 
        if(!user) {
            // create a new user

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false
            });
            req.flash('success','successfully Added Employee');
            return res.redirect('back');
        }

        else {
            req.flash('warning','Employee already exists');
            return res.redirect('back')
        }
    } catch (err) {
        console.log('error', err);
        return res.redirect('back');
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
            else {
                return res.redirect('back');
            }
        }
        req.flash('warning', 'please sign in....');
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('error', err);
        return res.redirect('back');
    }
}


// rendering the assign review page
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

module.exports.addReview = async (req, res) => {

    try {

        if(req.isAuthenticated()) {

           
            const reviwer = await User.findById(req.params.id);
            const recipient = await User.findById(req.body.recipient);

            if(reviwer.isAdmin === false) {
                req.flash('error', 'Your not Authorized');
                return res.redirect('/users/sign-in');
            }

            // checking if review alredy assigned or not
            const alreadyAssigned = reviwer.userToReview.filter(
                (userId) => userId == recipient.id
            );

            // if found, prevent from assigning duplicate review

            if(alreadyAssigned.length > 0) {
                req.flash('error', 'Review already assigned...!');
                return res.redirect('back');

            }

            await reviwer.updateOne({
                $push: {userToReview: recipient}
            });

            req.flash('success', 'review assigned successfully');
            return res.redirect('back');

        } else {
            req.flash('error', 'please, Sign in Again....!');
            return res.redirect('/users/sign-in');
        }

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

        req.flash('error', "Employee doesn't exists.....!")


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

