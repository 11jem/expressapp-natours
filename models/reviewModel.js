const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty.'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide a rating!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Creating indexes
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

//////////////////////////////////
//  Mongoose middleware
//////////////////////////////////

// Query middleware: populating
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// Static method
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    // Select reviews belonging to tourId
    {
      $match: { tour: tourId },
    },
    // Group reviews by tour
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats);

  // Updating the tour document
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    // Set the default values
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

// Document middleware: ratings stats with new reviews
reviewSchema.post('save', async function () {
  await this.constructor.calcAverageRatings(this.tour);
});

// Query middleware: rating stats with updated and deleted reviews
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  // console.log(this.r);

  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // query has already been executed, cannot use this.findOne() here
  const doc = this.r;
  await doc.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
