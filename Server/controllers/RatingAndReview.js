const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    // check if user enrolled in course or not
    const courseDetail = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetail) {
      return res.status(403).json({
        success: false,
        message: "please buy first then review a course",
      });
    }
    const alreadyReviewed = await RatingAndReview.findOne({
      course: courseId,
      user: userId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "already reviewed",
      });
    }
    // create review
    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });
    const updateCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingAndReview._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "reviewed successfully",
      data: ratingAndReview,
      updatedCourse:updateCourse
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while creating rating and review",
    });
  }
};

exports.avgRating=async(req,res) => {
    try {
        const {courseId}=req.body;
        const response=await RatingAndReview.aggregate([
            {$match:{course:new mongoose.Types.ObjectId(courseId)}},
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:'$rating'}
                }
            }

        ]);
        if(response.length>0) {
            return res.status(200).json({
                success:true,
                message:'avg rating done',
                averageRating:response[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:'no rating given yet',
            averageRating:0,
        })

    }catch(e) {
        return res.status(500).json({
            success: false,
            message: "error while calculating avg rating",
          });
    }
}

exports.getAllReviews=async(req,res)=> {
    try{
        const{courseId}=req.body;
        const allReviews=await RatingAndReview.find()
                                              .sort({rating:'desc'})
                                              .populate({
                                                path:'user',
                                                select:'firstName lastName email image'
                                              })
                                              .populate({
                                                path:'course',
                                                select:"courseName"
                                              })
                                              .exec();
        
        return res.status(200).json({
            success:true,
            message:'allratings fetch succesfully',
            data:allReviews
        })
        
    }catch(e) {
        return res.status(500).json({
            success: false,
            message: "error while  fetching allRatings",
          });
    }
}