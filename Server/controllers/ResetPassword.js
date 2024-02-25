const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
const bcrypt=require('bcrypt');
const crypto=require('crypto')
exports.resetPasswordToken = async (req, res) => {
  try {
    // fetch email from req
    const {email} = req.body;
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not registered",
      });
    }
    // console.log(user);
    const token = crypto.randomUUID();
    console.log(token)
    const updateUser = await User.findOneAndUpdate(
      { email:email },
      {
        tokenResetPassword: token,
        tokenExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    
    const url = `https://localhost:3000/reset-password/${token}`;
    await mailSender(
      email,
      `password reset link: ${url}`,
      "password reset link"
    );
    return res.status(200).json({
        success:true,
        message:'password reset link send successfully',
        data:updateUser
    })
  } catch (e) {
    console.log(e)
    return res.status(401).json({
        success:false,
        message:'error in resetPasswordToken'
    })
  }
};

exports.resetPassword=async(req,res)=> {
    try {
        const{password,confirmPassword,token}=req.body;
        if(password!==confirmPassword) {
          return res.status(401).json({
            success:false,
            message:"passwords are not matching please enter samw password"
          })
        }
        // user details fetch
        const user=await User.findOne({tokenResetPassword:token});
        if(!user) {
          return res.status(401).json({
            success:false,
            message:"token is inavlid please check email for link and enter url correctly"
          })
        }
        //check if token exipres or not
        if(user.tokenExpires>Date.now()) {
            const hashPassword=await bcrypt.hash(password,10);
            const updateUser=await User.findOneAndUpdate({tokenResetPassword:token},{password:hashPassword},{new:true});
            return res.status(200).json({
              success:true,
              message:'password change succesfully now you can procced to login',
              data:updateUser
            })
        }
        return res.status(401).json({
          success:false,
          message:'token expired generate token again then change password'
        })
    }catch(e){
        return res.status(401).json({
          success:false,
          message:"error while changing the password...... it's not you it's us......network error"
        })
    }
}
