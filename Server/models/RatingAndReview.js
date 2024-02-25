const mongoose=require("mongoose")
const ratingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating: {
        type:Number,
        trim:true
    },
    review: {
        type:String,
        trim:true
    },
    course: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        trim:true,
        required:true
    },

})

module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema);