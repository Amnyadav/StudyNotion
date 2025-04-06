const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
require('dotenv').config();
const { uploadImagetoCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const {gender='', dateOfBirth, about, contactNumber,firstName,lastName } = req.body;
    const user = req.user;
    // validation
    if (  !dateOfBirth || !about || !contactNumber) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const currentUser = await User.findById(user.id);
    
    const profileId = currentUser.additionalDetail;
    const updateProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        gender,
        dateOfBirth,
        about,
        phone:contactNumber,
      },
      { new: true }
    );
    const updatedUser=await User.findByIdAndUpdate(user.id,
      {firstName,
        lastName,
      },
      {new:true}
    ).populate("additionalDetail").exec();
    console.log(firstName,lastName)
    return res.status(200).json({
      success: true,
      message: "profile updated succefully",
      data: updatedUser,
  
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      success: false,
      message: "error while updating profile",
    });
  }
};

// shedule these function for some time duration
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await User.findById(id);
    if (!userDetail) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    // delete profile first
    const profileId = userDetail.additionalDetail;
    const deleteProfile = await Profile.findByIdAndDelete(profileId);
    console.log(deleteProfile);
    //update number of sudents enrolled in course
    const enrolledCourses = userDetail.courses;
    if (enrolledCourses) {
      enrolledCourses.forEach(async (courseId) => {
        await Course.findByIdAndUpdate(
          courseId,
          {
            $pull: { studentEnrolled: id },
          },
          { new: true }
        );
      });
    }
    // delete user now
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "user deleted succesfully",
      data: deletedUser,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while deleting user",
    });
  }
};

exports.updateProfilePicture=async(req,res) => {
  try {
    const profilePic=req.files.profilePic;
    console.log(profilePic)
    if(!profilePic) {
      return res.status(404).json({
        success:false,
        message:'please select some image'
      })
    }
    const userId=req.user.id;
    console.log(userId)
    const updateProfilePic=await uploadImagetoCloudinary(profilePic,process.env.FOLDER_NAME);
    const updateUser=await User.findByIdAndUpdate(userId,{
      image:updateProfilePic.secure_url
    },{new:true});
    return res.status(200).json({
      success:true,
      message:'profile pic update successfully',
      data:updateUser
    })
  }catch(e) {
    console.log(e)
    return res.status(500).json({
      success:false,
      message:'error in updating profile pic'
    })
  }
}

exports.getUserDetail=async (req,res)=> {
  try {
    const userId=req.user.id;
    const userDetail=await User.findById(userId).populate('additionalDetail').exec();
    if(!userDetail) {
      return res.status(404).json({
        success:false,
        message:'error page not found'
      })
    }
    return res.status(200).json({
      success:true,
      data:userDetail
    })
  }catch(e) {
    console.log(e)
    return res.status(401).json({
      success:false,
      message:"error while fetching userDetail...... it's not you it's us......network error"
    })
  }
}

exports.getEnrolledCourses=async(req,res)=> {
  try{
    const userId=req.user.id;
    const userDetail=await User.findById({_id:userId})
                            .populate({
                              path:"courses",
                              populate:{
                                path:"courseContent",
                                populate: {
                                  path:"subSection"
                                }
                              }
                            }).exec();
    if(!userDetail) {
      return res.status(400).json({
        message:"error in fetching user detail",
        success:false
      });
    }
    const enrolledCourses=userDetail?.courses;
    console.log(enrolledCourses)
    return res.status(200).json({
      success:true,
      message:"enrolled courses fetch successfully",
      data:enrolledCourses,
    })
  }catch(e) {
    res.status(400).json({
      success:false,
      message:"error in getting enrolled courses"
    })
  }
}