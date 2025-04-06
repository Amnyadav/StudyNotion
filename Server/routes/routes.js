const express = require("express");
const router = express.Router();

const { generateOtp, signup, login, changePassword } = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const { createCourse, getCoursedDeatails, deleteCourse, getInstructorCourses, editCourse, showAllCourses } = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/subSection");
const {
  createCategory,
  showAllCategories,
  categoriesPageDetails,
} = require("../controllers/Category");
const { auth, isAdmin, isStudent } = require("../middlewares/auth");
const { isInstructor } = require("../middlewares/auth");
const {
  updateProfilePicture,
  getUserDetail,
  updateProfile,
  deleteAccount,
  getEnrolledCourses,
} = require("../controllers/Profile");
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments");

router.post("/signup/verify-email", generateOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
// router.post("/sendotp", generateOtp);
//change password

// routes for instructor
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/getCourseDetails", auth,getCoursedDeatails);
router.delete("/deleteCourse",auth,deleteCourse);
router.get("/getInstructorCourses",auth,getInstructorCourses);
router.post("/editCourse",auth,editCourse)
router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, deleteSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.put("/update-profilePic", auth, updateProfilePicture);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetail);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.post("/changePassword",auth,changePassword)
router.delete("/deleteAccount", auth, deleteAccount);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories",showAllCategories);
router.get("showAllCourses",showAllCourses)
router.post("/categoryPageDetail", categoriesPageDetails);

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);

module.exports = router;
