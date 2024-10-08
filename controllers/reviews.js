const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.newReview = async(req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully made a new review');
    res.redirect(`/campgrounds/${id}`)
}
module.exports.deleteReview = async(req, res) => {
    console.log('delete');
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull : {reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review');
    res.redirect(`/campgrounds/${id}`);
}