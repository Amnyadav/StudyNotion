const REACT_APP_BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";
const url=process.env.REACT_APP_BASE_URL;
console.log("tthese is url from env file",url);

export const categories = {
  CATEGORIES_API: REACT_APP_BASE_URL + "/showAllCategories",
  CATEGORIES_PAGE_DATA:REACT_APP_BASE_URL+'/categoryPageDetail',
  COURSE_DETAIL:REACT_APP_BASE_URL+"/getCourseDetails"
};
export const auth ={
  OTP_GENERATE_API:REACT_APP_BASE_URL+"/signup/verify-email",
  SIGNUP_API:REACT_APP_BASE_URL+"/signup",
  LOGIN_API:REACT_APP_BASE_URL+"/login"
}

export const settingsEndpoints= {
  UPDATE_DISPLAY_PICTURE_API:REACT_APP_BASE_URL+"/update-profilePic",
  UPDATE_PROFILE_API:REACT_APP_BASE_URL+"/updateProfile",
  CHANGE_PASSWORD_API:REACT_APP_BASE_URL+"/changePassword",
  DELETE_PROFILE_API:REACT_APP_BASE_URL+"/deleteAccount",
}

export const profileEndpoints= {
  GET_USER_DETAILS_API:REACT_APP_BASE_URL+"/getUserDetails",
  GET_ENROLLED_COURSES_API:REACT_APP_BASE_URL+"/getEnrolledCourses"
}

export const courseEndpoints = {
  GET_COURSE_DETAIL_API:REACT_APP_BASE_URL+"/getCourseDetails",
  DELETE_COURSE_API:REACT_APP_BASE_URL+"/deleteCourse",
  GET_ALL_COURSE_API:REACT_APP_BASE_URL+"/showAllCourses",
  COURSE_CATEGORIES_API:REACT_APP_BASE_URL+"/showAllCategories",
  CREATE_COURSE_API:REACT_APP_BASE_URL+"/createCourse",
  EDIT_COURSE_API:REACT_APP_BASE_URL+"/editCourse",
  CREATE_SECTION_API:REACT_APP_BASE_URL+"/createSection",
  CREATE_SUBSECTION_API:REACT_APP_BASE_URL+"/createSubSection",
  UPDATE_SECTION_API:REACT_APP_BASE_URL+"/updateSection",
  UPDATE_SUBSECTION_API:REACT_APP_BASE_URL+"/updateSubSection",
  DELETE_SECTION_API:REACT_APP_BASE_URL+"/deleteSection",
  DELETE_SUBSECTION_API:REACT_APP_BASE_URL+"/deleteSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API:REACT_APP_BASE_URL+"/getInstructorCourses",
  // GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  // CREATE_RATING_API,
  // LECTURE_COMPLETION_API,
}

export const paymentEndpoints = {
  COURSE_PAYMENT_API:REACT_APP_BASE_URL+"/capturePayment",
  COURSE_VERIFY_API:REACT_APP_BASE_URL+"/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API:REACT_APP_BASE_URL+"/sendPaymentSuccessEmail"
}

console.log(url)
