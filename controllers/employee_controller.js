const User = require('../models/user');
const Review = require('../models/review');

module.exports.employeeDashboard = async (req, res) => {
    try {

        if(req.isAuthenticated()) {

            const employee = await User.findById(req.params.id)
                .populate({
                    path: 'reviewsFromOthers',
                    populate: {
                    path: 'reviewer',
                    model: 'User',
                    },
                })
                .populate('userToReview');


            console.log(employee);
            

            // extracting the assigned reviews 
            const userToReview = employee.userToReview;


            // extraxting review from other employees
            const reviewsFromOthers = employee.reviewsFromOthers;

            console.log(reviewsFromOthers);

            // populate reviews given from others
            await Review.find().populate({
                path: 'reviewer',
                model: 'User',
            });
            

            return res.render('employee_dashboard', {
                title: 'ERS | Employee Dashboard',
                employee: employee,
                userToReview: userToReview,
                reviewsFromOthers: reviewsFromOthers
                
            });
        } else {
            return res.redirect('/users/sign-in');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}


module.exports.redirectPage = (req, res) => {
    return res.redirect('/users/sign-in');
}