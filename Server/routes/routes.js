const express = require("express");
const router = express.Router();

const { generateOtp, signup, login } = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const { createCourse, getCoursedDeatails } = require("../controllers/Course");
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
const { auth, isAdmin } = require("../middlewares/auth");
const { isInstructor } = require("../middlewares/auth");
const {
  updateProfilePicture,
  getUserDetail,
  updateProfile,
  deleteAccount,
} = require("../controllers/Profile");

router.post("/signup/otp", generateOtp);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
router.post("/sendotp", generateOtp);
//change password

// routes for instructor
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getCourseDetails", getCoursedDeatails);
router.post("/createSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, deleteSection);
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.put("/update-profilePic", auth, updateProfilePicture);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetail);
router.delete("/deleteAccount", auth, deleteAccount);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetail", categoriesPageDetails);

module.exports = router;
