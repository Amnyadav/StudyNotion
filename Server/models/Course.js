const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },
  courseDescription: {
    type: String,
    trim: true,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  whatYouWillLearn: {
    type: String,
    trim: true,
    required: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tag: {
    type:[String]
  },
  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  status:{
    type:String,
    enum:['Draft','Published'],
  },
  instructions: {
    type:[String],
  }
});

module.exports = mongoose.model("Course", courseSchema);
