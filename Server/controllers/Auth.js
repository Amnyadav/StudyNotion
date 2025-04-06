const User = require("../models/User");
const OTP = require("../models/Otp");
const OtpGenarator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    //check if user already exist or not
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user already exist",
      });
    }
    let Otp = OtpGenarator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("otp generated is :", Otp);
    //cehck if otp already existed or not
    const result = await OTP.findOne({ otp: Otp });
    while (result) {
      Otp = OtpGenarator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: Otp });
    }
    const saveOtp = await OTP.create({ email, otp: Otp });
    return res.status(200).json({
      succese: true,
      message: "otp saved successfully",
      data: saveOtp,
    });
  } catch (e) {
    console.log("error in otp generation", e);
    return res.status(500).json({
      succese: false,
      message: "error while generating otp",
    });
  }
};

// signup function
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    // validation
    console.log("otp in server",req.body.otp);
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      res.status(400).json({
        succese: false,
        message: "all fields are required",
      });
    }
    if (password !== confirmPassword) {
      res.status(400).json({
        succese: false,
        message: "password not match",
      });
    }
    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    // console.log(recentOtp[0].otp);
    // console.log(otp);
    if (recentOtp.length === 0) {
      res.status(400).json({
        succese: false,
        message: "otp not found",
      });
    }
    if (recentOtp[0]?.otp !== otp) {
      return res.status(400).json({
        succese: false,
        message: "invalid otp",
      });
    }
    // password hashing
    const hashPass = await bcrypt.hash(password, 10);
    console.log(hashPass);
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      phone: null,
    });

    // const user = new User({
    //   firstName,
    //   lastName,
    //   email,
    //   password:hashPass,
    //   accountType,
    //   additionalDetail:profileDetails._id,
    //   image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    // });

    const savedUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      accountType,
      additionalDetail: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    // const savedUser=await User.create(user);
    return res.status(200).json({
      succese: true,
      message: "user registered succesfully",
      data: savedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "error while sign up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email }).populate("additionalDetail").exec();
    if (!email || !password) {
      return res.status(401).json({
        succese: false,
        message: "all credentials are required",
      });
    }
    if (!existingUser) {
      return res.status(400).json({
        succese: false,
        message: "user not found please signup first",
      });
    }
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.accountType,
    };
    if (await bcrypt.compare(password, existingUser.password)) {
      const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      // check for below line
      // existingUser = existingUser.toObject();
      existingUser.token = token;
      // console.log(existingUser);
      existingUser.password = null;
      const options = {
        expires: new Date(Date.now() + 24 * 3 * 60 * 60 * 1000),
        httpOnly: true,
      };
    
      // res.send("cokie is set")
      return res.cookie("token_cookie", token, options).status(200).json({
        cookie:req.cookies.token_cookie,
        succese: true,
        token,
        data:existingUser,
        message: "loged in succesfully",
      })
    } else {
      return res.status(401).json({
        succese: false,
        message: "password incorrect",
      });
    }
  } catch (e) {
    res.status(500).json({
      succese: false,
      message: "error in login or wrong credentials",
    });
  }
};

// change password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    // try {
    //   const emailResponse = await mailSender(
    //     updatedUserDetails.email,
    //     "Password for your account has been updated",
    //     passwordUpdated(
    //       updatedUserDetails.email,
    //       `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
    //     )
    //   )
    //   console.log("Email sent successfully:", emailResponse.response)
    // } catch (error) {
    //   // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
    //   console.error("Error occurred while sending email:", error)
    //   return res.status(500).json({
    //     success: false,
    //     message: "Error occurred while sending email",
    //     error: error.message,
    //   })
    // }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
