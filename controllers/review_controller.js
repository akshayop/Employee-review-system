// submit review
const User = require('../models/user');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    try {

        const reviewer = await User.findById(req.params.id);
        const recipient = await User.findOne({email: req.body.recipient_email});

        // create a new review
        const review = await Review.create({
            review: req.body.feedback,
            reviewer: reviewer,
            recipient: recipient

        });

        const reviewString = review.review.trim();

        // preventin empty feedback
        if(reviewString === '') {
            req.flash('error', 'Feedback section is empty');
            return res.redirect('back');
        }

        await recipient.updateOne({
            $push: {reviewsFromOthers: review}
        });

        await reviewer.updateOne({
            $pull: {userToReview: recipient.id}
        });

        req.flash('success', 'Feedback Submited...');
        return res.redirect('back');

    } catch(err) {
        console.log('error', err);
        return res.redirect('back');
    }
}