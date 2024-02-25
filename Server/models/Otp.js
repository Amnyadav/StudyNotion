const mongoose=require("mongoose")
const {mailSender}=require("../utils/mailSender")
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    otp: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires:5*60*1000,

    }

})

async function emailVerification(email,otp)  {
    try {
        const response =await mailSender(email,otp,"veriication email from studyNotion");
        return response;

    }catch(e) {
        console.log("error occur while email verification",e);
    }
}
otpSchema.pre("save",async function(next) {
    await emailVerification(this.email,this.otp);
    next();
})

module.exports=mongoose.model("Otp",otpSchema);