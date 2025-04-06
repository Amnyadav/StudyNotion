const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress=require("../models/CourseProgress")
const { default: mongoose } = require("mongoose");
const { courseEnrollmentEmail } = require("../mails/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mails/templates/paymentSuccessEmail");


// // order creation
// exports.capturePayment=async (req,res)=> {
//   const {courses}=req.body;
//   const {userid}=req.user.id;
  
//   if(courses.length===0) {
//     return res.json(
//       {
//         success:false,
//         message:"no course found,course length is zero"
//       }
//     )
//   }
//   let totalAmount=0;
//   for(const course_id of courses ){
//     let course;
//     try{
//       course=await Course.findById(course_id);
//       if(!course) {
//         res.status(404).json({
//           success:false,
//           message:"course not found"
//         })
//       }
//       const uid=new mongoose.Types.ObjectId(userid);
//       if(course.studentEnrolled.includes(uid)) {
//         res.json({
//           success:false,
//           message:"student already bought the course"
//         })
//       }
//       totalAmount+=course.price;

//     }catch(e) {
//       res.status(500).json({
//         success:false,
//         message:"erro while calculating the total amount of courses in cart"+e
//       });
//     }
//     const options={
//       amount:totalAmount*100,
//       currency:"INR",
//       reciept:Math.random(Date.now()).toString()
//     }
//     try {
//       const paymentResponse= instance.orders.create(options);
//       res.status(200).json({
//         success:true,
//         message:'order created successfully for payment gateway',
//         data:paymentResponse
//       });

//     }catch(e) {
//       res.status(500).json({
//         success:false,
//         message:"error while creating order"+e
//       });
//     }
//   }

// }
// // verify payment
// exports.verifyPayment=async(req,res)=> {
//   const {razorpay_order_id,razorpay_payment_id,razorpay_signature,courses}=req.body
//   const userId=req.user.id;
//   if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return  res.status(500).json({
//       success:false,
//       message:"paymment failed"
//     });
//   }
//   let body=razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature=crypto.
//    createHmac("sha256",process.env.RAZORPAY_SECRET)
//    .update(body.toString())
//    .digest("hex");

//    if(expectedSignature===razorpay_signature) {
    
//     //enroll student in courses that selected
//     await enrollStudents(courses,userId);
//     return res.status(200).json({
//       success:true,
//       message :'payment succesfull'
//     })
//    }
//    async function enrollStudents(courses,userId) {
//     if(!courses || !userId) {
//       return res.status(400).json({
//         success:false,
//         message:"error while assingning courses to students"
//       })
//     }
//     for(const course_id of courses) {
//       Course.findByIdAndUpdate({course_id},
//         {$push:{studentEnrolled:userId}},
//         {new:true}
//       );
//       User.findByIdAndUpdate({userId},
//         {$push:{courses:course_id}},
//         {new:true}
//       );
//     }
//    }


// }

// exports.capturePayment = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const userId = req.user.id;
//     if (!courseId || !userId) {
//       return res.status(400).json({
//         success: false,
//         message: "all fields are required",
//       });
//     }
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "course not found",
//       });
//     }
//     // check if user already bought the course or not
//     const user = await User.findById(userId);
//     if (user.courses.includes(courseId)) {
//       return res.status(400).json({
//         success: false,
//         message: "already boought the course buy another course",
//       });
//     }

//     // creating order
//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//       amount: amount * 100,
//       currency,
//       reciept: Math.random(Date.now()).toString,
//       notes: {
//         courseId,
//         userId,
//       },
//     };
//     try {
//       const paymentResponse = instance.orders.create(options);
//       console.log(paymentResponse);
//       return res.status(200).json({
//         success: true,
//         message: "order created successfully",
//         courseName: course.courseName,
//         order_id: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (e) {
//       res.status(500).json({
//         success: false,
//         message: "error while creating order",
//       });
//     }
//   } catch (e) {
//     return res.status(500).json({
//       success: false,
//       message: "error while capturing  payment",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if (signature === digest) {
//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       try {
//         const updateUser = await User.findByIdAndUpdate(
//           userId,
//           {
//             $push: { courses: courseId },
//           },
//           { new: true }
//         );
//         if (!updateUser) {
//           return res.status(404).json({
//             success: false,
//             message: "user not found",
//           });
//         }
//         const updateCourse = await Course.findByIdAndUpdate(
//           courseId,
//           {
//             $push: { studentEnrolled: userId },
//           },
//           { new: true }
//         );
//         if (!updateCourse) {
//           return res.status(404).json({
//             success: false,
//             message: "course not found",
//           });
//         }
//         return res.status(200).json({
//           success: true,
//           message: "student enrolled successfully in course",
//         });
//       } catch (e) {
//         return res.status(400).json({
//           success: false,
//           message: "error while upadating course and user after payment done",
//         });
//       }
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: "signature not matched",
//       });
//     }
//     //HW :checksum
//     //HW: get course deatail
//     //HW: rating and review controllers-> createrating,avgRating,getAllRating
//   } catch (e) {
//     return res.status(500).json({
//       success: false,
//       message: "error while verifying signature",
//     });
//   }
// };


// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
    notes: {
      
    }
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log("payment response",paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}