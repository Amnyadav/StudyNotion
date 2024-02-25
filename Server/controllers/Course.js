const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImagetoCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// create course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatWillYouLearn, category, price } =
      req.body;
    const thumbnail = req.files.thumbnailImage;
    if (
      !courseName ||
      !courseDescription ||
      !whatWillYouLearn ||
      !category ||
      !price ||
      !thumbnail
    ) {
      return res.status(401).json({
        success: false,
        message:
          "all fields are required.... first fill all fields carefully and correctly",
      });
    }
    const userID = req.user.id;
    // instructor validation
    const instructorDetail = await User.findOne({ _id: userID });
    // const instructorDetail=await User.findById({userID})
    if (!instructorDetail) {
      return res.status(404).json({
        success: false,
        message: "user data not found error in db call",
      });
    }

    // check Category details
    const CategoryDetail = await Category.findById(category);
    if (!CategoryDetail) {
      return res.status(404).json({
        success: false,
        message: "Categorydetail not found. error in db call of Categorydetail",
      });
    }
    // upload img to cloudinary
    const uploadImg = await uploadImagetoCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      whatWillYouLearn,
      Category: CategoryDetail._id,
      instructor: instructorDetail._id,
      price,
      thumbnail: uploadImg.secure_url,
      status: "Published",
    });
    // add the new course to inventory of instructor user
    const updateUser = await User.findOneAndUpdate(
      { _id: instructorDetail._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    // update the Category schema
    const updateCategory = await Category.findByIdAndUpdate(
      { _id: CategoryDetail._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "course created succefully",
      data: newCourse,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "error while creating new course",
    });
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find();
    if (!allCourses) {
      return res.status(404).json({
        success: false,
        message: "all courses not found...",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetch all courses successfully.....",
      data: allCourses,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while fethcing allCOurses from db....",
    });
  }
};

exports.getCoursedDeatails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "courseId not found",
      });
    }
    // HW: also try a diff way of populate
    const courseDetails = await Course.findById(courseId)
      .populate("instructor")
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      })
      // .populate("ratingAndReviews")
      .populate({
        path: "Category",
        populate: {
          path: "courses",
        },
      })
      .populate("studentEnrolled")
      .exec();
    return res.status(200).json({
      success: true,
      message: "courseDetail fetch succesfully",
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "error while fethcing coursedetail from db....",
    });
  }
};
