const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require('../models/Section');
const SubSection=require("../models/SubSection")
const { uploadImagetoCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// create course
exports.createCourse = async (req, res) => {
  try {
    let { courseName, courseDescription, whatYouWillLearn, category, price,
      instructions:_instructions,
      tag:_tag
     } =
      req.body;
    const tag = JSON.parse(_tag)
    const instructions = JSON.parse(_instructions)
  
    console.log("tag", tag)
    console.log("instructions", instructions)
    const thumbnail = req.files.thumbnailImage;
    console.log(courseName,courseDescription,whatYouWillLearn,category,price,thumbnail)
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
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
      whatYouWillLearn,
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

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("Category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find().populate("instructor").exec();
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
    console.log('courseid in controllerr',courseId)
    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "courseId not found",
      });
    }
    // HW: also try a diff way of populate
    const courseDetails = await Course.findById(courseId)
      .populate({
        path:"instructor",
        populate:{
          path:"additionalDetail"
        }
      })
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      })
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

exports.deleteCourse=async(req,res)=> {
  try {
    const {courseId}=req.body;

    const course=await Course.findById(courseId);
    if(!course) {
      return res.status(404).jsoon({
        success:false,
        message:"course not found",
      })
    }
    const enrolledStudents=course.studentEnrolled;

    // de enroll student
    for(const studentId of enrolledStudents) {
      await User.findById(studentId,
        {$pull:{courses:courseId}},
        {new:true}
      );
    }
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }
      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }
    return res.status(200).json({
      message:"course deleted successfully",
      success:true,
      data:course
    })

  }catch(e) {
    return res.status(500).json({
      success:false,
      message:'error in deleting course'
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}