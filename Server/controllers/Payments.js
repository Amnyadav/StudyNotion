const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");

exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    if (!courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    // check if user already bought the course or not
    const user = await User.findById(userId);
    if (user.courses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "already boought the course buy another course",
      });
    }

    // creating order
    const amount = course.price;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      reciept: Math.random(Date.now()).toString,
      notes: {
        courseId,
        userId,
      },
    };
    try {
      const paymentResponse = instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        message: "order created successfully",
        courseName: course.courseName,
        order_id: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "error while creating order",
      });
    }
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while capturing  payment",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (signature === digest) {
      const { courseId, userId } = req.body.payload.payment.entity.notes;
      try {
        const updateUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: { courses: courseId },
          },
          { new: true }
        );
        if (!updateUser) {
          return res.status(404).json({
            success: false,
            message: "user not found",
          });
        }
        const updateCourse = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: { studentEnrolled: userId },
          },
          { new: true }
        );
        if (!updateCourse) {
          return res.status(404).json({
            success: false,
            message: "course not found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "student enrolled successfully in course",
        });
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: "error while upadating course and user after payment done",
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        message: "signature not matched",
      });
    }
    //HW :checksum
    //HW: get course deatail
    //HW: rating and review controllers-> createrating,avgRating,getAllRating
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "error while verifying signature",
    });
  }
};
