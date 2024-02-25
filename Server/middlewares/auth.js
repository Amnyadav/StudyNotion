const jwt = require("jsonwebtoken");
const User = require("../models/User");
// const User = require("../models/User");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    // fetch token req body
    // console.log(req.cookies.token)
    // const header=req.headers.cookie.split("token=")[1];
    const token = req.cookies.token;

    // console.log("toeken is", req.headers.cookie.split("token=")[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        Message: "no valid user .token not found",
      });
    }
    // console.log(typeof(token))

    // verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        success: false,
        Message: "invalid token....token expired",
      });
    }
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      error: e,
      message: "something went wrong in auth middleware....",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(200).json({
        success: true,
        message: "these is protected route for studentssssssssss",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "error in student middleware",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "these is protected route for Instrucotr",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "error in Instrucotr middleware",
    });
  }
};
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "these is protected route for admin",
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "error in admin middleware",
    });
  }
};
