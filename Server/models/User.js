const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true
    },
    accountType: {
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"]
    },
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    tokenResetPassword:{
        type:String
    },
    tokenExpires:{
        type:Date
    },
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    image:{
        type:String,
        required:true,
        trim:true
    },
    courseProgress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }
})

module.exports=mongoose.model("User",userSchema);