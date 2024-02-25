const mongoose=require("mongoose");
require("dotenv").config();
const dbConnect=()=> {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=> {
        console.log("db connect succesfully")
    })
    .catch(()=> {
        console.log("db connextion failed")
    })
}
module.exports={dbConnect}