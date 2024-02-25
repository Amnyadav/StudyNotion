import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import getAverageRating  from "../../../utils/avgrating";

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = getAverageRating(course?.ratingAndReviews || []);
    setAvgReviewCount(count);
  }, [course]);
  console.log("course card");
  return (
    <NavLink to={`/courses/${course._id}`}>
      <div className="flex flex-col gap-2">
        <img
          src={course.thumbnail}
          className="h-[250px] object-cover rounded-xl"
        ></img>
        <p className="text-richblack-5 text-xl">{course.courseName} </p>
        <p className="text-sm text-richblack-50">
          {course.instructor.firstName}
        </p>
        <div>
          <p>{avgReviewCount || 0}</p>
          <p></p>
          <p></p>
        </div>
        <p className="text-xl text-richblack-5">Rs {course.price}</p>
      </div>
    </NavLink>
  );
};

export default Course_Card;
